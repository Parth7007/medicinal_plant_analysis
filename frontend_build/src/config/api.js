const API_BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export const API_ROUTES = {
  predict: `${API_BASE_URL}/api/predict/`,
  chat: `${API_BASE_URL}/api/chat/`,
};

export default API_BASE_URL;
