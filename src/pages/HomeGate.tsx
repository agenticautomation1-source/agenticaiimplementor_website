import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const HomeGate = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [checked, setChecked] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setHasSession(!!data.session);
      setChecked(true);
    });
  }, []);

  if (!checked) return null;

  // 🔒 CRITICAL GUARD:
  // Redirect ONLY when landing on `/` without navigation state (OAuth case)
  if (hasSession && location.pathname === "/" && !location.state) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default HomeGate;
