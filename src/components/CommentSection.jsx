import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useComments } from "../hooks/useComments";
import { Link } from "react-router-dom";

function CommentItem({ comment, onReply, onDelete, currentUserId }) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    if (!replyText.trim()) return;
    onReply(replyText, comment._id);
    setReplyText("");
    setReplying(false);
  };

  const timeAgo = (date) => {
    const seconds = Math.floor((Date.now() - new Date(date)) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <Link to={`/@${comment.author?.username}`} className="comment-author-link">
          <div className="comment-avatar">
            {comment.author?.avatar ? (
              <img src={comment.author.avatar} alt="" />
            ) : (
              <span>{comment.author?.name?.[0]?.toUpperCase() || "?"}</span>
            )}
          </div>
          <div>
            <span className="comment-author-name">{comment.author?.name || "Anonymous"}</span>
            <span className="comment-time">{timeAgo(comment.createdAt)}</span>
          </div>
        </Link>
        {currentUserId === comment.author?._id && (
          <button className="comment-delete-btn" onClick={() => onDelete(comment._id)}>
            ✕
          </button>
        )}
      </div>
      <p className="comment-content">{comment.content}</p>
      <div className="comment-actions">
        <button className="comment-reply-btn" onClick={() => setReplying(!replying)}>
          Reply
        </button>
        {comment.likesCount > 0 && (
          <span className="comment-likes">♥ {comment.likesCount}</span>
        )}
      </div>

      {/* Reply form */}
      {replying && (
        <div className="comment-reply-form">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            rows={2}
          />
          <div className="comment-reply-actions">
            <button onClick={handleReply} className="comment-submit-btn">Reply</button>
            <button onClick={() => setReplying(false)} className="comment-cancel-btn">Cancel</button>
          </div>
        </div>
      )}

      {/* Nested replies */}
      {comment.replies?.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply._id}
              comment={reply}
              onReply={onReply}
              onDelete={onDelete}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const { comments, loading, addComment, removeComment } = useComments(postId);
  const [newComment, setNewComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;
    try {
      setSubmitting(true);
      await addComment(newComment);
      setNewComment("");
    } catch {
      // ignore
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (text, parentId) => {
    try {
      await addComment(text, parentId);
    } catch {
      // ignore
    }
  };

  const handleDelete = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await removeComment(commentId);
    } catch {
      // ignore
    }
  };

  return (
    <section className="comment-section">
      <h3 className="comment-section-title">
        Responses ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
      </h3>

      {/* Comment form */}
      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <div className="comment-form-header">
            <div className="comment-avatar small">
              {user.avatar ? (
                <img src={user.avatar} alt="" />
              ) : (
                <span>{user.name?.[0]?.toUpperCase()}</span>
              )}
            </div>
            <span className="comment-form-name">{user.name}</span>
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="What are your thoughts?"
            rows={3}
            className="comment-input"
          />
          <div className="comment-form-footer">
            <button
              type="submit"
              className="comment-submit-btn primary"
              disabled={!newComment.trim() || submitting}
            >
              {submitting ? "Posting..." : "Respond"}
            </button>
          </div>
        </form>
      ) : (
        <div className="comment-login-prompt">
          <p>
            <Link to="/login">Sign in</Link> to leave a response.
          </p>
        </div>
      )}

      {/* Comments list */}
      {loading ? (
        <div className="comment-loading">
          <div className="spinner" />
        </div>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onReply={handleReply}
              onDelete={handleDelete}
              currentUserId={user?._id}
            />
          ))}
          {!loading && comments.length === 0 && (
            <p className="no-comments">No responses yet. Be the first to share your thoughts!</p>
          )}
        </div>
      )}
    </section>
  );
}
