import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postsAPI = {
  getAll: (params = {}) => apiClient.get("/posts", { params }),
  getById: (id) => apiClient.get(`/posts/${id}`),
  getBySlug: (slug) => apiClient.get(`/posts/slug/${slug}`),
  getRelated: (id) => apiClient.get(`/posts/${id}/related`),
};

export default apiClient;
