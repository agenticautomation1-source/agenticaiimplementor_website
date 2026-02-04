import React from "react";
import { Link } from "react-router-dom";

const Features: React.FC = () => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-24">
      {/* SECTION HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-white text-3xl md:text-4xl font-bold font-display">
          Featured Masterstroke Programs
        </h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Role-focused, production-grade AI programs designed for engineers,
          architects, and governance professionals transitioning into high-impact
          AI roles.
        </p>
      </div>

      {/* PROGRAM CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* PROGRAM 1 */}
        <div className="glass-card p-8 rounded-xl group relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>

          <h3 className="text-white text-xl font-bold mb-3 font-display">
            MASTERSTROKE – Agentic AI Systems Engineer
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Build and harden production-grade agentic AI systems using hybrid
            architectures, orchestration, memory, and governance patterns.
          </p>

          <div className="mt-auto">
            <Link
              to="/courses/agentic-ai-systems-engineer"
              className="inline-flex items-center justify-center w-full h-11 rounded-lg bg-primary text-black font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.55)] active:scale-[0.97]"
            >
              View Program
            </Link>
          </div>
        </div>

        {/* PROGRAM 2 */}
        <div className="glass-card p-8 rounded-xl group relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>

          <h3 className="text-white text-xl font-bold mb-3 font-display">
            MASTERSTROKE – GenAI Platform Architect
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Design enterprise-grade GenAI platforms with focus on scale,
            multi-tenancy, cost governance, security, and deployment patterns.
          </p>

          <div className="mt-auto">
            <Link
              to="/courses/genai-platform-architect"
              className="inline-flex items-center justify-center w-full h-11 rounded-lg bg-primary text-black font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.55)] active:scale-[0.97]"
            >
              View Program
            </Link>
          </div>
        </div>

        {/* PROGRAM 3 */}
        <div className="glass-card p-8 rounded-xl group relative overflow-hidden flex flex-col">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -mr-12 -mt-12 group-hover:bg-primary/10 transition-colors"></div>

          <h3 className="text-white text-xl font-bold mb-3 font-display">
            MASTERSTROKE – AI Validation &amp; Governance Engineer
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Validate, audit, and govern production AI systems with hands-on
            testing, compliance alignment, monitoring, and human-in-the-loop
            workflows.
          </p>

          <div className="mt-auto">
            <Link
              to="/courses/ai-validation-governance-engineer"
              className="inline-flex items-center justify-center w-full h-11 rounded-lg bg-primary text-black font-bold text-xs uppercase tracking-widest transition-all hover:brightness-110 hover:shadow-[0_0_25px_rgba(59,130,246,0.55)] active:scale-[0.97]"
            >
              View Program
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
