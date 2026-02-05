import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  useEffect(() => {
    const finalizeAuth = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        window.location.replace("/#/");
        return;
      }

      if (data.session) {
        // ✅ HARD redirect is REQUIRED for HashRouter
        window.location.replace("/#/dashboard");
      } else {
        window.location.replace("/#/");
      }
    };

    finalizeAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Completing sign-in…
    </div>
  );
}
