import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  useEffect(() => {
    const run = async () => {
      // Give Supabase time to hydrate session
      await new Promise((r) => setTimeout(r, 50));

      await supabase.auth.getSession();

      // Always hard redirect for HashRouter + OAuth
      window.location.replace("/#/dashboard");
    };

    run();
  }, []);

  return null;
}
