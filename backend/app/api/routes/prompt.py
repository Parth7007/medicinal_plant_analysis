from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.ai_service import _ollama_request

router = APIRouter()


class PromptRequest(BaseModel):
    prompt: str


class PromptResponse(BaseModel):
    answer: str


@router.post("/prompt/", response_model=PromptResponse)
async def prompt_query(request: PromptRequest):
    """General-purpose medicinal plant / Ayurveda question answering."""
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Please provide a prompt.")

    try:
        system_context = (
            "You are an expert in Ayurvedic and herbal medicine. "
            "Answer the following question about medicinal plants, Ayurveda, or natural remedies. "
            "Be informative and concise. Use bullet points where appropriate."
        )
        full_prompt = f"{system_context}\n\nUser question: {request.prompt}"
        answer = _ollama_request(full_prompt, max_tokens=800)
        if not answer:
            raise HTTPException(status_code=500, detail="No response from AI service.")
        return PromptResponse(answer=answer)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
