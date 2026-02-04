import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function HomeGate({ children }: Props) {
  const checkedRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    // 1. Check session immediately on load
    const checkInitialSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted && data.session) {
        window.location.replace("/#/dashboard");
        return;
      }
      if (mounted) setReady(true);
    };

    checkInitialSession();

    // 2. Listen for auth changes (catches the exact moment sign-in finishes)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted && session) {
        window.location.replace("/#/dashboard");
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // Show a black screen while determining if we should redirect
  if (!ready) return <div className="min-h-screen bg-black" />;

  return <>{children}</>;
}