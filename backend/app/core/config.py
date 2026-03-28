import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    # App
    APP_TITLE: str = "AyurHelp - Medical Plant API"
    APP_VERSION: str = "1.0.0"

    # CORS
    ALLOWED_ORIGINS: list = ["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"]

    # Upload dir
    UPLOAD_DIR: str = "temp_uploads"

    # NVIDIA NIM API
    NIM_API_KEY: str = os.getenv("NIM_API_KEY", "")
    NIM_API_URL: str = "https://integrate.api.nvidia.com/v1/chat/completions"

    # Model
    PLANT_LABELS: list = [
        'Amaranthus Green', 'Asthma Plant', 'Avaram', 'Balloon vine',
        'Bellyache bush (Green)', 'Benghal dayflower', 'Betel Leaves',
        'Black-Honey Shrub', 'Bristly Wild Grape', 'Butterfly Pea',
        'Cape Gooseberry', 'Celery', 'Common Wireweed', 'Country Mallow',
        'Crown flower', 'Dwarf Copperleaf (Green)', 'Gongura',
        'Green Chireta', 'Holy Basil', 'Indian Jujube',
        'Indian Stinging Nettle', 'Indian Thornapple',
        'Indian pennywort', 'Indian wormwood', 'Ivy Gourd',
        'Kokilaksha', 'Lagos Spinach', 'Lambs Quarters',
        'Land Caltrops (Bindii)', 'Lettuce Tree',
        'Madagascar Periwinkle', 'Madras Pea Pumpkin',
        'Malabar Catmint', 'Malabar Spinach (Green)',
        'Mexican Mint', 'Mexican Prickly Poppy', 'Mint Leaves',
        'Mountain Knotgrass', 'Mustard', 'Nalta Jute',
        'Night blooming Cereus', 'Palak', 'Panicled Foldwing',
        'Prickly Chaff Flower', 'Punarnava',
        'Purple Fruited Pea Eggplant', 'Purple Tephrosia',
        'Rosary Pea', 'Shaggy button weed', 'Siru Keerai',
        'coatbuttons'
    ]

settings = Settings()
