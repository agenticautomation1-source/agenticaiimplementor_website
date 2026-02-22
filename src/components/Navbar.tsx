import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { hardLogout } from "../lib/logout";

const Navbar: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [mobileOpen, setMobileOpen] = useState(false); 

  useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    setSession(session);
  });

  return () => subscription.unsubscribe();
}, []);

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  }; 

  return (
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
        {/* BRAND — LEFT RAIL ALIGNED */}
        <Link
          to="/"
          className="flex items-center gap-3 text-white cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="size-10 flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]"
            >
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <path d="M46 15 L20 75 L32 75 L50 25 Z" fill="url(#blueGrad)" />
              <path d="M54 15 L80 75 L70 75 L50 25 Z" fill="url(#blueGrad)" />
              <path d="M58 45 L88 45 L88 52 L62 52 Z" fill="#2563eb" />
              <path d="M64 60 L88 60 L88 67 L68 67 Z" fill="#1e40af" />
              <path d="M25 80 L75 80 L75 90 L25 90 Z" fill="#1e3a8a" />
              <circle
                cx="48"
                cy="65"
                r="7"
                fill="#6366f1"
                className="animate-pulse"
              />
            </svg>
          </div>

          <h2 className="text-white text-lg md:text-xl font-semibold leading-tight tracking-tight font-display whitespace-nowrap">
            Agentic AI{" "}
            <span className="text-slate-400 font-light">Implementors</span>
          </h2>
        </Link>

        {/* NAV + CTA — RIGHT EDGE DISTRIBUTED */}
        <div className="flex items-center gap-4 md:gap-8">
		
  {/* Mobile Hamburger */}
  <button
    onClick={() => setMobileOpen(!mobileOpen)}
    className="lg:hidden text-white focus:outline-none"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {mobileOpen ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      )}
    </svg>
  </button>

  <nav className="hidden lg:flex items-center gap-6">
		
          
            <Link to="/" className="nav-link">Home</Link>
			<Link to="/learning-path" className="nav-link">Learning Paths</Link>
			
			<a
  href="https://blog.agenticaiimplementors.com"
  className="nav-link"
>
  Blog
</a>
			
            <Link to="/courses" className="nav-link">Program</Link>
			<Link to="/sample-certificate" className="hover:text-white transition">Certificates</Link>
			
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          {!session && (
            <button
              onClick={signInWithGoogle}
              className="
                flex min-w-[110px] items-center justify-center
                rounded-lg h-10 px-4
                bg-primary text-white text-[10px] font-bold tracking-widest uppercase
                hover:brightness-110 hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]
                active:scale-[0.96]
                transition-all duration-300
                glow-accent
              "
            >
              Secure Entry
            </button>
          )}

          {session && (
            <>
              <Link
                to="/dashboard"
                className="
                  flex min-w-[110px] items-center justify-center
                  rounded-lg h-10 px-4
                  border border-white/20
                  text-white text-[10px] font-bold tracking-widest uppercase
                  hover:bg-white/10 transition-all
                "
              >
                Dashboard
              </Link>

<button
  onClick={hardLogout}
  className="
    text-[10px] uppercase tracking-widest
    text-white/60 hover:text-white
  "
>
  Logout
</button>
            </>
          )}
        </div>
      </header>
	  
	  {/* Mobile Dropdown */}
{mobileOpen && (
  <div className="lg:hidden mt-2 bg-background-dark/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-6 space-y-4 pointer-events-auto">
    <Link to="/" onClick={() => setMobileOpen(false)} className="block nav-link">
	Home
	</Link>
    <Link to="/learning-path" onClick={() => setMobileOpen(false)} className="block nav-link">
      Learning Paths
    </Link>
	
	<a
  href="https://blog.agenticaiimplementors.com"
  onClick={() => setMobileOpen(false)}
  className="block nav-link"
>
  Blog
</a>
	
	
    <Link to="/courses" onClick={() => setMobileOpen(false)} className="block nav-link">
  Program
</Link>
    <Link to="/sample-certificate" onClick={() => setMobileOpen(false)} className="block nav-link">
      Certificates
    </Link>
    <Link to="/about" onClick={() => setMobileOpen(false)} className="block nav-link">
      About
    </Link>
    <Link to="/contact" onClick={() => setMobileOpen(false)} className="block nav-link">
      Contact
    </Link>
  </div>
)}

	  
    </div>
  );
};

export default Navbar;
