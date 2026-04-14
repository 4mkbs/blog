// Renders block-based content on the read side (post detail page)
import { sanitizeHtml } from "../utils/sanitize";

function getEmbedUrl(url) {
  if (!url) return "";
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return url;
}

export default function BlockRenderer({ blocks }) {
  if (!blocks || !blocks.length) {
    return <p className="text-gray-400 italic">No content</p>;
  }

  return (
    <div className="block-renderer">
      {blocks.map((block, index) => {
        const { type, data } = block;

        switch (type) {
          case "paragraph":
            return (
              <p
                key={index}
                className="block-paragraph"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.text || "") }}
              />
            );

          case "heading": {
            const Tag = data.level === 3 ? "h3" : "h2";
            return (
              <Tag key={index} className="block-heading">
                {data.text}
              </Tag>
            );
          }

          case "image":
            return data.url ? (
              <figure key={index} className="block-image">
                <img src={data.url} alt={data.caption || "Image"} loading="lazy" />
                {data.caption && <figcaption>{data.caption}</figcaption>}
              </figure>
            ) : null;

          case "video": {
            const embedUrl = getEmbedUrl(data.url);
            return embedUrl ? (
              <figure key={index} className="block-video">
                <div className="block-video-container">
                  <iframe
                    src={embedUrl}
                    title={data.caption || "Video"}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                {data.caption && <figcaption>{data.caption}</figcaption>}
              </figure>
            ) : null;
          }

          case "code":
            return (
              <div key={index} className="block-code">
                <div className="block-code-header">
                  <span>{data.language || "code"}</span>
                </div>
                <pre>
                  <code>{data.code}</code>
                </pre>
              </div>
            );

          case "blockquote":
            return (
              <blockquote key={index} className="block-quote">
                <p>{data.text}</p>
              </blockquote>
            );

          case "divider":
            return <hr key={index} className="block-divider" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
