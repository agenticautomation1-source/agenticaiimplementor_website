import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finalizeLogin = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    };

    finalizeLogin();
  }, [navigate]);

  return null;
}
