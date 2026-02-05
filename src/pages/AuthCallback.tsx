import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();
  const handledRef = useRef(false);

  useEffect(() => {
    // 1️⃣ Handle already-existing session (critical for OAuth)
    supabase.auth.getSession().then(({ data }) => {
      if (data.session && !handledRef.current) {
        handledRef.current = true;
        navigate("/dashboard", { replace: true });
      }
    });

    // 2️⃣ Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && !handledRef.current) {
        handledRef.current = true;
        navigate("/dashboard", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Completing sign-in…
    </div>
  );
}
