import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  useEffect(() => {
    supabase.auth.getSession();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark text-slate-400">
      Signing you in…
    </div>
  );
}
