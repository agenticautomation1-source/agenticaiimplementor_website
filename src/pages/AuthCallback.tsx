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
        navigate("/dashboard", { replace: true });
        return;
      }

      // fallback
      navigate("/", { replace: true });
    };

    finalizeAuth();
  }, [navigate]);

  return null;
}
