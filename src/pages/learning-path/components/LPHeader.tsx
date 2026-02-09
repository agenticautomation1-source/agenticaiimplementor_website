export default function LPHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-[#050505]/80 backdrop-blur px-6 py-4">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-8 bg-cyan-400 text-black rounded flex items-center justify-center font-bold">
            A
          </div>
          <span className="text-sm font-bold uppercase tracking-widest">
            Architect Path
          </span>
        </div>
        <button className="text-xs uppercase border border-slate-700 px-6 py-2">
          Portal
        </button>
      </div>
    </header>
  );
}
