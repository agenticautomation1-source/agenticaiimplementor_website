
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-6 pointer-events-none">
      <header className="w-full max-w-[1200px] pointer-events-auto flex items-center justify-between border border-white/10 bg-background-dark/80 backdrop-blur-md rounded-xl px-6 md:px-8 py-3">
        <div className="flex items-center gap-3 text-white">
          <div className="size-8 bg-primary rounded flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-xl">deployed_code</span>
          </div>
          <h2 className="text-white text-lg md:text-xl font-bold leading-tight tracking-tight font-display whitespace-nowrap">Elite Agentic AI</h2>
        </div>
        
        <div className="flex flex-1 justify-end items-center gap-4 md:gap-10">
          <nav className="hidden lg:flex items-center gap-8">
            <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#">Curriculum</a>
            <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#">Certification</a>
            <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#">Enterprise</a>
            <a className="text-slate-400 hover:text-white text-sm font-medium transition-colors" href="#">Member Login</a>
          </nav>
          <button className="flex min-w-[100px] md:min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 md:px-6 bg-primary text-white text-xs md:text-sm font-bold tracking-wide hover:brightness-110 transition-all glow-accent">
            Join the Elite
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
