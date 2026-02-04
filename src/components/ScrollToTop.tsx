import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Window fallback
    window.scrollTo(0, 0);

    // 2. Scroll main container (THIS is the real fix)
    const main = document.querySelector("main");
    if (main) {
      main.scrollTop = 0;
    }

    // 3. Safety for deeply nested scroll containers
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
