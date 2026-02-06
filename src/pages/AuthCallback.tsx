import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeOAuth = async () => {
      const { data, error } =
        await supabase.auth.exchangeCodeForSession(window.location.href);

      if (error) {
        console.error("OAuth exchange failed:", error);
        return;
      }

      if (data.session) {
        navigate("/dashboard", { replace: true });
      }
    };

    completeOAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Completing sign-in…
    </div>
  );
}
