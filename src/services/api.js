import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Posts API
export const postsAPI = {
  getAll: (params = {}) => apiClient.get("/posts", { params }),
  getById: (id) => apiClient.get(`/posts/${id}`),
  getBySlug: (slug) => apiClient.get(`/posts/slug/${slug}`),
  getRelated: (id) => apiClient.get(`/posts/${id}/related`),
  create: (data) => apiClient.post("/posts", data),
  update: (id, data) => apiClient.put(`/posts/${id}`, data),
  delete: (id) => apiClient.delete(`/posts/${id}`),
};

// Users API
export const usersAPI = {
  register: (data) => apiClient.post("/users/register", data),
  login: (data) => apiClient.post("/users/login", data),
  getProfile: () => apiClient.get("/users/profile"),
  updateProfile: (data) => apiClient.put("/users/profile", data),
};

export default apiClient;
