import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { supabase } from "../lib/supabaseClient";

const Navbar: React.FC = () => {
  
const [user, setUser] = useState<any>(null);

const [showLogoutModal, setShowLogoutModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
  let mounted = true;

  const loadSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!mounted) return;
    setUser(session?.user ?? null);
  };

  loadSession();

  const { data: listener } = supabase.auth.onAuthStateChange(
    (_event, session) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
    }
  );

  return () => {
    mounted = false;
    listener.subscription.unsubscribe();
  };
}, []);

  const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/#/auth/callback`,
      queryParams: {
        prompt: "login",
      },
    },
  });
};

  const logout = async () => {
  await supabase.auth.signOut();
  setShowLogoutModal(true);
};

  const goToPrograms = () => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });
    }

    setTimeout(() => {
      const el = document.getElementById("curriculum");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const LogoutModal = () => {
    if (!showLogoutModal) return null;

    return createPortal(
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div className="w-full max-w-md rounded-2xl bg-[#0b0f16] border border-white/10 p-8 shadow-2xl">
          <h3 className="text-white text-lg font-semibold mb-4">
            You’re logged out
          </h3>

          <p className="text-slate-400 text-sm mb-6">
            You’re logged out of Agentic AI Implementors.
            <br /><br />
            To force Google to ask for an account again,
            you must also log out of Google.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
  setShowLogoutModal(false);
  navigate("/", { replace: true });
}}
              className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
            >
              Continue
            </button>

            <button
              onClick={() =>
                window.open("https://accounts.google.com/logout", "_blank")
              }
              className="px-4 py-2 rounded-lg text-sm font-bold bg-red-500 text-black hover:brightness-110 transition"
            >
              Log out of Google
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="fixed top-0 left-5 right-5 z-50 py-4 pointer-events-none">
        <header
          className="
            pointer-events-auto
            flex items-center justify-between
            border border-white/10
            bg-background-dark/80
            backdrop-blur-md
            rounded-xl
            px-4 md:px-6
            py-3
            shadow-2xl
          "
        >
          {/* BRAND */}
          <Link
            to="/"
            className="flex items-center gap-3 text-white cursor-pointer hover:opacity-90 transition-opacity"
          >
            <h2 className="text-white text-lg md:text-xl font-semibold">
              Agentic AI{" "}
              <span className="text-slate-400 font-light">Implementors</span>
            </h2>
          </Link>

          {/* NAV */}
          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden lg:flex items-center gap-6">
              <button onClick={goToPrograms} className="nav-link">
                Programs
              </button>
              <Link to="/learning-paths" className="nav-link">Learning Paths</Link>
              <Link to="/courses" className="nav-link">Courses</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>

            {!user && (
  <button onClick={signInWithGoogle}>
    Secure Entry
  </button>
)}

{user && (
  <>
    <span className="text-xs text-white/70">
      Signed in as <strong>{user.email}</strong>
    </span>

    <Link to="/dashboard" className="text-xs uppercase">
      Dashboard
    </Link>

    <button onClick={logout} className="text-xs uppercase text-white/60">
      Logout
    </button>
  </>
)}
          </div>
        </header>
      </div>

      <LogoutModal />
    </>
  );
};

export default Navbar;
