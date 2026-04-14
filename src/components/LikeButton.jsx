import { useAuth } from "../context/AuthContext";
import { useLike } from "../hooks/useLike";
import { useState } from "react";

export default function LikeButton({ postId, initialCount = 0 }) {
  const { user } = useAuth();
  const { liked, toggleLike, loading } = useLike(postId);
  const [count, setCount] = useState(initialCount);
  const [animating, setAnimating] = useState(false);

  const handleClick = async () => {
    if (!user) {
      alert("Please login to like posts");
      return;
    }
    try {
      const result = await toggleLike();
      if (result) {
        setCount(result.likesCount);
        if (result.liked) {
          setAnimating(true);
          setTimeout(() => setAnimating(false), 600);
        }
      }
    } catch {
      // ignore
    }
  };

  return (
    <button
      className={`like-button ${liked ? "liked" : ""} ${animating ? "animating" : ""}`}
      onClick={handleClick}
      disabled={loading}
      aria-label={liked ? "Unlike" : "Like"}
    >
      <svg
        className="like-icon"
        viewBox="0 0 24 24"
        fill={liked ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="like-count">{count}</span>
    </button>
  );
}
