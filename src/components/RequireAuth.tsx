import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function RequireAuth({ children }: Props) {
  const [loading, setLoading] = useState(true);
const [authenticated, setAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    // 1️⃣ Get initial session
    supabase.auth.getSession().then(({ data }) => {
  if (!mounted) return;
  setAuthenticated(!!data.session);
  setLoading(false);
});

    // 2️⃣ Listen for OAuth completion
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
  if (!mounted) return;
  setAuthenticated(!!session);
  setLoading(false);
});

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ⏳ Wait — do NOT redirect while loading
if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      Checking session…
    </div>
  );
}

  // ❌ No session → kick out
  // ❌ No session → kick out
if (!authenticated) {
  // IMPORTANT: do NOT redirect during OAuth callback
  if (location.pathname === "/auth/callback") {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Finalizing sign-in…
      </div>
    );
  }

  return <Navigate to="/" replace />;
}

  // ✅ Auth confirmed
  return <>{children}</>;
}
