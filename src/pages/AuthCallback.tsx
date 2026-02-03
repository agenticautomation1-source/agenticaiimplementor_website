import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error("Auth callback failed", error);
        navigate("/", { replace: true });
        return;
      }

      navigate("/dashboard", { replace: true });
    };

    finalizeAuth();
  }, [navigate]);

  return null;
}
