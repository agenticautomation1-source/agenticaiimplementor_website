import React from "react";
import { LOGOS } from "../constants";

const LogoMarquee: React.FC = () => {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-charcoal/40 py-12">
      <h4 className="text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-slate-500 mb-8">
        Trusted by engineers at industry leaders
      </h4>

      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-16 px-8">
          {[...LOGOS, ...LOGOS].map((logo, idx) => (
            <span
              key={idx}
              className="text-xl md:text-2xl font-black text-slate-500 transition-colors duration-300 hover:text-white cursor-default"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
