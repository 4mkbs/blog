import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register, user, error } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (user) navigate("/");
    document.title = "Join — mkbs.media";
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password)
      return setLocalError("All fields are required");
    if (password.length < 6)
      return setLocalError("Password must be at least 6 characters");
    try {
      setSubmitting(true);
      setLocalError(null);
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setLocalError(err.message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container enhanced">
        <div className="auth-intro">
          <p className="auth-kicker">Create account</p>
          <h1 className="auth-title">Join mkbs.media</h1>
          <p className="auth-subtitle">
            Publish stories, build your profile, and connect with readers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form card">
          {(localError || error) && (
            <div className="auth-error">{localError || error}</div>
          )}

          <label className="field-label" htmlFor="register-name">
            Your name
          </label>
          <input
            id="register-name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
            autoComplete="name"
          />

          <label className="field-label" htmlFor="register-email">
            Email
          </label>
          <input
            id="register-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            autoComplete="email"
          />

          <label className="field-label" htmlFor="register-password">
            Password
          </label>
          <input
            id="register-password"
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            autoComplete="new-password"
          />

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
