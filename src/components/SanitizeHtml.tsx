import sanitize from "sanitize-html";

const defaultOptions = {
  allowedTags: ["b", "p", "i", "em", "strong", "a", "code", "pre"],
  allowedAttributes: {
    a: ["href"],
  },
  allowedIframeHostnames: [],
};

const sanitizeHtml = (dirty: string, options?: sanitize.IOptions) => {
  return sanitize(dirty, { ...defaultOptions, ...options });
};

export default function SanitizeHTML({
  html,
  options,
}: {
  html: string;
  options?: sanitize.IOptions;
}) {
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(html, options) }} />
  );
}
