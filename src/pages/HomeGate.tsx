import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function HomeGate({ children }: Props) {
  const checkedRef = useRef(false);
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      if (checkedRef.current) return;
      checkedRef.current = true;

      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (data.session) {
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

if (!ready) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-dark text-slate-400">
      Loading…
    </div>
  );
}
  return <>{children}</>;
}
