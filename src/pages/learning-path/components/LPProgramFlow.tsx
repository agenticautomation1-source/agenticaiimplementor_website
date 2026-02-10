export default function LPProgramFlow() {
  return (
    <section className="px-6 lg:px-20 py-24 bg-charcoal/50">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-accent-cyan font-bold mb-2">
            Ecosystem Architecture
          </p>
          <h2 className="text-4xl font-bold mb-4">
            Masterstroke Program Flow
          </h2>
          <p className="text-slate-500 max-w-2xl">
            A technical visualization of foundational engineering tracks feeding
            into specialized mastery paths.
          </p>
        </div>

        {/* Flow container */}
        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-8 items-center">

          {/* LEFT — Personas */}
          <div className="space-y-4">
            {[
              "Fresh Graduates",
              "Senior Professionals",
              "Career Switchers",
              "House-wives (Restarting)",
              "Experienced IT Engineers",
              "Mid-level Software Engineers",
              "QA Test Engineers",
              "Testing Professionals",
              "Software Testers",
            ].map((label) => (
              <div
                key={label}
                className="bg-background-dark border border-white/5 rounded-lg px-4 py-3 text-xs uppercase tracking-widest text-slate-400"
              >
                {label}
              </div>
            ))}
          </div>

          {/* CENTER — Connector */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-24">
            <span className="w-2 h-2 bg-accent-cyan rounded-full glow-accent" />
            <span className="w-2 h-2 bg-yellow-400 rounded-full" />
            <span className="w-2 h-2 bg-rose-500 rounded-full" />
          </div>

          {/* RIGHT — Masterstroke Cards */}
          <div className="space-y-8">
            <div className="p-8 rounded-xl border border-accent-cyan/30 bg-slate-panel">
              <p className="text-xs uppercase tracking-widest text-accent-cyan mb-2">
                Masterstroke · AI Systems Engineer
              </p>
              <h3 className="text-xl font-bold mb-1">
                Autonomous Systems Architecture
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Certification · Level 01 · Systemic
              </p>
            </div>

            <div className="p-8 rounded-xl border border-yellow-400/30 bg-slate-panel">
              <p className="text-xs uppercase tracking-widest text-yellow-400 mb-2">
                Masterstroke · GenAI Platform Architect
              </p>
              <h3 className="text-xl font-bold mb-1">
                Large Scale LLM Operations
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Certification · Level 02 · Architectural
              </p>
            </div>

            <div className="p-8 rounded-xl border border-rose-500/30 bg-slate-panel">
              <p className="text-xs uppercase tracking-widest text-rose-500 mb-2">
                Masterstroke · AI Validation & Governance
              </p>
              <h3 className="text-xl font-bold mb-1">
                Reliability & Safety Engineering
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Certification · Level 01 · Governance
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
