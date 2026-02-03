import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function HomeGate({ children }: Props) {
  const navigate = useNavigate();
  const checkedRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (checkedRef.current) return;
      checkedRef.current = true;

      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session?.user) {
        navigate("/dashboard", { replace: true });
        return;
      }

      setReady(true);
    };

    run();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  // prevent home flash while checking session
  if (!ready) return null;

  return <>{children}</>;
}
