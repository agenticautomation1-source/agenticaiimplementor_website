import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function HomeGate({ children }: Props) {
  
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  let mounted = true;

  const run = async () => {
if (window.location.hash.includes("access_token")) {
  setReady(true);
  return;
}

    try {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      if (data.session) {
        navigate("/dashboard", { replace: true });
        return;
      }
    } catch (err) {
      console.error("HomeGate getSession failed:", err);
    }

    if (mounted) {
      setReady(true);
    }
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
