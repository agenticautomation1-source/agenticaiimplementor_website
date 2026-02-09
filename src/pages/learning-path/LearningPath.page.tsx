import "./learning-path.css";

import LPHeader from "./components/LPHeader";
import LPHero from "./components/LPHero";
import LPFocusGrid from "./components/LPFocusGrid";
import LPProgramFlow from "./components/LPProgramFlow";
import LPEntryPoints from "./components/LPEntryPoints";
import LPCTA from "./components/LPCTA";
import LPFooter from "./components/LPFooter";

export default function LearningPathPage() {
  return (
    <div data-learning-path className="min-h-screen bg-[#050505] text-slate-100">
      <LPHeader />
      <LPHero />
      <LPFocusGrid />
      <LPProgramFlow />
      <LPEntryPoints />
      <LPCTA />
      <LPFooter />
    </div>
  );
}
