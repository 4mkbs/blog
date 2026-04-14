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
      <div className="profile-container profile-settings">
        <header className="profile-settings-header">
          <p className="content-kicker">Account</p>
          <h1>Profile settings</h1>
          <p>Update your public profile details and author information.</p>
        </header>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="dashboard-message success">{message}</div>}

        <form onSubmit={handleSubmit} className="profile-settings-form">
          {/* Avatar preview */}
          <div className="profile-avatar-preview">
            <div className="profile-avatar-large">
              {form.avatar ? (
                <img src={form.avatar} alt="" />
              ) : (
                <span>{form.name?.[0]?.toUpperCase() || "?"}</span>
              )}
            </div>
          </div>

          {/* Email (read-only) */}
          <div>
            <label className="field-label">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="auth-input"
              style={{
                background: "var(--color-bg-alt)",
                cursor: "not-allowed",
              }}
            />
          </div>

          {/* Name */}
          <div>
            <label className="field-label">Name</label>
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
            <label className="field-label">Avatar URL</label>
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
            <label className="field-label">Short bio (160 chars)</label>
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
            <label className="field-label">About</label>
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
            <label className="field-label">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="auth-input"
              placeholder="https://yourwebsite.com"
            />
          </div>

          <button
            type="submit"
            className="btn-primary profile-save-btn"
            disabled={loading}
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
