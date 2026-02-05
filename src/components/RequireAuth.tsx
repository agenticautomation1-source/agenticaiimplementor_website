import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      setAuthenticated(!!data.session);
      setLoading(false);
    };

    check();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return null; // or a spinner if you want
  }

  if (!authenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
