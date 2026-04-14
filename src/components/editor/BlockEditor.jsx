import { useState, useRef, useCallback } from "react";

// Block types configuration
const BLOCK_TYPES = [
  { type: "paragraph", label: "Text", icon: "¶" },
  { type: "heading", label: "Heading", icon: "H" },
  { type: "image", label: "Image", icon: "🖼" },
  { type: "video", label: "Video", icon: "▶" },
  { type: "code", label: "Code", icon: "</>" },
  { type: "blockquote", label: "Quote", icon: "❝" },
  { type: "divider", label: "Divider", icon: "—" },
];

function createBlock(type) {
  const base = { type, data: {} };
  switch (type) {
    case "paragraph":
      return { ...base, data: { text: "" } };
    case "heading":
      return { ...base, data: { text: "", level: 2 } };
    case "image":
      return { ...base, data: { url: "", caption: "" } };
    case "video":
      return { ...base, data: { url: "", caption: "" } };
    case "code":
      return { ...base, data: { code: "", language: "javascript" } };
    case "blockquote":
      return { ...base, data: { text: "" } };
    case "divider":
      return { ...base, data: {} };
    default:
      return { ...base, data: { text: "" } };
  }
}

// Individual Block Renderers
function ParagraphBlock({ data, onChange }) {
  const ref = useRef(null);
  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className="editor-paragraph"
      data-placeholder="Write your story..."
      onInput={(e) => onChange({ ...data, text: e.currentTarget.innerHTML })}
      dangerouslySetInnerHTML={{ __html: data.text || "" }}
    />
  );
}

function HeadingBlock({ data, onChange }) {
  const Tag = data.level === 3 ? "h3" : "h2";
  return (
    <div className="editor-heading-wrapper">
      <Tag
        contentEditable
        suppressContentEditableWarning
        className="editor-heading"
        data-placeholder="Heading..."
        onInput={(e) => onChange({ ...data, text: e.currentTarget.textContent })}
        dangerouslySetInnerHTML={{ __html: data.text || "" }}
      />
      <select
        value={data.level || 2}
        onChange={(e) => onChange({ ...data, level: parseInt(e.target.value) })}
        className="editor-heading-level"
      >
        <option value={2}>H2</option>
        <option value={3}>H3</option>
      </select>
    </div>
  );
}

function ImageBlock({ data, onChange }) {
  return (
    <div className="editor-image-block">
      {data.url ? (
        <div className="editor-image-preview">
          <img src={data.url} alt={data.caption || "Image"} />
          <input
            type="text"
            placeholder="Add a caption..."
            value={data.caption || ""}
            onChange={(e) => onChange({ ...data, caption: e.target.value })}
            className="editor-caption-input"
          />
          <button
            onClick={() => onChange({ ...data, url: "", caption: "" })}
            className="editor-image-remove"
          >
            ✕ Remove
          </button>
        </div>
      ) : (
        <div className="editor-image-placeholder">
          <input
            type="url"
            placeholder="Paste image URL..."
            className="editor-url-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                onChange({ ...data, url: e.target.value });
              }
            }}
          />
          <p className="editor-hint">Press Enter to add image</p>
        </div>
      )}
    </div>
  );
}

function VideoBlock({ data, onChange }) {
  // Convert YouTube URLs to embed format
  const getEmbedUrl = (url) => {
    if (!url) return "";
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
  };

  return (
    <div className="editor-video-block">
      {data.url ? (
        <div className="editor-video-preview">
          <div className="editor-video-container">
            <iframe
              src={getEmbedUrl(data.url)}
              title={data.caption || "Video"}
              allowFullScreen
              className="editor-video-iframe"
            />
          </div>
          <input
            type="text"
            placeholder="Add a caption..."
            value={data.caption || ""}
            onChange={(e) => onChange({ ...data, caption: e.target.value })}
            className="editor-caption-input"
          />
          <button
            onClick={() => onChange({ ...data, url: "", caption: "" })}
            className="editor-image-remove"
          >
            ✕ Remove
          </button>
        </div>
      ) : (
        <div className="editor-image-placeholder">
          <input
            type="url"
            placeholder="Paste YouTube or Vimeo URL..."
            className="editor-url-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value) {
                onChange({ ...data, url: e.target.value });
              }
            }}
          />
          <p className="editor-hint">Press Enter to embed video</p>
        </div>
      )}
    </div>
  );
}

function CodeBlock({ data, onChange }) {
  const LANGUAGES = [
    "javascript", "python", "java", "c", "cpp", "csharp", "go",
    "rust", "typescript", "html", "css", "sql", "bash", "json", "plaintext",
  ];
  return (
    <div className="editor-code-block">
      <div className="editor-code-header">
        <select
          value={data.language || "javascript"}
          onChange={(e) => onChange({ ...data, language: e.target.value })}
          className="editor-code-language"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <textarea
        value={data.code || ""}
        onChange={(e) => onChange({ ...data, code: e.target.value })}
        placeholder="Write your code here..."
        className="editor-code-textarea"
        spellCheck={false}
      />
    </div>
  );
}

function QuoteBlock({ data, onChange }) {
  return (
    <blockquote className="editor-blockquote">
      <div
        contentEditable
        suppressContentEditableWarning
        data-placeholder="Write a quote..."
        onInput={(e) => onChange({ ...data, text: e.currentTarget.textContent })}
        dangerouslySetInnerHTML={{ __html: data.text || "" }}
      />
    </blockquote>
  );
}

function DividerBlock() {
  return <hr className="editor-divider" />;
}

// Block Menu (the + button)
function BlockMenu({ onAdd, position }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="editor-block-menu" style={position ? { top: position } : {}}>
      <button
        className={`editor-add-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Add block"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      {open && (
        <div className="editor-block-options">
          {BLOCK_TYPES.map((bt) => (
            <button
              key={bt.type}
              className="editor-block-option"
              onClick={() => {
                onAdd(bt.type);
                setOpen(false);
              }}
            >
              <span className="editor-block-option-icon">{bt.icon}</span>
              <span>{bt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Main Block Editor Component
export default function BlockEditor({ blocks = [], onChange }) {
  const [focusedBlock, setFocusedBlock] = useState(null);

  const updateBlock = useCallback(
    (index, newData) => {
      const updated = [...blocks];
      updated[index] = { ...updated[index], data: newData };
      onChange(updated);
    },
    [blocks, onChange]
  );

  const addBlock = useCallback(
    (type, afterIndex = blocks.length - 1) => {
      const newBlock = createBlock(type);
      const updated = [...blocks];
      updated.splice(afterIndex + 1, 0, newBlock);
      onChange(updated);
      setFocusedBlock(afterIndex + 1);
    },
    [blocks, onChange]
  );

  const removeBlock = useCallback(
    (index) => {
      if (blocks.length <= 1) return; // keep at least one
      const updated = blocks.filter((_, i) => i !== index);
      onChange(updated);
    },
    [blocks, onChange]
  );

  const moveBlock = useCallback(
    (index, direction) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= blocks.length) return;
      const updated = [...blocks];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      onChange(updated);
    },
    [blocks, onChange]
  );

  const renderBlock = (block, index) => {
    const props = {
      data: block.data,
      onChange: (newData) => updateBlock(index, newData),
    };

    switch (block.type) {
      case "paragraph": return <ParagraphBlock {...props} />;
      case "heading": return <HeadingBlock {...props} />;
      case "image": return <ImageBlock {...props} />;
      case "video": return <VideoBlock {...props} />;
      case "code": return <CodeBlock {...props} />;
      case "blockquote": return <QuoteBlock {...props} />;
      case "divider": return <DividerBlock />;
      default: return <ParagraphBlock {...props} />;
    }
  };

  // Initialize with a paragraph block if empty
  if (!blocks.length) {
    onChange([createBlock("paragraph")]);
    return null;
  }

  return (
    <div className="block-editor">
      {blocks.map((block, index) => (
        <div
          key={index}
          className={`editor-block ${focusedBlock === index ? "focused" : ""}`}
          onFocus={() => setFocusedBlock(index)}
          onClick={() => setFocusedBlock(index)}
        >
          {/* Block controls */}
          <div className="editor-block-controls">
            <button
              className="editor-ctrl-btn"
              onClick={() => moveBlock(index, -1)}
              disabled={index === 0}
              aria-label="Move up"
            >↑</button>
            <button
              className="editor-ctrl-btn"
              onClick={() => moveBlock(index, 1)}
              disabled={index === blocks.length - 1}
              aria-label="Move down"
            >↓</button>
            <span className="editor-block-type-label">{block.type}</span>
            <button
              className="editor-ctrl-btn editor-ctrl-delete"
              onClick={() => removeBlock(index)}
              aria-label="Remove block"
            >✕</button>
          </div>
          {renderBlock(block, index)}

          {/* Add block button between blocks */}
          <BlockMenu onAdd={(type) => addBlock(type, index)} />
        </div>
      ))}
    </div>
  );
}
