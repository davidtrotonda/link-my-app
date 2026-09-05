import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles scrolling on route changes:
 *  - If the URL has a hash (#pricing, #faqs, ...) we wait for the section
 *    to be mounted and smooth-scroll to it.
 *  - If there's no hash, we scroll back to the top.
 *
 * This single component covers both in-page anchor navigation (e.g. the
 * top nav's "Precio" link) and regular route transitions.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      // The target section might not exist yet during the first render of
      // a new route. Try a few times before giving up.
      let attempts = 0;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        attempts += 1;
        if (attempts < 8) setTimeout(tryScroll, 80);
      };
      tryScroll();
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
