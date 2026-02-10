export default function LPProgramFlow() {
  const tracks = [
    {
      color: "cyan",
      line: "from-accent-cyan/60 to-transparent",
      diamond: "bg-accent-cyan",
      border: "border-accent-cyan/30",
      title: "Masterstroke · AI Systems Engineer",
      subtitle: "Autonomous Systems Architecture",
      meta: "Certification · Level 01 · Systemic",
      personas: [
        "Fresh Graduates",
        "Senior Professionals",
        "Retirees",
        "Career Switchers",
        "House-wives (Restarting)",
      ],
    },
    {
      color: "amber",
      line: "from-yellow-400/60 to-transparent",
      diamond: "bg-yellow-400",
      border: "border-yellow-400/30",
      title: "Masterstroke · GenAI Platform Architect",
      subtitle: "Large Scale LLM Operations",
      meta: "Certification · Level 02 · Architectural",
      personas: [
        "Experienced IT Engineers",
        "Mid-level Software Engineers",
      ],
    },
    {
      color: "rose",
      line: "from-rose-500/60 to-transparent",
      diamond: "bg-rose-500",
      border: "border-rose-500/30",
      title: "Masterstroke · AI Validation & Governance",
      subtitle: "Reliability & Safety Engineering",
      meta: "Certification · Level 01 · Governance",
      personas: [
        "QA Test Engineers",
        "Testing Professionals",
        "Software Testers",
      ],
    },
  ];

  return (
    <section className="px-6 lg:px-20 py-24 bg-charcoal/50">
      <div className="max-w-[1440px] mx-auto space-y-24">

        {/* HEADER */}
        <div>
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

        {/* TRACKS */}
        {tracks.map((track, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 lg:grid-cols-[420px_1fr_520px] items-center gap-10"
          >
            {/* LEFT — PERSONAS */}
            <div className="space-y-3">
              {track.personas.map((p) => (
                <div
                  key={p}
                  className="bg-background-dark border border-white/5 rounded-lg px-4 py-3 text-xs uppercase tracking-widest text-slate-400"
                >
                  {p}
                </div>
              ))}
            </div>

            {/* CENTER — CONNECTOR */}
            <div className="hidden lg:flex items-center relative">
              <div
                className={`h-px w-full bg-gradient-to-r ${track.line}`}
              />
              <div
                className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${track.diamond} shadow-lg`}
              />
            </div>

            {/* RIGHT — MASTERSTROKE */}
            <div
              class
