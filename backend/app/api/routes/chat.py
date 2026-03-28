from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.services.ai_service import ask_plant_question
from app.api.routes.predict import get_last_predicted_plant

router = APIRouter()


@router.post("/chat/", response_model=ChatResponse)
async def chat_with_ai(chat_request: ChatRequest):
    plant_name = get_last_predicted_plant()

    if not plant_name:
        raise HTTPException(
            status_code=400,
            detail="No plant has been identified yet. Please upload a plant image first.",
        )

    try:
        answer = ask_plant_question(plant_name, chat_request.question)
        return ChatResponse(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
