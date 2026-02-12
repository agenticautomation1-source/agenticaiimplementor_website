import LPProgramFlow from "./components/LPProgramFlow";
export default function LearningPathPage() {
  return (
 <div className="dark bg-obsidian text-slate-100 font-display"> 
 {/*<div className="dark bg-obsidian text-slate-100 font-display min-h-screen"> */}
 
      {/* HEADER */}
 {/*      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-obsidian/80 backdrop-blur-md px-6 lg:px-20 py-4">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="size-8 bg-accent-cyan flex items-center justify-center rounded text-obsidian">
                <span className="material-symbols-outlined font-bold">
                  architecture
                </span>
              </div>
              <h2 className="text-xl font-bold tracking-tighter uppercase">
                Architect Path
              </h2>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              <span className="text-xs font-bold tracking-widest uppercase hover:text-accent-cyan transition-colors cursor-pointer">
                Roadmap
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-accent-cyan transition-colors cursor-pointer">
                Programs
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-slate-500 hover:text-accent-cyan transition-colors cursor-pointer">
                Certification
              </span>
            </nav>
          </div>

          <button className="text-xs font-bold tracking-widest uppercase border border-slate-700 px-6 py-2 hover:border-accent-cyan transition-colors">
            Portal
          </button>
        </div>
      </header>  */}

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-cyan/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-[1440px] mx-auto text-center relative z-10">
          <div className="inline-block px-3 py-1 border border-accent-cyan/30 rounded-full mb-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent-cyan font-bold">
              Specialized Engineering Excellence
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            The{" "}
            <span className="text-accent-cyan glow-text">
              Agentic Architect
            </span>
            <br />
            Learning Path
          </h1>

          <p className="text-slate-400 text-xl max-w-3xl mx-auto font-light leading-relaxed">
            Strategically mapped progressions for engineers transitioning into
            the era of autonomous systems. Choose your specialization and master
            the masterstroke.
          </p>
        </div>
      </section>

      {/* FOCUS TRACKS */}
      <section className="px-6 lg:px-20 py-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            {
              icon: "memory",
              title: "Systems Focus",
              steps: [
                ["Foundation", "Automation Engineer"],
                ["Specialization", "Agentic AI Systems Engineer", true],
                ["Mastery", "Multi-Agent Orchestrator"],
              ],
            },
            {
              icon: "account_tree",
              title: "Architect Focus",
              steps: [
                ["Foundation", "Senior Engineer"],
                ["Specialization", "GenAI Platform Architect", true],
                ["Mastery", "Enterprise AI Strategist"],
              ],
            },
            {
              icon: "verified_user",
              title: "Governance Focus",
              steps: [
                ["Foundation", "Security / ML Engineer"],
                ["Specialization", "AI Validation & Governance", true],
                ["Mastery", "Chief AI Trust Officer"],
              ],
            },
          ].map((col, i) => (
            <div
              key={i}
              className="bg-charcoal p-8 rounded-xl border border-slate-800 hover:border-accent-cyan/40 transition-all group"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-accent-cyan">
                  {col.icon}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-widest">
                  {col.title}
                </h3>
              </div>

              <div className="space-y-12 relative">
                <div className="absolute left-4 top-2 bottom-2 w-px bg-slate-800 group-hover:bg-accent-cyan/20 transition-colors"></div>

                {col.steps.map(([label, text, active], j) => (
                  <div key={j} className="relative pl-12">
                    <div
                      className={`absolute left-2.5 top-1 size-3 rounded-full ${
                        active
                          ? "bg-accent-cyan glow-border"
                          : "bg-slate-700 border-2 border-charcoal"
                      }`}
                    ></div>
                    <p
                      className={`text-xs font-bold mb-1 uppercase ${
                        active ? "text-accent-cyan" : "text-slate-500"
                      }`}
                    >
                      {label}
                    </p>
                    <h4 className="text-lg font-bold">{text}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MASTERSTROKE PROGRAM FLOW (MISSING MIDDLE SECTION) */}
      <LPProgramFlow />
	  
      {/* CTA */}
      <section className="px-6 lg:px-20 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-charcoal to-obsidian border border-slate-800 p-12 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-accent-cyan opacity-[0.02]"></div>

          <h2 className="text-4xl font-bold mb-6">
            Define Your Future With AI.
          </h2>

          <p className="text-slate-400 mb-10 text-lg">
            Download the complete technical curriculum or begin your
            certification journey today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent-cyan text-obsidian px-10 py-4 font-bold uppercase tracking-widest text-sm hover:brightness-110 transition-all rounded">
              Start Your Journey
            </button>
            <button className="border border-slate-700 px-10 py-4 font-bold uppercase tracking-widest text-sm hover:border-accent-cyan transition-all rounded">
              Download Career Roadmap PDF
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
