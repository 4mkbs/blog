import { useState, useEffect } from "react";
import {
  dummyPosts,
  getRelatedPosts as getRelatedPostsData,
} from "../data/dummyData";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fetch from API but keep dummy data as fallback for hybrid approach
export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        // Fetch real posts from backend
        const response = await fetch(`${API_BASE}/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch posts from server");
        }

        const apiPosts = await response.json();

        // Combine: dummy posts first (for consistent landing page), then new user posts
        const combinedPosts = [...dummyPosts, ...apiPosts];

        // Remove duplicates by slug (in case any match)
        const uniquePosts = Array.from(
          new Map(combinedPosts.map((p) => [p.slug || p._id, p])).values()
        );

        // Sort by date - newest first
        uniquePosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(uniquePosts);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        // Fallback to dummy data if API fails
        setPosts(dummyPosts);
        setError(null); // Don't show error if we have fallback data
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function usePost(slugOrId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slugOrId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);

        let response;
        let data;

        // Try slug-based endpoint first (for new posts)
        try {
          response = await fetch(`${API_BASE}/posts/slug/${slugOrId}`);
          if (response.ok) {
            data = await response.json();
            setPost(data);
            setError(null);
            setLoading(false);
            return;
          }
        } catch {
          // Slug endpoint failed, try ID endpoint
        }

        // Try ID endpoint
        try {
          response = await fetch(`${API_BASE}/posts/${slugOrId}`);
          if (response.ok) {
            data = await response.json();
            setPost(data);
            setError(null);
            setLoading(false);
            return;
          }
        } catch {
          // ID endpoint failed, try dummy data
        }

        // Fallback to dummy data
        const foundPost = dummyPosts.find(
          (p) => p.slug === slugOrId || p._id === slugOrId
        );
        if (foundPost) {
          setPost(foundPost);
          setError(null);
        } else {
          setError("Post not found");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slugOrId]);

  return { post, loading, error };
}

export function useRelatedPosts(postId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchRelated = async () => {
      try {
        // Try to fetch from API
        try {
          const response = await fetch(`${API_BASE}/posts/${postId}/related`);
          if (response.ok) {
            const data = await response.json();
            setPosts(data);
            setLoading(false);
            return;
          }
        } catch {
          // API failed, fallback to dummy data
        }

        // Fallback to dummy data
        const related = getRelatedPostsData(postId, dummyPosts);
        setPosts(related);
      } catch (err) {
        console.error("Related posts error:", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRelated();
  }, [postId]);

  return { posts, loading };
}
