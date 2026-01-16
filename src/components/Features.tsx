
import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <h2 className="text-white text-3xl md:text-4xl font-bold font-display">The Agentic Pillar Framework</h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Beyond basic prompting. We teach you how to build self-healing, goal-oriented autonomous systems.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {FEATURES.map((feature, idx) => (
          <div key={idx} className="glass-card p-8 rounded-xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>
            <div className="size-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
              <span className="material-symbols-outlined">{feature.icon}</span>
            </div>
            <h3 className="text-white text-xl font-bold mb-3 font-display">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
