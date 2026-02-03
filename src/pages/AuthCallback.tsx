import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    };

    run();
  }, [navigate]);

  return null;
}
