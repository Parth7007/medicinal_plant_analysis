from pydantic import BaseModel
from typing import List, Optional


class RemedyRequest(BaseModel):
    query: str


class YouTubeVideo(BaseModel):
    video_id: str
    title: str
    thumbnail: str
    channel: str


class PlantRecommendation(BaseModel):
    name: str
    scientific_name: Optional[str] = ""
    description: str
    medicinal_properties: List[str]
    recipe: str
    image_url: Optional[str] = ""
    videos: List[YouTubeVideo] = []


class RemedyResponse(BaseModel):
    query: str
    plants: List[PlantRecommendation]
    disclaimer: str = "This information is for educational purposes only. Always consult a healthcare professional before using any herbal remedy."
