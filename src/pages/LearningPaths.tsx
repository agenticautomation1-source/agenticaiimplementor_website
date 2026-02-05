import React from "react";

export default function LearningPaths() {
  return (
    <main className="min-h-screen bg-[#050608] text-slate-200 px-6 py-24 font-display">
      <section className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-bold text-white mb-3">
            Learning Paths
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Structured journeys that guide you from fundamentals to advanced,
            production-grade agentic systems.
          </p>
        </div>

        {/* PATHS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Builder Path */}
          <div className="rounded-2xl border border-cyan-400/30 bg-white/[0.02] p-8">
            <h3 className="text-xl font-bold text-white mb-3">
              Agentic AI Builder Path
            </h3>
            <p className="text-slate-400 mb-6">
              Ideal for engineers who want to build and deploy autonomous AI
              systems from scratch.
            </p>

            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Foundations of Agentic Systems</li>
              <li>• Tool-Using Agents</li>
              <li>• Multi-Agent Coordination</li>
              <li>• Production Deployment</li>
            </ul>
          </div>

          {/* Architect Path */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <h3 className="text-xl font-bold text-white mb-3">
              GenAI Architect Path
            </h3>
            <p className="text-slate-400 mb-6">
              For senior engineers designing scalable, reliable AI platforms.
            </p>

            <ul className="space-y-2 text-sm text-slate-400">
              <li>• Platform Architecture</li>
              <li>• Provider Abstraction</li>
              <li>• Reliability & Observability</li>
              <li>• Enterprise Governance</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
