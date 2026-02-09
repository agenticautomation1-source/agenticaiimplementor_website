export default function LPHero() {
  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-cyan-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto text-center relative z-10">
        <div className="inline-block px-3 py-1 border border-cyan-400/30 rounded-full mb-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-cyan-400 font-bold">
            Specialized Engineering Excellence
          </span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-bold mb-8">
          The <span className="text-cyan-400 glow-text">Agentic Architect</span>
          <br />
          Learning Path
        </h1>

        <p className="text-slate-400 text-xl max-w-3xl mx-auto">
          Strategically mapped progressions for engineers transitioning into
          autonomous systems.
        </p>
      </div>
    </section>
  );
}
