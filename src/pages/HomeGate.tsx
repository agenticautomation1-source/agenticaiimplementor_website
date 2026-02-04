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

    const run = async () => {
      if (checkedRef.current) return;
      checkedRef.current = true;

      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      // 🚨 HARD BLOCK: If session exists, go to Dashboard IMMEDIATELY
      if (data.session) {
        window.location.replace("/#/dashboard");
        return;
      }

      setReady(true);
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  // Show nothing (black screen) until we are sure user is NOT logged in
  if (!ready) return <div className="min-h-screen bg-black" />;

  return <>{children}</>;
}