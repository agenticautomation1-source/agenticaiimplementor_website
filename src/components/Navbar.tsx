import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // =========================================================
  // UI & ANIMATION STATE (STITCH DESIGN SYSTEM)
  // =========================================================
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // =========================================================
  // AUTHENTICATION STATE
  // =========================================================
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // =========================================================
  // SCROLL OBSERVER (NAVBAR BLUR/TRANSITION)
  // =========================================================
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // =========================================================
  // REPAIRED: AUTH SESSION & REDIRECT LOGIC
  // =========================================================
  useEffect(() => {
    // 1. Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // BUG FIX: If user just signed in via Modal, close it and force move to Dashboard
      if (event === 'SIGNED_IN' && session) {
        setIsLoginModalOpen(false);
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // =========================================================
  // REPAIRED: CORE HANDLERS
  // =========================================================
  
  const handleOpenLoginModal = () => {
    // BUG FIX: Capture current program page before login
    // This allows the Dashboard button to take the user back where they came from
    const currentPath = window.location.hash.replace('#', '');
    if (currentPath.includes('/courses/')) {
      localStorage.setItem('returnPath', currentPath);
    } else {
      localStorage.removeItem('returnPath'); // Clear if on home page
    }
    setIsLoginModalOpen(true);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/#/auth/callback`,
      },
    });
    if (error) setAuthError(error.message);
    setLoading(false);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
    } else if (data.user) {
      // BUG FIX: Ensure user lands on Dashboard immediately
      setIsLoginModalOpen(false);
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    localStorage.removeItem('returnPath'); // Reset state
    navigate('/');
  };

  return (
    <>
      {/* 
          MAIN NAVBAR WRAPPER 
          Styling follows the dark, enterprise-grade aesthetic
      */}
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out border-b ${
          scrolled 
            ? 'bg-black/85 backdrop-blur-2xl border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' 
            : 'bg-transparent border-transparent py-7'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* BRANDING GROUP */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <span className="text-black font-black text-2xl italic">A</span>
              </div>
              <div className="absolute -inset-1 bg-white/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tighter text-xl leading-none uppercase">
                Agentic AI
              </span>
              <span className="text-[10px] text-gray-500 tracking-[0.4em] uppercase font-black mt-1">
                Implementors
              </span>
            </div>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-10">
              <Link to="/" className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all duration-300">Programs</Link>
              <Link to="/learning-paths" className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all duration-300">Paths</Link>
              <Link to="/about" className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all duration-300">Framework</Link>
              <Link to="/contact" className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all duration-300">Contact</Link>
            </div>

            <div className="h-5 w-[1px] bg-white/10 mx-2"></div>

            {/* AUTH SECTION (REPAIRED) */}
            <div className="flex items-center gap-8">
              {user ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-[12px] font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-cyan-300 border border-cyan-400/20 px-6 py-2.5 rounded-full bg-cyan-400/5 transition-all shadow-[0_0_15px_rgba(34,211,238,0.1)]"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={handleOpenLoginModal}
                    className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={handleOpenLoginModal}
                    className="relative group overflow-hidden bg-white text-black px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-500 hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
                  >
                    <span className="relative z-10">Join Masterstroke</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden text-white p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* MOBILE OVERLAY */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 px-10 py-16 flex flex-col gap-10 animate-in slide-in-from-top-10 duration-500">
            <div className="flex flex-col gap-8">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white tracking-tighter uppercase italic">Programs</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-white tracking-tighter uppercase italic">Framework</Link>
              {user && (
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-3xl font-black text-cyan-400 tracking-tighter uppercase italic">Dashboard</Link>
              )}
            </div>
            <div className="h-[2px] bg-white/10 w-full"></div>
            <div className="flex flex-col gap-6">
              {user ? (
                <button onClick={handleSignOut} className="text-left text-xl font-bold text-red-500 uppercase tracking-widest">Logout Session</button>
              ) : (
                <button onClick={handleOpenLoginModal} className="text-left text-xl font-bold text-white uppercase tracking-widest">Authorize Access</button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* 
          IDENTITY GATE MODAL 
          Full preservation of your complex modal styling and logic
      */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-500" 
            onClick={() => setIsLoginModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-[480px] bg-[#050505] border border-white/10 rounded-[48px] p-12 lg:p-14 shadow-[0_0_150px_rgba(0,0,0,0.9)] overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60"></div>
            
            <div className="mb-12 text-center">
              <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-[22px] flex items-center justify-center mx-auto mb-8">
                <span className="material-symbols-outlined text-cyan-500 text-3xl">shield_lock</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter italic uppercase italic">Identity Gate</h2>
              <p className="text-gray-500 text-[11px] uppercase tracking-[0.4em] font-black">
                Authorized Access Protocols
              </p>
            </div>

            <div className="space-y-5">
              {/* GOOGLE OAUTH */}
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-5 bg-white hover:bg-gray-100 text-black h-16 rounded-[22px] font-black transition-all transform active:scale-[0.97] shadow-xl shadow-white/5"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-[12px] uppercase tracking-[0.25em] font-black">Continue with Google</span>
              </button>

              <div className="relative py-10 flex items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="px-6 text-[10px] text-gray-700 uppercase tracking-[0.5em] font-black">Secure Email</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              {/* EMAIL SIGN-IN */}
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-3">
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-600 text-xl">alternate_email</span>
                    <input 
                      type="email" 
                      placeholder="AUTHORIZED WORK EMAIL" 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[22px] h-16 pl-16 pr-8 text-white text-[11px] tracking-[0.2em] font-bold placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/40 transition-all uppercase"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-600 text-xl">lock_open</span>
                    <input 
                      type="password" 
                      placeholder="ACCESS PASSWORD" 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[22px] h-16 pl-16 pr-8 text-white text-[11px] tracking-[0.2em] font-bold placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/40 transition-all uppercase"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest animate-pulse">
                    {authError}
                  </p>
                )}

                <button 
                  disabled={loading}
                  className="w-full bg-white text-black h-16 rounded-[22px] font-black transition-all disabled:opacity-50 hover:shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-[0.98]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-75"></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-150"></div>
                    </div>
                  ) : (
                    <span className="text-[12px] uppercase tracking-[0.3em]">Authenticate Access</span>
                  )}
                </button>
              </form>
            </div>

            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="mt-12 w-full text-center text-[10px] text-gray-700 hover:text-gray-400 font-black uppercase tracking-[0.4em] transition-colors"
            >
              Terminate Protocol
            </button>
          </div>
        </div>
      )}
    </>
  );
}