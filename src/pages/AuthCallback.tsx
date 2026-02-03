import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const completeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        navigate("/", { replace: true });
        return;
      }

      // ✅ AUTH SUCCESS → DASHBOARD
      navigate("/dashboard", { replace: true });
    };

    completeAuth();
  }, [navigate]);

  return null;
}
