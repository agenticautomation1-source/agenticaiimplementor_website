type Track = {
  title: string;
  subtitle: string;
  meta: string;
  personas: string[];
  lineClass: string;
  diamondClass: string;
  borderClass: string;
  titleClass: string;
};

export default function LPProgramFlow() {
  const tracks: Track[] = [
    {
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
      lineClass: "from-accent-cyan/60 to-transparent",
      diamondClass: "bg-accent-cyan",
      borderClass: "border-accent-cyan/30",
      titleClass: "text-accent-cyan",
    },
    {
      title: "Masterstroke · GenAI Platform Architect",
      subtitle: "Large Scale LLM Operations",
      meta: "Certification · Level 02 · Architectural",
      personas: [
        "Experienced IT Engineers",
        "Mid-level Software Engineers",
      ],
      lineClass: "from-yellow-400/70 via-yellow-400/40 to-transparent",
diamondClass: "bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)]",
borderClass: "border-yellow-400/40",
titleClass: "text-yellow-400",
    },
    {
      title: "Masterstroke · AI Validation & Governance",
      subtitle: "Reliability & Safety Engineering",
      meta: "Certification · Level 01 · Governance",
      personas: [
        "QA Test Engineers",
        "Testing Professionals",
        "Software Testers",
      ],
      lineClass: "from-rose-500/60 to-transparent",
      diamondClass: "bg-rose-500",
      borderClass: "border-rose-500/30",
      titleClass: "text-rose-500",
    },
  ];

  return (
    <section className="px-6 lg:px-20 py-24 bg-charcoal/50">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-24">

        {/* HEADER */}
<div>
  <p className="text-xs uppercase tracking-widest text-accent-cyan font-bold mb-2">
    Who This Is For
  </p>
  <h2 className="text-4xl font-bold mb-4">
    Professional Entry Pathways into the Masterstroke
  </h2>
  <p className="text-slate-500 max-w-2xl">
    See how different professional backgrounds map to each Masterstroke
    specialization based on experience and career stage.
  </p>
</div>

        {/* TRACK GROUPS */}
        {tracks.map((track, idx) => (
         <div
  key={idx}
  className="grid grid-cols-1 lg:grid-cols-[420px_1fr_520px] items-center gap-10 min-h-[180px]"
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
<div className="hidden lg:flex items-center justify-center relative">
  <div className={`h-px w-full bg-gradient-to-r ${track.lineClass}`} />
  <div
    className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 ${track.diamondClass} shadow-lg`}
  />
</div>
            {/* RIGHT — MASTERSTROKE CARD */}
<div
  className={`h-[132px] flex flex-col justify-center p-6 rounded-xl bg-slate-panel border ${track.borderClass}`}
>         
              <p
                className={`text-xs uppercase tracking-widest mb-2 ${track.titleClass}`}
              >
                {track.title}
              </p>
              <h3 className="text-2xl font-bold mb-1">
                {track.subtitle}
              </h3>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                {track.meta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
