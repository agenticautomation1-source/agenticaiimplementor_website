export default function LPFooter() {
  return (
    <footer className="border-t border-slate-900 py-12 px-6 bg-[#050505]">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-xs uppercase tracking-widest">
        <span>© 2024 Elite Agentic AI</span>
        <div className="flex gap-6">
          <span>Security</span>
          <span>Compliance</span>
          <span>Research</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
}
