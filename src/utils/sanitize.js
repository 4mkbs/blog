import DOMPurify from "dompurify";

/**
 * Sanitize HTML content to prevent XSS attacks
 * @param {string} content - HTML content to sanitize
 * @returns {string} - Sanitized HTML
 */
export const sanitizeHtml = (content) => {
  if (!content) return "";
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      "b",
      "i",
      "em",
      "strong",
      "p",
      "br",
      "a",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "img",
      "code",
      "pre",
      "blockquote",
    ],
  });
};

/**
 * Sanitize plain text to prevent XSS attacks
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text) return "";
  return DOMPurify.sanitize(text, { ALLOWED_TAGS: [] });
};

export default sanitizeHtml;
