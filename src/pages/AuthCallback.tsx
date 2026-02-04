import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeLogin = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Auth callback failed", error);
        navigate("/", { replace: true });
        return;
      }

      // ✅ AUTH IS NOW REAL
      navigate("/dashboard", { replace: true });
    };

    finalizeLogin();
  }, [navigate]);

  return null;
}
