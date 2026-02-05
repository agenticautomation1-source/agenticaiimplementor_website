import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        navigate("/", { replace: true });
        return;
      }

      if (data.session) {
        // ✅ Session is now hydrated from hash
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    };

    finalizeAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Completing sign-in…
    </div>
  );
}
