import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { usersAPI, postsAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import FollowButton from "../components/FollowButton";
import PostCard from "../components/PostCard";

export default function UserProfilePage() {
  const { username } = useParams();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const [profileRes, postsRes] = await Promise.all([
          usersAPI.getPublicProfile(username),
          postsAPI.getAll({ author: undefined }), // we'll filter by username in the API
        ]);
        setProfile(profileRes.data);

        // Get posts by this user
        try {
          const userPostsRes = await fetch(
            `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/posts/user/${username}`
          );
          const userPostsData = await userPostsRes.json();
          setPosts(userPostsData.posts || []);
        } catch {
          setPosts([]);
        }

        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "User not found");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  useEffect(() => {
    if (profile) {
      document.title = `${profile.name} — Stories`;
    }
  }, [profile]);

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-container">
          <div className="profile-skeleton">
            <div className="skeleton-circle" />
            <div className="skeleton-line w60" />
            <div className="skeleton-line w40" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="profile-page">
        <div className="profile-container">
          <div className="profile-error">
            <h2>User not found</h2>
            <p>{error || "The profile you're looking for doesn't exist."}</p>
            <Link to="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Profile Header */}
        <header className="profile-header">
          <div className="profile-avatar-large">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} />
            ) : (
              <span>{profile.name?.[0]?.toUpperCase()}</span>
            )}
          </div>
          <h1 className="profile-name">{profile.name}</h1>
          {profile.bio && <p className="profile-bio">{profile.bio}</p>}

          <div className="profile-stats">
            <div className="profile-stat">
              <strong>{profile.followersCount || 0}</strong>
              <span>Followers</span>
            </div>
            <div className="profile-stat">
              <strong>{profile.followingCount || 0}</strong>
              <span>Following</span>
            </div>
            <div className="profile-stat">
              <strong>{profile.postCount || 0}</strong>
              <span>Stories</span>
            </div>
          </div>

          <FollowButton userId={profile._id} />

          {profile.website && (
            <a href={profile.website} target="_blank" rel="noopener noreferrer" className="profile-website">
              {profile.website.replace(/https?:\/\//, "")}
            </a>
          )}
        </header>

        {/* User's posts */}
        <section className="profile-posts">
          <h2 className="profile-posts-title">Stories by {profile.name}</h2>
          {posts.length > 0 ? (
            <div className="profile-posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <p className="no-posts">No stories published yet.</p>
          )}
        </section>
      </div>
    </main>
  );
}
