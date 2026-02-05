import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const finalize = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        navigate("/", { replace: true });
        return;
      }

      navigate("/dashboard", { replace: true });
    };

    finalize();
  }, [navigate]);

  return <div className="min-h-screen bg-black" />;
}
