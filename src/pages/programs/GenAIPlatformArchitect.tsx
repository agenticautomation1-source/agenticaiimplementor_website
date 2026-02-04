import { useState } from "react";

export default function PlatformArchitect() {
  return (
    <main className="bg-obsidian text-slate-200 font-display">

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent blur-[120px]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            Masterstroke <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">
              GenAI Platform Architect
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Design secure, scalable, multi-tenant GenAI platforms for real enterprise environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-primary text-black font-bold uppercase tracking-widest text-sm">
              Secure Your Spot
            </button>
            <button className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-sm">
              Download Syllabus
            </button>
          </div>

        </div>
      </section>

      {/* TARGET AUDIENCE */}
      <section className="py-24 px-6 lg:px-20 bg-charcoal/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-4">
            Target Audience
          </h2>
          <h3 className="text-3xl font-bold text-white mb-16">
            Who this program is for
          </h3>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="premium-glow-cyan glass-card rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4">Senior Engineers</h4>
              <p className="text-slate-400 text-sm">
                Engineers transitioning from building GenAI features to architecting full enterprise platforms.
              </p>
            </div>

            <div className="premium-glow-red glass-card rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4">Cloud & Platform Architects</h4>
              <p className="text-slate-400 text-sm">
                Architects defining GenAI platform strategy with security, scalability, and isolation.
              </p>
            </div>

            <div className="premium-glow-amber glass-card rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-white mb-4">Tech Leads & Consultants</h4>
              <p className="text-slate-400 text-sm">
                Professionals designing long-term AI foundations across teams and organizations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-primary mb-4">
              Curriculum Focus
            </h2>
            <h3 className="text-4xl font-bold text-white">
              What You Learn to Solve
            </h3>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">

            <div className="space-y-6">
              <div className="premium-glow-cyan p-6 rounded-2xl border border-white/10">
                <h4 className="text-white font-bold mb-2">
                  Enterprise GenAI Architecture
                </h4>
                <p className="text-slate-400 text-sm">
                  Designing distributed, event-driven GenAI platforms beyond wrapper apps.
                </p>
              </div>

              <div className="premium-glow-red p-6 rounded-2xl border border-white/10">
                <h4 className="text-white font-bold mb-2">
                  Multi-Tenant Isolation & Security
                </h4>
                <p className="text-slate-400 text-sm">
                  IAM integration, data boundaries, and prompt injection mitigation.
                </p>
              </div>

              <div className="premium-glow-amber p-6 rounded-2xl border border-white/10">
                <h4 className="text-white font-bold mb-2">
                  Model Abstraction & Portability
                </h4>
                <p className="text-slate-400 text-sm">
                  Model-agnostic routing, fallbacks, and provider abstraction.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-card p-8 rounded-2xl text-center premium-glow-cyan">
                <h5 className="font-bold text-white">Cloud GenAI Providers</h5>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Infra Strategy</p>
              </div>
              <div className="glass-card p-8 rounded-2xl text-center premium-glow-cyan">
                <h5 className="font-bold text-white">Vector Data Lifecycle</h5>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Data Architecture</p>
              </div>
              <div className="glass-card p-8 rounded-2xl text-center premium-glow-cyan">
                <h5 className="font-bold text-white">Cost Governance & FinOps</h5>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Operations</p>
              </div>
              <div className="bg-primary/5 border border-primary/30 p-8 rounded-2xl text-center">
                <h5 className="font-bold text-white">And Much More</h5>
                <p className="text-primary text-xs uppercase tracking-widest">Full Syllabus</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PROGRAM ENROLLMENT */}
      {/* ⛔ KEEP YOUR EXISTING SSO / LEAD GEN BLOCK HERE UNCHANGED ⛔ */}

    </main>
  );
}
