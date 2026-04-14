import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);

    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(window.scrollY > 300);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname]);

  // Show/hide button based on scroll position
  useEffect(() => {
    const updateVisibility = () => {
      const shouldShow = window.scrollY > 300;
      setIsVisible((prev) => (prev === shouldShow ? prev : shouldShow));
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateVisibility();
          ticking = false;
        });
        ticking = true;
      }
    };

    updateVisibility();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 transition-all duration-200 flex items-center justify-center hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <svg
        width="24"
        height="24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
}
