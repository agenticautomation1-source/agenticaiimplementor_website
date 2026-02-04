import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function HomeGate({ children }: Props) {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // This listener reacts the instant the Auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        // 🚨 AUTO-REDIRECT: The moment a session exists, move to dashboard
        navigate('/dashboard', { replace: true });
      } else {
        // Only show the landing page if there is definitely no user
        setReady(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Prevent "Flash" of landing page: Show nothing until we know auth state
  if (!ready) return <div className="min-h-screen bg-black" />;

  return <>{children}</>;
}