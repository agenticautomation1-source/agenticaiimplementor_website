
import React from 'react';
import { LOGOS } from '../constants';

const LogoMarquee: React.FC = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-charcoal/30 overflow-hidden">
      <h4 className="text-slate-500 text-[10px] md:text-xs font-bold leading-normal tracking-[0.2em] uppercase text-center mb-8">
        Trusted by engineers at industry leaders
      </h4>
      <div className="flex relative w-full opacity-40 grayscale hover:opacity-80 transition-opacity">
        <div className="flex items-center gap-12 whitespace-nowrap animate-marquee">
          {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, idx) => (
            <span key={idx} className="text-xl md:text-2xl font-black text-white px-8">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
