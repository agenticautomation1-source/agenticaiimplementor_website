
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-32 pb-20 overflow-hidden">
      <div className="flex flex-col gap-12 lg:flex-row items-center">
        <div className="flex flex-col gap-8 lg:w-1/2 relative z-10">
          <div className="flex flex-col gap-6">
            <span className="text-primary text-sm font-bold tracking-[0.2em] uppercase inline-block">The Future of Autonomy</span>
            <h1 className="text-white text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight font-display">
              Master the Era of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Autonomous</span> Intelligence
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-lg">
              Join the top 1% of AI Engineers. Advanced training on Agentic workflows, multi-agent orchestration, and LLM reasoning.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button className="w-full sm:w-auto flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 bg-primary text-white text-base font-bold transition-all hover:scale-105 glow-accent">
              Get Started
            </button>
            <button className="w-full sm:w-auto flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-14 px-8 border border-white/10 bg-white/5 text-white text-base font-bold hover:bg-white/10 transition-all">
              View Syllabus
            </button>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  className="size-10 rounded-full border-2 border-background-dark object-cover" 
                  src={`https://picsum.photos/100/100?random=${i}`}
                  alt="Student"
                />
              ))}
            </div>
            <p className="text-sm text-slate-400">Joined by <span className="text-white font-bold">2,400+</span> senior developers</p>
          </div>
        </div>

        <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end">
          <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="relative w-full max-w-[500px] aspect-square glass-card rounded-2xl overflow-hidden flex items-center justify-center group">
            <div 
              className="w-full h-full bg-cover bg-center opacity-70 group-hover:scale-110 transition-transform duration-1000" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAF6BmueDByB2d3XdRzH88B4L2aICuc7mceLHh2lSVcI6MuEZnDtFnPL3ZfM3AaVf8Qos44El5-86tMWxZDgLQMqHoZMXTvjrYJuQr-iqASY_RR8THMfbG0E8MyzDSvprHf-ykcl-R54__zNJjbMFyCC7b4gaHYDkJZ_u2x1l0W4ryTpq-wUhcWfe_2nvgU-eAr5TO2LOPpqSvyqt7prZoq2AEXIEDVQZOBAZeg4NOtbxHde_2jo0ANBs79ca2E5-B-EVRzMPCrODU")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
            {/* Overlay Grid lines for tech look */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
