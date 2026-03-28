# AyurHelp Frontend

React + Vite + Tailwind CSS frontend for the AyurHelp medicinal plant analysis app.

## Folder Structure

```
frontend/
├── index.html                  # App shell (Material Symbols + Inter font CDN)
├── vite.config.js              # Vite config with /api proxy to backend
├── tailwind.config.js          # Tailwind v3 config
├── postcss.config.js
├── package.json
├── .env.example                # Copy to .env to set backend URL
└── src/
    ├── main.jsx                # Router + app entry
    ├── App.jsx                 # Layout: Navbar + Outlet + Chatbot
    ├── index.css               # Tailwind directives
    ├── config/
    │   └── api.js              # Centralised API base URL (reads VITE_API_URL)
    ├── Components/
    │   ├── Navbar.jsx          # Responsive nav with mobile menu
    │   ├── Hero.jsx            # Landing with Search by Image / Get Info buttons
    │   ├── SBI.jsx             # Search By Image → POST /api/predict/
    │   ├── GIB.jsx             # Get Info By Prompt → Gemini API
    │   ├── Bot.jsx             # Floating chatbot → POST /api/chat/
    │   ├── Chatbot.jsx         # Thin wrapper for Bot
    │   ├── ChatForm.jsx        # Chat input form
    │   ├── ChatMessage.jsx     # Single message bubble
    │   ├── About.jsx
    │   ├── Contact.jsx
    │   ├── FAQ.jsx
    │   ├── Card.jsx
    │   └── SearchByImage.jsx
    └── Img/                    # Static images + ChatBotIcon SVG
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env`:
   ```
   VITE_API_URL=http://127.0.0.1:8000
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## API Connection

All backend calls go through `src/config/api.js`:

| Component | Endpoint | Description |
|-----------|----------|-------------|
| SBI | POST `/api/predict/` | Upload plant image |
| Bot | POST `/api/chat/` | Chat about last identified plant |

The Vite dev server proxies `/api` → `http://127.0.0.1:8000` automatically.
