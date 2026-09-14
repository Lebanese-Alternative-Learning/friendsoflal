import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NOT_FOUND_TITLE = "Page Not Found — Friends of LAL";
const NOT_FOUND_DESCRIPTION =
  "Sorry, this page doesn't exist on the Friends of Lebanese Alternative Learning website. Head back to the homepage to learn about our work.";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  const previous = tag.getAttribute("content") ?? "";
  tag.setAttribute("content", content);
  return () => tag!.setAttribute("content", previous);
}

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = NOT_FOUND_TITLE;

    const restores = [
      setMeta('meta[name="description"]', "name", "description", NOT_FOUND_DESCRIPTION),
      setMeta('meta[property="og:title"]', "property", "og:title", NOT_FOUND_TITLE),
      setMeta('meta[property="og:description"]', "property", "og:description", NOT_FOUND_DESCRIPTION),
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", NOT_FOUND_TITLE),
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", NOT_FOUND_DESCRIPTION),
      setMeta('meta[name="robots"]', "name", "robots", "noindex, follow"),
    ];

    return () => {
      document.title = previousTitle;
      restores.forEach((restore) => restore());
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
