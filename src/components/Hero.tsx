import React, { useEffect } from "react";
import heroImage from "../assets/hero.png";

const Hero: React.FC = () => {
  useEffect(() => {
    // Reserved for future real status hooks
  }, []);

  return (
    <section className="max-w-[1200px] mx-auto px-6 pt-32 pb-24">
      <div className="flex flex-col gap-16 lg:flex-row items-center">
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-10 lg:w-1/2 relative z-10">
          {/* STATUS */}
          <div className="flex items-center gap-3">
            {/* LIVE INDICATOR */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>

            <span className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
              Status: Live · Multi-Agent Systems Coordinated
            </span>
          </div>

          {/* HEADLINE */}
<h1 className="text-white text-5xl md:text-7xl font-display font-semibold leading-[1.0]">
  Build Agentic AI Systems
</h1>
<div className="mt-2">
  <span className="text-4xl md:text-5xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">
    Masterstroke
  </span>
</div>

          {/* SUBTEXT */}
          <p className="font-body text-base md:text-lg text-slate-400 leading-relaxed max-w-xl">
            Enterprise-grade autonomous system integration. We architect the
            protocols that bind disparate AI modules into unified,
            self-governing systems.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("curriculum")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group relative inline-flex items-center justify-center h-14 px-8 rounded-xl bg-primary text-white font-body font-semibold text-sm transition-all hover:scale-[1.04] glow-accent"
            >
              <span className="flex items-center gap-2">
                Join the Masterstroke
                <span className="material-symbols-outlined text-lg">bolt</span>
              </span>
            </button>

            <button
              className="
                relative inline-flex items-center justify-center
                h-14 px-8 rounded-xl
                bg-white/5 text-white font-body text-sm
                transition-all duration-300 ease-out
                hover:bg-primary
                hover:shadow-[0_0_20px_rgba(59,130,246,0.45),0_0_45px_rgba(59,130,246,0.3)]
              "
            >
              Book a Program Consultation Call
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="lg:w-1/2 relative w-full flex justify-center lg:justify-end overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-primary/10 blur-[140px] rounded-full" />

          <div className="relative w-full max-w-[560px] aspect-[4/5] glass-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            {/* BREATHING IMAGE */}
            <div
              className="
                absolute inset-0
                bg-cover bg-center
                opacity-85
                animate-[hero-breathe_10s_ease-in-out_infinite]
              "
              style={{
                backgroundImage: `url(${heroImage})`,
              }}
            />

            {/* METALLIC SHIMMER */}
            <div
              className="
                absolute bottom-4 left-[-40%]
                w-[180%] h-[3px]
                bg-gradient-to-r
                from-transparent via-white/70 to-transparent
                blur-[2px]
                opacity-80
                animate-[metal-shimmer_6s_linear_infinite]
                pointer-events-none
              "
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
