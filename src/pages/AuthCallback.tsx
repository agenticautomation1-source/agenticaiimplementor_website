import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finishAuth = async () => {
      // 🔑 This consumes access_token from URL hash
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("OAuth session error:", error);
        navigate("/", { replace: true });
        return;
      }

      // ✅ CLEAN THE URL (CRITICAL)
      window.history.replaceState({}, document.title, "/#/dashboard");

      // ✅ GO TO DASHBOARD
      navigate("/dashboard", { replace: true });
    };

    finishAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark text-slate-400">
      Signing you in…
    </div>
  );
}
