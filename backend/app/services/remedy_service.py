import json
import re
import requests
from typing import List, Optional
from app.core.config import settings
from app.models.remedy_schemas import PlantRecommendation, YouTubeVideo


def _ollama_request(prompt: str, model: str = "gemma3:1b", max_tokens: int = 2000) -> str:
    """Make a request to local Ollama API using gemma3:1b."""
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "stream": False,
        "options": {
            "num_predict": max_tokens,
            "temperature": 0.7,
        },
    }
    try:
        response = requests.post(settings.OLLAMA_API_URL, json=payload, timeout=120)
        if response.status_code != 200:
            print(f"[OLLAMA ERROR] {response.status_code}: {response.text}")
            return ""
        return response.json()["message"]["content"]
    except Exception as e:
        print(f"[OLLAMA ERROR] Request failed: {str(e)}")
        return ""


def get_plant_recommendations(query: str) -> List[dict]:
    """Use Ollama gemma3:1b to get plant recommendations for a health issue."""
    prompt = f"""You are an expert in Ayurvedic and herbal medicine. A user has the following health issue: "{query}"

Recommend exactly 4 medicinal plants that can help with this condition. For each plant, provide the information in the following JSON format. Return ONLY the JSON array, no other text before or after it.

[
  {{
    "name": "Common plant name",
    "scientific_name": "Scientific/Latin name",
    "description": "Brief 2-3 sentence description of the plant and how it helps with {query}",
    "medicinal_properties": ["property1", "property2", "property3", "property4"],
    "recipe": "Step-by-step recipe to prepare medicine from this plant for treating {query}. Include ingredients, quantities, preparation method, dosage, and duration. Make it detailed with at least 4-5 steps."
  }}
]

Important: Return ONLY valid JSON. No markdown, no code blocks, no explanation text."""

    response = _ollama_request(prompt, max_tokens=2500)
    if not response:
        return []

    try:
        # Try to parse the JSON directly
        plants = json.loads(response)
        if isinstance(plants, list):
            return plants
    except json.JSONDecodeError:
        pass

    # Try to extract JSON from the response (sometimes the model wraps it)
    try:
        json_match = re.search(r'\[[\s\S]*\]', response)
        if json_match:
            plants = json.loads(json_match.group())
            if isinstance(plants, list):
                return plants
    except (json.JSONDecodeError, AttributeError):
        pass

    print(f"[REMEDY] Failed to parse AI response: {response[:200]}")
    return []


def search_youtube_videos(query: str, max_results: int = 2) -> List[YouTubeVideo]:
    """Search YouTube for remedy/preparation videos."""
    if not settings.YOUTUBE_API_KEY:
        print("[YOUTUBE] No API key configured")
        return []

    try:
        search_url = "https://www.googleapis.com/youtube/v3/search"
        params = {
            "part": "snippet",
            "q": query,
            "type": "video",
            "maxResults": max_results,
            "key": settings.YOUTUBE_API_KEY,
            "videoEmbeddable": "true",
            "relevanceLanguage": "en",
        }
        response = requests.get(search_url, params=params, timeout=10)
        if response.status_code != 200:
            print(f"[YOUTUBE ERROR] {response.status_code}: {response.text}")
            return []

        data = response.json()
        videos = []
        for item in data.get("items", []):
            snippet = item.get("snippet", {})
            videos.append(YouTubeVideo(
                video_id=item["id"]["videoId"],
                title=snippet.get("title", ""),
                thumbnail=snippet.get("thumbnails", {}).get("high", {}).get("url",
                    snippet.get("thumbnails", {}).get("medium", {}).get("url", "")),
                channel=snippet.get("channelTitle", ""),
            ))
        return videos
    except Exception as e:
        print(f"[YOUTUBE ERROR] {str(e)}")
        return []


def get_wikipedia_image(plant_name: str) -> Optional[str]:
    """Fetch plant image URL from Wikipedia/Wikimedia Commons."""
    try:
        # Use Wikipedia API to get the page image
        api_url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + plant_name.replace(" ", "_")
        response = requests.get(api_url, timeout=8, headers={"User-Agent": "AyurHelp/1.0"})
        if response.status_code == 200:
            data = response.json()
            image_url = data.get("thumbnail", {}).get("source", "")
            if image_url:
                # Get higher resolution by modifying the URL
                image_url = re.sub(r'/\d+px-', '/400px-', image_url)
                return image_url
    except Exception as e:
        print(f"[WIKI] Error fetching image for {plant_name}: {e}")

    # Fallback: try searching with scientific name or alternate forms
    try:
        search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={plant_name} plant&format=json"
        response = requests.get(search_url, timeout=8, headers={"User-Agent": "AyurHelp/1.0"})
        if response.status_code == 200:
            results = response.json().get("query", {}).get("search", [])
            if results:
                page_title = results[0]["title"]
                summary_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{page_title.replace(' ', '_')}"
                resp = requests.get(summary_url, timeout=8, headers={"User-Agent": "AyurHelp/1.0"})
                if resp.status_code == 200:
                    data = resp.json()
                    image_url = data.get("thumbnail", {}).get("source", "")
                    if image_url:
                        image_url = re.sub(r'/\d+px-', '/400px-', image_url)
                        return image_url
    except Exception as e:
        print(f"[WIKI] Fallback search failed for {plant_name}: {e}")

    return None


def get_full_recommendations(query: str) -> List[PlantRecommendation]:
    """Get complete plant recommendations with images and videos."""
    raw_plants = get_plant_recommendations(query)

    if not raw_plants:
        return []

    recommendations = []
    for plant_data in raw_plants:
        name = plant_data.get("name", "Unknown Plant")
        scientific_name = plant_data.get("scientific_name", "")

        # Get Wikipedia image
        image_url = get_wikipedia_image(name)
        if not image_url and scientific_name:
            image_url = get_wikipedia_image(scientific_name)

        # Search YouTube for remedy videos
        youtube_query = f"{name} medicinal plant remedy preparation for {query}"
        videos = search_youtube_videos(youtube_query, max_results=2)

        recommendations.append(PlantRecommendation(
            name=name,
            scientific_name=scientific_name,
            description=plant_data.get("description", ""),
            medicinal_properties=plant_data.get("medicinal_properties", []),
            recipe=plant_data.get("recipe", ""),
            image_url=image_url or "",
            videos=videos,
        ))

    return recommendations
