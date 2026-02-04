import { useState } from "react";
import ProgramLayout from "./ProgramLayout";
import GoogleAuthGate from "../../components/GoogleAuthGate";

export default function AgenticAISystemsEngineer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ProgramLayout>
      {/* HERO */}
      <section className="mb-24">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Masterstroke – Agentic AI Systems Engineer
        </h1>
        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          Engineer autonomous AI systems that operate reliably in production,
          with real control over behavior, memory, orchestration, and failure
          modes.
        </p>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6">
          Who this program is for
        </h2>
        <ul className="space-y-4 text-slate-400 max-w-3xl">
          <li>Senior engineers transitioning into AI systems engineering</li>
          <li>Automation engineers moving beyond workflows</li>
          <li>Architects designing autonomous decision-making systems</li>
        </ul>
      </section>

      {/* PROBLEMS YOU WILL SOLVE */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6">
          Problems you will be trusted to solve
        </h2>
        <ul className="space-y-4 text-slate-400 max-w-3xl">
          <li>Why agent systems fail outside controlled demos</li>
          <li>How to design memory and planning that scales</li>
          <li>How to control cost, latency, and unintended actions</li>
          <li>How to observe, audit, and debug agent behavior</li>
        </ul>
      </section>

      {/* SYSTEMS */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6">
          Systems you will design
        </h2>
        <ul className="grid md:grid-cols-2 gap-6 text-slate-400">
          <li>Multi-agent orchestration architectures</li>
          <li>Short- and long-term memory systems</li>
          <li>Planning and decision loops</li>
          <li>Human-in-the-loop controls</li>
          <li>Failure handling and recovery strategies</li>
          <li>Observability for autonomous systems</li>
        </ul>
      </section>

      {/* PROGRAM ENROLLMENT (SSO GATED) */}
      <section className="mt-32 text-center">
        <h2 className="text-3xl font-bold mb-8">Program Enrollment</h2>

        {!isAuthenticated ? (
          <>
            <p className="text-slate-400 mb-6">
              Sign in to view pricing and download the syllabus.
            </p>

            <ul className="max-w-md mx-auto text-left space-y-3 text-slate-400 mb-8">
              <li>Core transition track + advanced LangGraph module</li>
              <li>Hands-on labs with production-style templates</li>
              <li>Enterprise agent system design patterns</li>
              <li>Certification of program completion</li>
            </ul>

            <GoogleAuthGate
              onSuccess={() => {
                setIsAuthenticated(true);
              }}
            />
          </>
        ) : (
          <div className="max-w-md mx-auto bg-white/5 border border-white/10 rounded-3xl p-12">
            <div className="text-primary uppercase tracking-widest text-xs font-bold mb-4">
              Price
            </div>

            <div className="text-5xl font-black mb-6">
              Sign in to see pricing
            </div>

            <a
              href="/lms/courses/masterstroke-agentic-ai-systems-engineer/"
              className="block w-full py-5 bg-primary text-black font-bold rounded-xl hover:brightness-110"
            >
              Enroll in Masterstroke
            </a>
          </div>
        )}
      </section>
    </ProgramLayout>
  );
}
