import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      // Small delay to allow Supabase to hydrate session
      await new Promise((r) => setTimeout(r, 50));

      const { data } = await supabase.auth.getSession();

      if (cancelled) return;

      const from =
        sessionStorage.getItem("dashboard_from") || "/dashboard";

      // always clean
      sessionStorage.removeItem("dashboard_from");

      // session or not — never leave user stuck here
      navigate("/dashboard", {
        replace: true,
        state: { from },
      });
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return null;
}
