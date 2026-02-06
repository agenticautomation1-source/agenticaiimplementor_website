import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const resolveSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("AuthCallback session error:", error);
        return;
      }

      if (data.session) {
        navigate("/dashboard", { replace: true });
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
