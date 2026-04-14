import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, user, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (user) navigate("/");
    document.title = "Sign In — mkbs.media";
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setLocalError("All fields are required");
    try {
      setSubmitting(true);
      setLocalError(null);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setLocalError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container enhanced">
        <div className="auth-intro">
          <p className="auth-kicker">Sign in</p>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">
            Continue writing, managing your stories, and growing your audience.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form card">
          {(localError || error) && (
            <div className="auth-error">{localError || error}</div>
          )}

          <label className="field-label" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
            autoComplete="email"
          />

          <label className="field-label" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            autoComplete="current-password"
          />

          <button type="submit" className="auth-submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="auth-link">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </main>
  );
}
