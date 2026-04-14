import { useState, useEffect, useCallback } from "react";
import { commentsAPI } from "../services/api";

export function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    try {
      setLoading(true);
      const res = await commentsAPI.getByPost(postId);
      setComments(res.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const addComment = async (content, parentComment = null) => {
    const res = await commentsAPI.create(postId, { content, parentComment });
    await fetchComments(); // Refresh
    return res.data;
  };

  const editComment = async (commentId, content) => {
    const res = await commentsAPI.update(commentId, { content });
    await fetchComments();
    return res.data;
  };

  const removeComment = async (commentId) => {
    await commentsAPI.delete(commentId);
    await fetchComments();
  };

  return { comments, loading, error, addComment, editComment, removeComment, refetch: fetchComments };
}
