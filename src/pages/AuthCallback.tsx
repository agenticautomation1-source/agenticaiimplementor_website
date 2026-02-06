import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    const resolveSession = async () => {
      if (handledRef.current) return;
      handledRef.current = true;

      // 🔴 REQUIRED FOR SUPABASE v2 OAuth
      const { error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      if (error) {
        console.error("OAuth exchange failed:", error);
        navigate("/", { replace: true });
        return;
      }

      navigate("/dashboard", { replace: true });
    };

    resolveSession();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Completing sign-in…
    </div>
  );
}
