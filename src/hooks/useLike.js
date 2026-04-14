import { useState, useEffect, useCallback } from "react";
import { likesAPI } from "../services/api";

export function useLike(postId) {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    const checkStatus = async () => {
      try {
        const res = await likesAPI.getPostStatus(postId);
        setLiked(res.data.liked);
      } catch {
        setLiked(false);
      }
    };
    checkStatus();
  }, [postId]);

  const toggleLike = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await likesAPI.togglePost(postId);
      setLiked(res.data.liked);
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [postId, loading]);

  return { liked, toggleLike, loading };
}
