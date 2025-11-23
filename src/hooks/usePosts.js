import { useState, useEffect } from "react";
// import { postsAPI } from '../services/api';
import {
  dummyPosts,
  getRelatedPosts as getRelatedPostsData,
} from "../data/dummyData";

// Using dummy data for now - uncomment API calls when backend is ready
const USE_DUMMY_DATA = true;

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        if (USE_DUMMY_DATA) {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 500));
          setPosts(dummyPosts);
        } else {
          // const response = await postsAPI.getAll(params);
          // setPosts(response.data);
        }

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch posts");
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

        if (USE_DUMMY_DATA) {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 300));
          const foundPost = dummyPosts.find(
            (p) => p.slug === slugOrId || p._id === slugOrId
          );
          if (foundPost) {
            setPost(foundPost);
            setError(null);
          } else {
            setError("Post not found");
          }
        } else {
          // Try slug first, fallback to ID
          // let response;
          // try {
          //   response = await postsAPI.getBySlug(slugOrId);
          // } catch {
          //   response = await postsAPI.getById(slugOrId);
          // }
          // setPost(response.data);
          // setError(null);
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
        if (USE_DUMMY_DATA) {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 300));
          const related = getRelatedPostsData(postId, dummyPosts);
          setPosts(related);
        } else {
          // const response = await postsAPI.getRelated(postId);
          // setPosts(response.data);
        }
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
