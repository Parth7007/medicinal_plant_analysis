from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def health_check():
    return {"status": "ok", "message": "Welcome to AyurHelp - Medical Plant API"}
