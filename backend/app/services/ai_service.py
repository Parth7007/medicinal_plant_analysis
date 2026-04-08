import requests
from app.core.config import settings


def _ollama_request(prompt: str, model: str = "gemma3:1b", max_tokens: int = 500) -> str:
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
            return f"Error from AI service: {response.text}"
        return response.json()["message"]["content"]
    except Exception as e:
        return f"Request failed: {str(e)}"


def ask_plant_question(plant_name: str, question: str) -> str:
    prompt = f"The medicinal plant is '{plant_name}'. Answer this question about it: {question}"
    return _ollama_request(prompt)


def generate_plant_info(plant_name: str) -> str:
    prompt = (
        f"Give me 5 to 10 short bullet points about the medicinal plant '{plant_name}'. "
        "Keep each point concise and informative."
    )
    return _ollama_request(prompt)
