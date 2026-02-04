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
  // SCROLL OBSERVER (ENTERPRISE UI SIGNAL)
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
    // 1. Initial Session Check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Auth Listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      
      // BUG FIX: Force redirect to Dashboard immediately upon sign-in
      if (event === 'SIGNED_IN' && session) {
        setIsLoginModalOpen(false);
        // Using replace ensures the user doesn't stay on the landing page
        window.location.replace("/#/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // =========================================================
  // CORE HANDLERS (REPAIRED FOR BUG FIXES)
  // =========================================================
  
  const prepareLoginFlow = () => {
    // BUG FIX: Capture the specific program page path before login modal opens
    // This allows the Dashboard "Back to Programs" button to know where to go.
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash.includes('/courses/')) {
      localStorage.setItem('returnPath', currentHash);
    } else {
      localStorage.removeItem('returnPath'); // Clear if starting from home
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
      // BUG FIX: Immediate redirect for email sign-ins
      setIsLoginModalOpen(false);
      window.location.replace("/#/dashboard");
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    localStorage.removeItem('returnPath');
    window.location.replace("/#/");
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out border-b ${
          scrolled 
            ? 'bg-black/85 backdrop-blur-2xl border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          
          {/* Logo Group */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-white rounded-[1.25rem] flex items-center justify-center transition-all duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-[0_0_25px_rgba(255,255,255,0.15)]">
                <span className="text-black font-black text-2xl italic">A</span>
              </div>
              <div className="absolute -inset-1 bg-white/20 rounded-[1.25rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tighter text-xl leading-none uppercase">
                Agentic AI
              </span>
              <span className="text-[10px] text-gray-500 tracking-[0.45em] uppercase font-black mt-1.5 group-hover:text-cyan-400 transition-colors">
                Implementors
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <div className="flex items-center gap-10">
              <Link to="/" className="text-[12px] font-bold uppercase tracking-[0.25em] text-gray-500 hover:text-white transition-all duration-300">Programs</Link>
              <Link to="/learning-paths" className="text-[12px] font-bold uppercase tracking-[0.25em] text-gray-500 hover:text-white transition-all duration-300">Paths</Link>
              <Link to="/about" className="text-[12px] font-bold uppercase tracking-[0.25em] text-gray-500 hover:text-white transition-all duration-300">About</Link>
              <Link to="/contact" className="text-[12px] font-bold uppercase tracking-[0.25em] text-gray-500 hover:text-white transition-all duration-300">Contact</Link>
            </div>

            <div className="h-6 w-[1px] bg-white/10 mx-2"></div>

            {/* Repaired: Auth Section Rendering */}
            <div className="flex items-center gap-8">
              {user ? (
                <div className="flex items-center gap-8 animate-in fade-in slide-in-from-right-4">
                  <Link 
                    to="/dashboard" 
                    className="text-[12px] font-bold uppercase tracking-[0.2em] text-cyan-400 border border-cyan-400/25 px-7 py-2.5 rounded-full bg-cyan-400/5 hover:bg-cyan-400/10 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-red-500 transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-8 animate-in fade-in slide-in-from-right-4">
                  <button 
                    onClick={prepareLoginFlow}
                    className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors duration-300"
                  >
                    Log In
                  </button>
                  <button 
                    onClick={prepareLoginFlow}
                    className="relative group overflow-hidden bg-white text-black px-9 py-3.5 rounded-full text-[12px] font-black uppercase tracking-[0.25em] transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_15px_45px_rgba(255,255,255,0.1)]"
                  >
                    <span className="relative z-10">Secure Access</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Trigger */}
          <button 
            className="lg:hidden text-white p-4 hover:bg-white/5 rounded-[1.25rem] transition-all active:scale-90" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-4xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-3xl border-b border-white/10 px-12 py-20 flex flex-col gap-12 animate-in slide-in-from-top-12 duration-500 ease-out h-[90vh]">
            <div className="flex flex-col gap-10">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-white tracking-tighter uppercase italic transition-all active:translate-x-4">Programs</Link>
              <Link to="/learning-paths" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-white tracking-tighter uppercase italic transition-all active:translate-x-4">Learning Paths</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-white tracking-tighter uppercase italic transition-all active:translate-x-4">Framework</Link>
              {user && (
                <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="text-4xl font-black text-cyan-400 tracking-tighter uppercase italic transition-all active:translate-x-4">Dashboard</Link>
              )}
            </div>
            <div className="h-[2px] bg-gradient-to-r from-white/15 via-white/5 to-transparent w-full mt-auto"></div>
            <div className="flex flex-col gap-8 pb-10">
              {user ? (
                <button onClick={handleSignOut} className="text-left text-2xl font-bold text-red-500 uppercase tracking-[0.2em]">Terminate Session</button>
              ) : (
                <button onClick={prepareLoginFlow} className="text-left text-2xl font-bold text-white uppercase tracking-[0.2em]">Authorize Login</button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Identity Gate Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-700" 
            onClick={() => setIsLoginModalOpen(false)}
          ></div>
          
          <div className="relative w-full max-w-[500px] bg-[#050505] border border-white/10 rounded-[56px] p-12 lg:p-16 shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden animate-in zoom-in-95 duration-500 ease-out text-center">
            
            <div className="absolute top-0 left-0 w-full h-[4px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70"></div>
            
            <div className="mb-14">
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[28px] flex items-center justify-center mx-auto mb-10 shadow-inner shadow-white/5 group">
                <span className="material-symbols-outlined text-cyan-500 text-4xl group-hover:scale-110 transition-transform duration-500">shield_person</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-5 tracking-tighter italic uppercase italic">Identity Gate</h2>
              <p className="text-gray-500 text-[11px] leading-relaxed max-w-[320px] mx-auto uppercase tracking-[0.45em] font-black italic">
                Authorized Secure Protocol V.2
              </p>
            </div>

            <div className="space-y-6">
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-6 bg-white hover:bg-gray-100 text-black h-16 rounded-[24px] font-black transition-all duration-300 transform active:scale-[0.96] shadow-2xl shadow-white/10"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-[12px] uppercase tracking-[0.3em] font-black">Verify with Google</span>
              </button>

              <div className="relative py-12 flex items-center">
                <div className="flex-grow border-t border-white/10"></div>
                <span className="px-8 text-[10px] text-gray-700 uppercase tracking-[0.6em] font-black italic">Internal Registry</span>
                <div className="flex-grow border-t border-white/10"></div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative text-left">
                    <span className="absolute left-7 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-700 text-2xl">passkey</span>
                    <input 
                      type="email" 
                      placeholder="AUTHORIZED REGISTRY EMAIL" 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[24px] h-16 pl-16 pr-10 text-white text-[11px] tracking-[0.25em] font-bold placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/50 transition-all duration-500 uppercase shadow-inner"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="relative text-left">
                    <span className="absolute left-7 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-700 text-2xl">encrypted</span>
                    <input 
                      type="password" 
                      placeholder="ENCRYPTION ACCESS KEY" 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-[24px] h-16 pl-16 pr-10 text-white text-[11px] tracking-[0.25em] font-bold placeholder:text-gray-800 focus:outline-none focus:border-cyan-500/50 transition-all duration-500 uppercase shadow-inner"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                </div>

                {authError && (
                  <p className="text-red-600 text-[10px] text-center font-black uppercase tracking-[0.3em] animate-pulse">
                    Access Denied: {authError}
                  </p>
                )}

                <button 
                  disabled={loading}
                  className="w-full bg-white text-black h-16 rounded-[24px] font-black transition-all duration-300 disabled:opacity-50 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)] active:scale-[0.97]"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce"></div>
                      <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    </div>
                  ) : (
                    <span className="text-[12px] uppercase tracking-[0.35em]">Validate Identity</span>
                  )}
                </button>
              </form>
            </div>

            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="mt-14 w-full text-center text-[10px] text-gray-700 hover:text-gray-400 font-black uppercase tracking-[0.5em] transition-colors duration-300"
            >
              Abort Connection
            </button>
          </div>
        </div>
      )}
    </>
  );
}