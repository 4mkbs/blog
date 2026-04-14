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
  getFeed: (params = {}) => apiClient.get("/posts/feed", { params }),
  getByUser: (username, params = {}) => apiClient.get(`/posts/user/${username}`, { params }),
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
  getPublicProfile: (username) => apiClient.get(`/users/${username}`),
};

// Categories API
export const categoriesAPI = {
  getAll: () => apiClient.get("/categories"),
  getBySlug: (slug, params = {}) => apiClient.get(`/categories/${slug}`, { params }),
  create: (data) => apiClient.post("/categories", data),
};

// Tags API
export const tagsAPI = {
  getAll: (params = {}) => apiClient.get("/tags", { params }),
  search: (q) => apiClient.get("/tags/search", { params: { q } }),
  getBySlug: (slug, params = {}) => apiClient.get(`/tags/${slug}`, { params }),
};

// Comments API
export const commentsAPI = {
  getByPost: (postId) => apiClient.get(`/comments/post/${postId}`),
  create: (postId, data) => apiClient.post(`/comments/post/${postId}`, data),
  update: (id, data) => apiClient.put(`/comments/${id}`, data),
  delete: (id) => apiClient.delete(`/comments/${id}`),
  like: (id) => apiClient.post(`/comments/${id}/like`),
};

// Likes API
export const likesAPI = {
  togglePost: (postId) => apiClient.post(`/likes/post/${postId}`),
  getPostStatus: (postId) => apiClient.get(`/likes/post/${postId}/status`),
};

// Follow API
export const followAPI = {
  toggle: (userId) => apiClient.post(`/users/${userId}/follow`),
  getFollowers: (userId, params = {}) => apiClient.get(`/users/${userId}/followers`, { params }),
  getFollowing: (userId, params = {}) => apiClient.get(`/users/${userId}/following`, { params }),
  getStatus: (userId) => apiClient.get(`/users/${userId}/follow/status`),
};

export default apiClient;
