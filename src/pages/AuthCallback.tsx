import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        window.location.replace("/#/dashboard"); // Force move to dashboard
      }
    });
  }, [navigate]);

  return <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400 uppercase tracking-[0.5em] text-xs">Authenticating Session...</div>;
}