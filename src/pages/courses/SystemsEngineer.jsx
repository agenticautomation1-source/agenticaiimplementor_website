import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProgramEnrollment from "../../components/ProgramEnrollment";

export default function SystemsEngineer() {
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [session, setSession] = useState(null);
  
  useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    setSession(data.session);
  });
}, []);

  const storeLead = async (user) => {
    if (!user?.email) return;

    await supabase.from("leads").insert({
      email: user.email,
      provider: user.app_metadata?.provider || "email",
      program: "agentic-ai-systems-engineer",
    });
  };

  return (
    <main className="bg-[#050608] text-slate-200 font-display">

      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-[140px]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8">
            Masterstroke <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              Agentic AI Systems Engineer
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Transition from low-code automation into production-grade agentic AI
            systems designed for real enterprise environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <a
			  href="/courses/agentic-ai-systems-engineer"
			  className="px-10 py-4 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-sm hover:brightness-110"
			>
			  Secure Your Spot
			</a>

            <button
              onClick={() => {
                if (!session) {
                  alert("Please sign in to download the syllabus");
                  return;
                }
                window.open(
                  "/syllabus/masterstroke-agentic-ai-systems-engineer.pdf",
                  "_blank"
                );
              }}
              className="px-10 py-4 border border-white/15 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-white/5"
            >
              Download Syllabus
            </button>
          </div>
        </div>
      </section>

      {/* ================= TARGET AUDIENCE ================= */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Who This Program Is For
          </p>
          <h2 className="text-4xl font-bold text-white">
            Built for real-world transitions
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            ["school", "Fresh Graduates", "Move beyond basic tools into structured AI systems."],
            ["engineering", "Working Professionals", "Apply agentic logic to real operational workflows."],
            ["sync_alt", "Career Switchers", "Transition into AI systems and AI operations roles."],
          ].map(([icon, title, desc]) => (
            <div
              key={title}
              className="relative rounded-2xl border border-cyan-400/30 bg-white/[0.02] overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,220,246,0.22),transparent_65%)]" />

              <span className="absolute top-4 left-4 px-3 py-1 text-[10px] rounded-full bg-emerald-500/10 text-emerald-400 font-bold tracking-widest">
                INTERMEDIATE
              </span>

              <div className="relative p-10 text-center">
                <span className="material-symbols-outlined text-5xl text-[#00dcf6] mb-6">
                  {icon}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-slate-400 text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHAT YOU LEARN TO SOLVE ================= */}
      <section className="py-28 px-6 bg-[#0c0f14]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-4">
              What You Learn to Solve
            </p>
            <h2 className="text-4xl font-bold text-white mb-10">
              Practical agentic system challenges
            </h2>

            <div className="space-y-6">
              {[
                ["01", "Orchestration & Coordination"],
                ["02", "Stateful Execution"],
                ["03", "Governance & Safety"],
              ].map(([n, title]) => (
                <div
                  key={n}
                  className="relative p-6 rounded-2xl border border-cyan-400/30 bg-white/[0.02] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,220,246,0.22),transparent_65%)]" />
                  <div className="relative">
                    <span className="text-cyan-400 font-mono text-xl font-bold">
                      {n}
                    </span>
                    <h4 className="text-white font-bold mt-2">{title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 mt-[92px]">
            {[
              ["hub", "Hybrid Automation Architecture"],
              ["visibility", "Production-Aware Agent Design"],
            ].map(([icon, title]) => (
              <div
                key={title}
                className="relative p-8 rounded-2xl border border-cyan-400/30 bg-white/[0.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,220,246,0.22),transparent_65%)]" />
                <div className="relative text-center">
                  <span className="material-symbols-outlined text-4xl text-[#00dcf6] mb-3">
                    {icon}
                  </span>
                  <h3 className="font-bold text-white">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAM ENROLLMENT ================= */}
      <ProgramEnrollment programSlug="agentic-ai-systems-engineer" />

    </main>
  );
}
