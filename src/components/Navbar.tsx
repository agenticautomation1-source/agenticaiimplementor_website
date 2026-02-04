import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, Mail, Chrome } from 'lucide-react';

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
    // If we are already on a course page, save it.
    if (currentPath.includes('/courses/')) {
      localStorage.setItem('returnPath', currentPath);
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
      navigate('/dashboard'); // Go straight to Dashboard
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
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
                  <div className="w-5 h-5 bg-cyan-500 rounded-full flex items-center justify-center text-[10px] font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white">Account</span>
                  <ChevronDown size={14} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                    <button 
                      onClick={() => { navigate('/dashboard'); setIsProfileOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </button>
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-400/5 transition-colors border-t border-white/5"
                    >
                      <LogOut size={16} /> Sign Out
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
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Login Modal (Stitch Inspired Design) */}
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
                <Chrome size={20} /> Continue with Google
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