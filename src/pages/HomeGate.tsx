import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

/**
 * HomeGate: Ensures that authenticated users are automatically 
 * redirected to the Dashboard and never see the landing page.
 */
export default function HomeGate({ children }: Props) {
  const checkedRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      // Prevent double-execution in React Strict Mode
      if (checkedRef.current) return;
      checkedRef.current = true;

      // Check if a session already exists
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session) {
        // 🚨 HARD BLOCK: Logged-in users are forced to Dashboard immediately.
        // Using replace to ensure they cannot 'back' into the landing page.
        window.location.replace("/#/dashboard");
        return;
      }

      // If no session, allow the landing page children to render
      setReady(true);
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  // While checking auth, render nothing to prevent 'flashing' the landing page
  if (!ready) {
    return (
      <div className="min-h-screen bg-black" />
    );
  }

  return <>{children}</>;
}