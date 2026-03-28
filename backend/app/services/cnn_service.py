import os
import numpy as np
from fastapi import HTTPException
from PIL import Image
from app.core.config import settings


class CNNModelService:
    def __init__(self):
        self.labels = settings.PLANT_LABELS
        self.image_size = (299, 299)
        self.session = None
        self._load_model()

    def _load_model(self):
        try:
            import onnxruntime as ort
            base_dir = os.path.dirname(os.path.abspath(__file__))
            model_path = os.path.join(base_dir, "model.onnx")
            self.session = ort.InferenceSession(
                model_path,
                providers=["CPUExecutionProvider"],
            )
            print(f"[INFO] ONNX model loaded successfully from {model_path}")
        except Exception as e:
            print(f"[WARNING] Could not load ONNX model: {e}")
            self.session = None

    def predict(self, image_path: str) -> tuple[str, float]:
        if self.session is None:
            raise HTTPException(status_code=503, detail="Model not loaded. Please ensure model.onnx is in app/services/.")

        try:
            with Image.open(image_path) as img:
                img = img.convert("RGB")
                img = img.resize(self.image_size)
                img_array = np.array(img, dtype=np.float32)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error loading image: {str(e)}")

        try:
            img_array = np.expand_dims(img_array, axis=0)
            input_name = self.session.get_inputs()[0].name
            predictions = self.session.run(None, {input_name: img_array})[0]
            index = np.argmax(predictions, axis=1)[0]
            confidence_score = float(predictions[0][index])
            predicted_label = self.labels[index]
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Error during prediction: {str(e)}")

        return predicted_label, confidence_score


# Singleton instance
cnn_model_service = CNNModelService()
