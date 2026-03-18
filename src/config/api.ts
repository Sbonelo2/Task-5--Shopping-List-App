// API Configuration
const getApiBaseUrl = () => {
  // In production (Render), we use relative URLs
  // In development, we use localhost:5000 for the JSON server
  if (import.meta.env.MODE === "production" || typeof window === "undefined") {
    return window?.location?.origin || "http://localhost:5000";
  }
  return "http://localhost:5000";
};

export const API_BASE_URL = getApiBaseUrl();
export const API_ENDPOINTS = {
  users: `${API_BASE_URL}/api/users`,
  shoppingLists: `${API_BASE_URL}/api/shoppingLists`,
};

export default API_ENDPOINTS;
