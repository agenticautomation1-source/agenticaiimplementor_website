import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function HomeGate({ children }: Props) {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        navigate("/dashboard", { replace: true });
        return;
      }

      setReady(true);
    };

    check();
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
