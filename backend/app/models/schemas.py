from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class ChatResponse(BaseModel):
    answer: str


class PredictResponse(BaseModel):
    label: str
    confidence_score: float
    plant_info: str
    message: str
