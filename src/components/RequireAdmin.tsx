import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

type Props = {
  children: React.ReactNode;
};

export default function RequireAdmin({ children }: Props) {
  console.log("★★★★★ REQUIRE ADMIN V2 LOADED ★★★★★");

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;

 async function checkAccess() {
  try {
    console.log("STEP 1");

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    console.log("STEP 2");
    console.log("Session Error:", sessionError);
    console.log("Session:", session);

    if (!session?.user?.email) {
      console.log("STEP 3 - No session");

      setAllowed(false);
      setLoading(false);
      return;
    }

    console.log("STEP 4");
    console.log("Email:", session.user.email);

    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .eq("email", session.user.email)
      .maybeSingle();

    console.log("STEP 5");
    if (data) {
  console.log("ACCESS GRANTED");
} else {
  console.log("ACCESS DENIED");
}
    console.log("Admin Row:", data);
    console.log("Admin Error:", error);

    setAllowed(
  !!data &&
  data.active === true &&
  data.role?.toLowerCase() === "admin"
);

    setLoading(false);
  } catch (err) {
    console.error("REQUIRE ADMIN CRASHED:", err);
    setAllowed(false);
    setLoading(false);
  }
}

    checkAccess();

    return () => {
      mounted = false;
    };

  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Verifying administrator access...
      </div>
    );
  }

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}