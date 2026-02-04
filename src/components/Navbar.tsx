import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // -- UI State --
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // -- Auth State --
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Track scroll for background blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync user session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  /**
   * BUG FIX 1: Save the current program page so Dashboard can go back to it
   */
  const saveReturnPath = () => {
    const currentPath = window.location.hash.replace('#', '');
    if (currentPath.includes('/courses/')) {
      localStorage.setItem('returnPath', currentPath);
      // Also set sessionStorage for the Dashboard's specific logic
      sessionStorage.setItem("dashboard_from", currentPath);
    }
  };

  /**
   * BUG FIX 2: Google Sign-in with explicit Dashboard redirect
   */
  const handleGoogleLogin = async () => {
    saveReturnPath();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/#/auth/callback`,
      },
    });
    if (error) console.error("OAuth Error:", error.message);
  };

  /**
   * BUG FIX 3: Email Sign-in with immediate Dashboard redirect
   */
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveReturnPath();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else if (data.user) {
      setIsLoginModalOpen(false);
      navigate('/dashboard'); 
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-[100] transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-xl border-white/10 py-3' 
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="w-9 h-9 bg-white rounded flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-black font-black text-xl">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-tighter text-lg leading-none">
                MASTERSTROKE
              </span>
              <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase font-medium">
                Agentic Systems
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/courses" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Programs</Link>
            <Link to="/learning-paths" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Paths</Link>
            <Link to="/about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Framework</Link>
            
            <div className="h-4 w-[1px] bg-white/10 mx-2"></div>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full transition-all"
                >
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">Account</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <button 
                      onClick={() => { navigate('/dashboard'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">dashboard</span> Dashboard
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-400/5 transition-colors border-t border-white/5"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all transform active:scale-95"
                >
                  Secure Spot
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsLoginModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#050505] border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
            
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">Access Platform</h2>
              <p className="text-gray-500 text-sm">Sign in to manage your agentic certifications.</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black h-12 rounded-xl font-bold transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <div className="relative py-4 flex items-center">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="px-4 text-[10px] text-gray-600 uppercase tracking-widest">or email</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div className="space-y-2">
                  <input 
                    type="email" 
                    placeholder="Work Email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-white focus:outline-none focus:border-white/30 transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button 
                  disabled={loading}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12 rounded-xl font-bold transition-all disabled:opacity-50"
                >
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            </div>

            <button 
              onClick={() => setIsLoginModalOpen(false)}
              className="mt-8 w-full text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              Cancel and return to home
            </button>
          </div>
        </div>
      )}
    </>
  );
}