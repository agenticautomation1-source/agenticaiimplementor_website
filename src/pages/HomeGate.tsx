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

      // Just check session to avoid home-page flash.
      // DO NOT redirect from here.
      await supabase.auth.getSession();

      if (!mounted) return;
      setReady(true);
    };

    run();

    return () => {
      mounted = false;
    };
  }, []);

  // prevent home flash while checking session
  if (!ready) return null;

  return <>{children}</>;
}
