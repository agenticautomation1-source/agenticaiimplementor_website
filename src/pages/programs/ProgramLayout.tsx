// src/pages/programs/ProgramLayout.tsx
import { ReactNode } from "react";

export default function ProgramLayout({ children }: { children: ReactNode }) {
  return (
    <main className="pt-32 pb-24 bg-black text-white">
      <div className="max-w-[1200px] mx-auto px-6">
        {children}
      </div>
    </main>
  );
}
