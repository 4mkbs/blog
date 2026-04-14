import { useState, useEffect, useCallback } from "react";
import { followAPI } from "../services/api";

export function useFollow(userId) {
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    const checkStatus = async () => {
      try {
        const res = await followAPI.getStatus(userId);
        setFollowing(res.data.following);
      } catch {
        setFollowing(false);
      }
    };
    checkStatus();
  }, [userId]);

  const toggleFollow = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      const res = await followAPI.toggle(userId);
      setFollowing(res.data.following);
      return res.data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [userId, loading]);

  return { following, toggleFollow, loading };
}
