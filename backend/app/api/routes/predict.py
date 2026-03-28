import os
import shutil
import time
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.config import settings
from app.services.cnn_service import cnn_model_service
from app.services.ai_service import generate_plant_info
from app.models.schemas import PredictResponse

router = APIRouter()

# In-memory store for last predicted plant (per-server, not multi-user safe)
_state = {"last_predicted_plant": ""}


@router.post("/predict/", response_model=PredictResponse)
async def predict(file: UploadFile = File(...)):
    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        await file.close()

        label, score = cnn_model_service.predict(file_path)
        _state["last_predicted_plant"] = label

        plant_info = generate_plant_info(label)

        return PredictResponse(
            label=label,
            confidence_score=float(score),
            plant_info=plant_info,
            message="Prediction successful",
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        for _ in range(5):
            try:
                if os.path.exists(file_path):
                    os.remove(file_path)
                break
            except PermissionError:
                time.sleep(0.5)


def get_last_predicted_plant() -> str:
    return _state["last_predicted_plant"]
