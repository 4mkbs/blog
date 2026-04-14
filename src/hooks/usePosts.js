import { useState, useEffect, useCallback } from "react";
import { postsAPI } from "../services/api";

// Fetch paginated published posts
export function usePosts(params = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchPosts = useCallback(async (fetchParams = {}) => {
    try {
      setLoading(true);
      const res = await postsAPI.getAll({ ...params, ...fetchParams });
      setPosts(res.data.posts || []);
      setPagination(res.data.pagination || { page: 1, pages: 1, total: 0 });
      setError(null);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.response?.data?.message || "Failed to fetch posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [params.category, params.tag, params.search, params.page, params.limit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, pagination, refetch: fetchPosts };
}

// Fetch a single post by slug or ID
export function usePost(slugOrId) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slugOrId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        // Try slug first
        try {
          const res = await postsAPI.getBySlug(slugOrId);
          setPost(res.data);
          setError(null);
          return;
        } catch {
          // slug failed, try by ID
        }

        try {
          const res = await postsAPI.getById(slugOrId);
          setPost(res.data);
          setError(null);
          return;
        } catch {
          // ID also failed
        }

        setError("Post not found");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch post");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slugOrId]);

  return { post, loading, error };
}

// Fetch related posts
export function useRelatedPosts(postId) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;

    const fetchRelated = async () => {
      try {
        const res = await postsAPI.getRelated(postId);
        setPosts(res.data || []);
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

// Fetch feed (posts from followed users)
export function useFeed(params = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchFeed = useCallback(async () => {
    try {
      setLoading(true);
      const res = await postsAPI.getFeed(params);
      setPosts(res.data.posts || []);
      setPagination(res.data.pagination || { page: 1, pages: 1, total: 0 });
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch feed");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [params.page, params.limit]);

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  return { posts, loading, error, pagination, refetch: fetchFeed };
}
