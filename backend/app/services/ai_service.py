import requests
from app.core.config import settings


def _nim_request(prompt: str, model: str = "meta/llama-3.3-70b-instruct", max_tokens: int = 500) -> str:
    headers = {
        "Authorization": f"Bearer {settings.NIM_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": model,
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
        "max_tokens": max_tokens,
    }
    try:
        response = requests.post(settings.NIM_API_URL, headers=headers, json=payload, timeout=1000)
        if response.status_code != 200:
            return f"Error from AI service: {response.text}"
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Request failed: {str(e)}"


def ask_plant_question(plant_name: str, question: str) -> str:
    prompt = f"The medicinal plant is '{plant_name}'. Answer this question about it: {question}"
    return _nim_request(prompt, model="meta/llama-3.3-70b-instruct")


def generate_plant_info(plant_name: str) -> str:
    prompt = (
        f"Give me 5 to 10 short bullet points about the medicinal plant '{plant_name}'. "
        "Keep each point concise and informative."
    )
    return _nim_request(prompt, model="meta/llama-3.3-70b-instruct")
