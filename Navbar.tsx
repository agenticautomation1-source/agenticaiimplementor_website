import React from 'react';

interface NavbarProps {
  onLogin?: () => void;
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, isLoggedIn }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-6 pointer-events-none">
      <header className="w-full max-w-[1200px] pointer-events-auto flex items-center justify-between border border-white/10 bg-background-dark/80 backdrop-blur-md rounded-xl px-6 md:px-8 py-3 shadow-2xl">
        <div className="flex items-center gap-3 text-white">
          <div className="size-9 flex items-center justify-center">
            {/* Custom SVG Logo modeled after the user provided image */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              {/* Main triangular frame */}
              <path d="M50 10 L90 80 L75 80 L50 35 L25 80 L10 80 Z" fill="url(#logoGrad)" />
              {/* Horizontal segments on the right side of the triangle */}
              <rect x="58" y="45" width="28" height="8" rx="2" fill="#1e40af" />
              <rect x="62" y="60" width="24" height="8" rx="2" fill="#1e3a8a" />
              {/* Central node dot */}
              <circle cx="48" cy="62" r="6" fill="#6366f1" className="animate-pulse" />
            </svg>
          </div>
          <h2 className="text-white text-lg md:text-xl font-bold leading-tight tracking-tight font-display whitespace-nowrap">
            Agentic AI <span className="text-slate-400 font-light">Integrators</span>
          </h2>
        </div>
        
        <div className="flex flex-1 justify-end items-center gap-4 md:gap-8">
          <nav className="hidden lg:flex items-center gap-6">
            <a className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors" href="#">Programs</a>
            <a className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors" href="#">Learning Paths</a>
            <a className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors" href="#curriculum">Courses</a>
            <a className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors" href="#">About</a>
            <a className="text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors" href="#">Contact</a>
          </nav>
          <button 
            onClick={onLogin}
            className="flex min-w-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-[10px] font-bold tracking-widest uppercase hover:brightness-110 transition-all glow-accent"
          >
            {isLoggedIn ? 'Dashboard' : 'Secure Entry'}
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;