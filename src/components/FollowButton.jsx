import { useAuth } from "../context/AuthContext";
import { useFollow } from "../hooks/useFollow";

export default function FollowButton({ userId, onFollowChange }) {
  const { user } = useAuth();
  const { following, toggleFollow, loading } = useFollow(userId);

  if (!user || user._id === userId) return null;

  const handleClick = async () => {
    try {
      const result = await toggleFollow();
      if (onFollowChange) onFollowChange(result);
    } catch {
      // ignore
    }
  };

  return (
    <button
      className={`follow-button ${following ? "following" : ""}`}
      onClick={handleClick}
      disabled={loading}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
