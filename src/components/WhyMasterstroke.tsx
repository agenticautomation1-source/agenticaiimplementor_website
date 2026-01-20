import React from "react";

const WhyMasterstroke: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24">
      <div className="mb-16 text-center">
        <h2 className="text-white text-4xl md:text-5xl font-bold font-display">
          Built for Real-World Agentic Systems
        </h2>
        <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto">
          Everything in Masterstroke is designed around production,
          not demos, prompts, or toy workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl p-8 border border-white/5">
          <h3 className="text-white text-xl font-bold mb-3">
            Production-Grade Agentic APIs
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Participants work with curated real-time APIs for building,
            orchestrating, and monitoring agentic systems in live environments.
            This includes tool execution, state management, memory layers,
            and event-driven coordination—beyond simple prompt chains.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/5">
          <h3 className="text-white text-xl font-bold mb-3">
            Led by Senior Practitioners
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Masterstroke is led by senior engineers and architects with
            20+ years of experience building and deploying large-scale systems
            across enterprise environments. This is practitioner-led training,
            not theory-driven instruction.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/5">
          <h3 className="text-white text-xl font-bold mb-3">
            Agent Marketplace Access
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Participants can publish production-ready AI agents to the
            Masterstroke marketplace. Promising systems are reviewed,
            packaged, and made available for commercial use—creating
            real-world validation and monetization opportunities.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8 border border-white/5">
          <h3 className="text-white text-xl font-bold mb-3">
            Promotion for High-Impact Builds
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Exceptional agentic applications are actively promoted through
            the Agentic AI Integrators network. Strong builds are surfaced
            to enterprises, partners, and early adopters seeking
            production-ready agentic solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyMasterstroke;
