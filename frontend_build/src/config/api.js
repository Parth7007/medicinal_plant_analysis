const API_BASE_URL = import.meta.env.VITE_API_URL || "https://medicinal-plant-analysis.onrender.com";

export const API_ROUTES = {
  predict: `${API_BASE_URL}/api/predict/`,
  chat: `${API_BASE_URL}/api/chat/`,
  remedy: `${API_BASE_URL}/api/remedy/`,
};

export default API_BASE_URL;
