import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [nodes, setNodes] = useState(12840);
  const [latency, setLatency] = useState(8);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev + (Math.random() > 0.5 ? 2 : -1));
      setLatency(prev => Math.floor(Math.random() * 3 + 7));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-32 pb-20 overflow-hidden">
      <div className="flex flex-col gap-12 lg:flex-row items-center">
        <div className="flex flex-col gap-8 lg:w-1/2 relative z-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary text-[10px] font-bold tracking-[0.6em] uppercase inline-block font-mono">
                STATUS: NOMINAL // NODES_ACTIVE: {nodes}
              </span>
            </div>
            <h1 className="text-white text-5xl md:text-7xl font-bold leading-[0.95] tracking-tighter font-display">
              Orchestrate the <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-400 to-indigo-500 glow-text">Neural Masterstroke</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
              Enterprise-grade autonomous system integration. We architect the protocols that bind disparate AI modules into unified, self-governing swarms.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto flex min-w-[260px] cursor-pointer items-center justify-center rounded-xl h-16 px-8 bg-primary text-sm font-bold tracking-widest uppercase text-white transition-all hover:scale-105 glow-accent active:scale-95 group relative overflow-hidden"
            >
              <span className="relative flex items-center gap-2">
                Join the Masterstroke
                <span className="material-symbols-outlined text-xl">bolt</span>
              </span>
            </button>
            <button className="w-full sm:w-auto flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-16 px-8 border border-white/10 bg-white/5 text-white text-[10px] font-bold font-mono tracking-[0.3em] hover:bg-white/10 transition-all active:scale-95 uppercase">
              Download Protocol
            </button>
          </div>

          <div className="flex items-center gap-6 pt-10 border-t border-white/5">
             <div className="flex flex-col">
              <div className="flex items-center gap-2">
                 <span className="text-white font-bold text-sm">Top 1% Global Integrators</span>
                 <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono font-bold uppercase tracking-wider">Verified</span>
              </div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Stitching 1.2M autonomous loops daily</span>
            </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end">
          {/* Subtle glow background - Clean with no gridlines */}
          <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full"></div>
          
          <div className="relative w-full max-w-[560px] aspect-[4/5] glass-card rounded-[3rem] overflow-hidden flex items-center justify-center border-white/5 shadow-2xl">
             
             {/* Integrator HUD Stats */}
             <div className="absolute top-12 left-12 right-12 flex justify-between items-start z-20 font-mono">
                <div className="flex flex-col gap-1">
                   <div className="text-[10px] text-primary font-bold tracking-[0.3em] uppercase opacity-70">Uplink</div>
                   <div className="text-white/90 text-[11px] font-bold tracking-tight uppercase">STITCH_V4_CORE</div>
                </div>
                <div className="text-right">
                   <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Sync</div>
                   <div className="text-primary text-[11px] font-bold">{latency}ms</div>
                </div>
             </div>

             {/* Focal Visual Element (Simplified) */}
             <div className="absolute inset-0 z-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-48 h-48 animate-spin-slow opacity-20">
                  <path d="M50 15 L85 75 L15 75 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="10 5" />
                  <circle cx="50" cy="55" r="5" fill="#3b82f6" />
                </svg>
             </div>

             <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/40 backdrop-blur-3xl rounded-[2rem] border border-white/5 z-20">
                <div className="flex justify-between items-center mb-4">
                   <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-sm">settings_input_component</span>
                      <span className="text-[10px] text-white font-bold tracking-[0.2em] uppercase font-mono">Neural_Affinity</span>
                   </div>
                   <span className="text-[11px] text-primary font-bold font-mono">99.9%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-primary via-blue-400 to-indigo-500" style={{ width: '99.9%' }}></div>
                </div>
             </div>

            {/* Background image without grid overlays */}
            <div 
              className="w-full h-full bg-cover bg-center transition-all duration-[30s] ease-out opacity-40 scale-110" 
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200")' }}
            ></div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;