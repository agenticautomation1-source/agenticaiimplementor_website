import { useEffect } from "react";
import ProgramEnrollment from "../../components/ProgramEnrollment";
import { supabase } from "../../lib/supabaseClient";

export default function AIValidationGovernanceEngineer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-[#050608] text-slate-200 font-display">

      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-red-600/10 to-transparent blur-[160px]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">

          <span className="inline-block mb-6 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest
                           border border-red-500/30 text-red-400 bg-red-500/5">
            Enrollment Open
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            Masterstroke – AI Validation &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">
              Governance Engineer
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Build AI systems that are safe, auditable, compliant, and trusted
            in enterprise environments.
          </p>

          <button
            className="mt-6 px-10 py-4 border border-white/15 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white/5"
          >
            Download Syllabus
          </button>

        </div>
      </section>

      {/* ================= WHO THIS PROGRAM IS FOR ================= */}
      <section className="py-28 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <p className="text-red-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 text-center">
            Who This Program Is For
          </p>
          <h2 className="text-4xl font-bold text-white text-center mb-20">
            For engineers who control AI risk
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {/* Card 1 */}
            <div className="relative rounded-2xl border border-red-500/30 bg-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,0,0.28),transparent_65%)]" />
              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest
                               px-3 py-1 rounded border border-red-500/40 text-red-400 bg-red-500/10">
                Advanced
              </span>
              <div className="relative p-10 text-center">
                <span className="material-symbols-outlined text-5xl text-red-500 mb-6">
                  shield_lock
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  AI Risk & Compliance Teams
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• Governance frameworks</li>
                  <li>• Risk assessment protocols</li>
                  <li>• Regulatory readiness</li>
                </ul>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative rounded-2xl border border-red-500/30 bg-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,0,0.28),transparent_65%)]" />
              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest
                               px-3 py-1 rounded border border-red-500/40 text-red-400 bg-red-500/10">
                Advanced
              </span>
              <div className="relative p-10 text-center">
                <span className="material-symbols-outlined text-5xl text-red-500 mb-6">
                  task_alt
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  AI & ML Engineers
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• Hardened production systems</li>
                  <li>• Automated audit pipelines</li>
                  <li>• Adversarial testing</li>
                </ul>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative rounded-2xl border border-red-500/30 bg-white/[0.02] overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,0,0.28),transparent_65%)]" />
              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest
                               px-3 py-1 rounded border border-red-500/40 text-red-400 bg-red-500/10">
                Advanced
              </span>
              <div className="relative p-10 text-center">
                <span className="material-symbols-outlined text-5xl text-red-500 mb-6">
                  gavel
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  Enterprise & Policy Leaders
                </h3>
                <ul className="text-sm text-slate-400 space-y-2">
                  <li>• Safety guardrails</li>
                  <li>• Strategic approval flows</li>
                  <li>• Ethics board integration</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHAT YOU LEARN TO SOLVE ================= */}
      <section className="py-28 px-6 lg:px-20 bg-[#0c0f14]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-start">

          <div>
            <p className="text-red-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              Curriculum Goals
            </p>
            <h2 className="text-4xl font-bold text-white mb-12">
              What You Learn to Solve
            </h2>

            <div className="space-y-6">
              {[
                ["01", "Model Validation & Testing", "Rigorous evaluation benchmarks for LLMs and agent systems."],
                ["02", "Explainability & Auditability", "Decision traceability and legally defensible AI behavior."],
                ["03", "Human-in-the-loop Governance", "Controlled intervention points for high-risk autonomy."],
              ].map(([n, title, desc]) => (
                <div
                  key={n}
                  className="relative p-6 rounded-2xl border border-red-500/30 bg-white/[0.02] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,0,0.25),transparent_65%)]" />
                  <div className="relative">
                    <span className="text-red-400 font-mono text-xl font-bold">{n}</span>
                    <h4 className="text-white font-bold mt-2">{title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              ["policy", "Regulatory Readiness"],
              ["warning", "Risk Management"],
              ["shield", "Production Governance"],
              ["auto_graph", "12+ Industry Case Studies"],
            ].map(([icon, label]) => (
              <div
                key={label}
                className="relative p-8 rounded-2xl border border-red-500/30 bg-white/[0.02] text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,0,0.25),transparent_65%)]" />
                <div className="relative">
                  <span className="material-symbols-outlined text-4xl text-red-500 mb-4">
                    {icon}
                  </span>
                  <h5 className="text-white font-bold">{label}</h5>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= PROGRAM ENROLLMENT (BOTTOM) ================= */}
      <ProgramEnrollment programSlug="ai-validation-governance-engineer" />

    </main>
  );
}
