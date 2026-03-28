from fastapi import APIRouter, HTTPException
from app.models.remedy_schemas import RemedyRequest, RemedyResponse
from app.services.remedy_service import get_full_recommendations

router = APIRouter()


@router.post("/remedy/", response_model=RemedyResponse)
async def get_remedy(request: RemedyRequest):
    """Get medicinal plant recommendations for a health issue or disease."""
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Please provide a health issue or disease name.")

    try:
        plants = get_full_recommendations(request.query.strip())

        if not plants:
            raise HTTPException(
                status_code=404,
                detail="Could not find plant recommendations for this query. Please try a different health issue."
            )

        return RemedyResponse(
            query=request.query.strip(),
            plants=plants,
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
