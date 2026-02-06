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

      try {
        // ✅ SUPABASE v2 — NO ARGUMENTS
        const { error } = await supabase.auth.exchangeCodeForSession();

        if (error) {
          console.error("Session exchange failed:", error);
          navigate("/", { replace: true });
          return;
        }

        // ✅ SUCCESS → DASHBOARD
        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Auth callback crashed:", err);
        navigate("/", { replace: true });
      }
    };

    resolveSession();
  }, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Completing sign-in…
    </div>
  );
}
