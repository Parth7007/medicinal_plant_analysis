import os
import numpy as np
from fastapi import HTTPException
from PIL import Image
from app.core.config import settings


class CNNModelService:
    def __init__(self):
        self.labels = settings.PLANT_LABELS
        self.image_size = (299, 299)
        self.model = None
        self._load_model()

    def _load_model(self):
        try:
            import tensorflow as tf
            base_dir = os.path.dirname(os.path.abspath(__file__))
            # Model should be placed at app/services/model_avg_25.h5
            model_path = os.path.join(base_dir, "model_avg_25.h5")
            self.model = tf.keras.models.load_model(model_path)
        except Exception as e:
            print(f"[WARNING] Could not load model: {e}")
            self.model = None

    def predict(self, image_path: str) -> tuple[str, float]:
        if self.model is None:
            raise HTTPException(status_code=503, detail="Model not loaded. Please ensure model_avg_25.h5 is in app/services/.")

        try:
            with Image.open(image_path) as img:
                img = img.convert("RGB")
                img = img.resize(self.image_size)
                img_array = np.array(img)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error loading image: {str(e)}")

        try:
            img_array = np.expand_dims(img_array, axis=0)
            predictions = self.model.predict(img_array)
            index = np.argmax(predictions, axis=1)[0]
            confidence_score = float(predictions[0][index])
            predicted_label = self.labels[index]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")

        return predicted_label, confidence_score


# Singleton instance
cnn_model_service = CNNModelService()
