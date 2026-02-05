import React from "react";
import { Link } from "react-router-dom";

export default function Programs() {
  return (
    <main className="min-h-screen bg-[#050608] text-slate-200 px-6 py-24 font-display">
      <section className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-3">Programs</h1>
          <p className="text-slate-400 max-w-2xl">
            Deep, cohort-driven programs designed to build production-grade
            agentic AI systems.
          </p>
        </div>

        {/* PROGRAM CARDS */}
        <div className="space-y-8">
          {/* Agentic AI Systems Engineer */}
          <div className="rounded-2xl border border-cyan-400/30 bg-white/[0.02] p-8 flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                Agentic AI Systems Engineer
              </h3>
              <p className="text-slate-400 max-w-xl">
                Build and operate autonomous, tool-using AI systems with
                multi-agent orchestration and grounding.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/courses/agentic-ai-systems-engineer"
                className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-xs hover:brightness-110 transition"
              >
                View Program
              </Link>
            </div>
          </div>

          {/* GenAI Platform Architect */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                GenAI Platform Architect
              </h3>
              <p className="text-slate-400 max-w-xl">
                Architect scalable GenAI platforms with provider abstraction,
                reliability, and orchestration layers.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/courses/genai-platform-architect"
                className="px-6 py-3 border border-white/20 text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition"
              >
                View Program
              </Link>
            </div>
          </div>

          {/* AI Validation & Governance */}
          <div className="rounded-2xl border border-red-500/30 bg-white/[0.02] p-8 flex flex-col lg:flex-row justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-slate-300 mb-2">
                AI Validation & Governance Engineer
              </h3>
              <p className="text-slate-400 max-w-xl">
                Design evaluation, compliance, and red-teaming systems for safe
                and auditable AI deployments.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/courses/ai-validation-governance-engineer"
                className="px-6 py-3 border border-white/20 text-white rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition"
              >
                View Program
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
