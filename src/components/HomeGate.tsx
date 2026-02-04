import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function HomeGate({ children }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          // logged-in users should not see landing
          window.location.replace("/#/dashboard");
          return;
        }
      } catch (e) {
        console.error(e);
      }

      setReady(true);
    };

    check();
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark text-slate-400">
        Loading…
      </div>
    );
  }

  return <>{children}</>;
}
