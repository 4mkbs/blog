import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    bio: "",
    about: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Profile Settings — mkbs.media";
    if (user) {
      setForm({
        name: user.name || "",
        avatar: user.avatar || "",
        bio: user.bio || "",
        about: user.about || "",
        website: user.website || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!form.name) return setError("Name is required");

    try {
      setLoading(true);
      await updateProfile(form);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="profile-page">
      <div className="profile-container" style={{ maxWidth: 520 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 32, letterSpacing: "-0.3px" }}>
          Profile Settings
        </h1>

        {error && <div className="auth-error" style={{ marginBottom: 16 }}>{error}</div>}
        {message && (
          <div className="dashboard-message success" style={{ marginBottom: 16 }}>{message}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Avatar preview */}
          <div style={{ textAlign: "center", marginBottom: 8 }}>
            <div className="profile-avatar-large" style={{ margin: "0 auto 12px" }}>
              {form.avatar ? (
                <img src={form.avatar} alt="" />
              ) : (
                <span>{form.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={user.email}
              disabled
              className="auth-input"
              style={{ background: "var(--color-bg-alt)", cursor: "not-allowed" }}
            />
          </div>

          {/* Name */}
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 6 }}>
              Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="auth-input"
              placeholder="Your name"
            />
          </div>

          {/* Avatar URL */}
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 6 }}>
              Avatar URL
            </label>
            <input
              type="url"
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
              className="auth-input"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          {/* Bio */}
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 6 }}>
              Short Bio (160 chars)
            </label>
            <input
              type="text"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="auth-input"
              placeholder="A brief description of yourself"
              maxLength={160}
            />
          </div>

          {/* About */}
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 6 }}>
              About
            </label>
            <textarea
              value={form.about}
              onChange={(e) => setForm({ ...form, about: e.target.value })}
              className="comment-input"
              placeholder="Tell your story..."
              rows={4}
            />
          </div>

          {/* Website */}
          <div>
            <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: "var(--color-text-secondary)", marginBottom: 6 }}>
              Website
            </label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="auth-input"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: "center", padding: "12px 24px", fontSize: 16, marginTop: 8 }}>
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
