import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import BlockEditor from "../components/editor/BlockEditor";
import { postsAPI, tagsAPI } from "../services/api";
import { useCategories } from "../hooks/useCategories";

export default function WritePage() {
  const { user } = useAuth();
  const { id } = useParams(); // edit mode if id present
  const navigate = useNavigate();
  const { categories } = useCategories();

  const [title, setTitle] = useState("");
  const [blocks, setBlocks] = useState([
    { type: "paragraph", data: { text: "" } },
  ]);
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [status, setStatus] = useState("published");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load post for editing
  useEffect(() => {
    if (!id) return;
    const loadPost = async () => {
      try {
        const res = await postsAPI.getById(id);
        const post = res.data;
        setTitle(post.title || "");
        setBlocks(
          post.content?.length
            ? post.content
            : [{ type: "paragraph", data: { text: "" } }]
        );
        setCoverImage(post.coverImage || "");
        setCategory(post.category?.name || "");
        setTags(post.tags?.map((t) => t.name) || []);
        setStatus(post.status || "published");
      } catch {
        setError("Failed to load post");
      }
    };
    loadPost();
  }, [id]);

  // Tag autocomplete
  useEffect(() => {
    if (tagInput.length < 2) {
      setTagSuggestions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await tagsAPI.search(tagInput);
        setTagSuggestions(
          (res.data || [])
            .filter((t) => !tags.includes(t.name))
            .map((t) => t.name)
        );
      } catch {
        setTagSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [tagInput, tags]);

  const addTag = (tag) => {
    const t = tag.trim().toLowerCase();
    if (t && !tags.includes(t) && tags.length < 5) {
      setTags([...tags, t]);
    }
    setTagInput("");
    setTagSuggestions([]);
  };

  const removeTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handlePublish = useCallback(
    async (publishStatus) => {
      if (!title.trim()) {
        setError("Title is required");
        return;
      }
      const nonEmptyBlocks = blocks.filter((b) => {
        if (b.type === "divider") return true;
        return b.data?.text || b.data?.url || b.data?.code;
      });
      if (!nonEmptyBlocks.length) {
        setError("Content is required");
        return;
      }

      try {
        setSaving(true);
        setError(null);

        const postData = {
          title,
          content: blocks,
          coverImage,
          category: category || undefined,
          tags,
          status: publishStatus,
        };

        if (id) {
          await postsAPI.update(id, postData);
        } else {
          await postsAPI.create(postData);
        }

        navigate("/dashboard");
      } catch (err) {
        setError(err.response?.data?.message || "Failed to save post");
      } finally {
        setSaving(false);
      }
    },
    [title, blocks, coverImage, category, tags, id, navigate]
  );

  useEffect(() => {
    document.title = id ? "Edit Story" : "Write a Story";
  }, [id]);

  if (!user) {
    return (
      <main className="write-page">
        <div className="write-container">
          <p>Please login to write stories.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="content-page write-page">
      <section className="content-shell narrow write-shell">
        <div className="write-header">
          <div className="write-header-inner">
            <div className="write-header-left">
              <p className="content-kicker">Story editor</p>
              <span className="write-draft-status">
                {status === "draft" ? "Draft" : "Published"}
              </span>
            </div>
            <div className="write-header-right">
              <button
                className="write-save-draft"
                onClick={() => handlePublish("draft")}
                disabled={saving}
              >
                Save Draft
              </button>
              <button
                className="write-publish-btn"
                onClick={() => handlePublish("published")}
                disabled={saving}
              >
                {saving ? "Publishing..." : id ? "Update" : "Publish"}
              </button>
            </div>
          </div>
        </div>

        <div className="write-container write-card">
          {error && <div className="write-error">{error}</div>}

          {/* Cover Image */}
          <div className="write-cover-section">
            {coverImage ? (
              <div className="write-cover-preview">
                <img src={coverImage} alt="Cover" />
                <button
                  onClick={() => setCoverImage("")}
                  className="write-cover-remove"
                >
                  ✕
                </button>
              </div>
            ) : (
              <input
                type="url"
                placeholder="Add a cover image URL..."
                className="write-cover-input"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value) {
                    setCoverImage(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            )}
          </div>

          {/* Title */}
          <div
            contentEditable
            suppressContentEditableWarning
            className="write-title"
            data-placeholder="Title"
            onInput={(e) => setTitle(e.currentTarget.textContent)}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Block Editor */}
          <BlockEditor blocks={blocks} onChange={setBlocks} />

          {/* Bottom meta: category + tags */}
          <div className="write-meta">
            <div className="write-meta-row">
              <label>Category</label>
              <div className="write-category-select">
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Type or select category..."
                  list="categories-list"
                />
                <datalist id="categories-list">
                  {categories.map((c) => (
                    <option key={c._id} value={c.name} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="write-meta-row">
              <label>Tags (max 5)</label>
              <div className="write-tags-input">
                <div className="write-tags-list">
                  {tags.map((tag) => (
                    <span key={tag} className="write-tag">
                      {tag}
                      <button onClick={() => removeTag(tag)}>✕</button>
                    </span>
                  ))}
                </div>
                {tags.length < 5 && (
                  <div className="write-tag-autocomplete">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === ",") {
                          e.preventDefault();
                          addTag(tagInput);
                        }
                      }}
                      placeholder="Add a tag..."
                    />
                    {tagSuggestions.length > 0 && (
                      <div className="write-tag-suggestions">
                        {tagSuggestions.map((s) => (
                          <button key={s} onClick={() => addTag(s)}>
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
