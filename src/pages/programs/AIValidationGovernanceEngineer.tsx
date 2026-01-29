import ProgramLayout from "./ProgramLayout";

export default function AgenticAISystemsEngineer() {
  return (
    <ProgramLayout>

      {/* HERO */}
      <section className="mb-28">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Masterstroke – Agentic AI Systems Engineer
        </h1>

        <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
          This program trains you to engineer autonomous AI systems that operate
          reliably in production — with real control over behavior, cost,
          failure modes, and governance.
        </p>

        <p className="mt-6 text-slate-500 max-w-3xl">
          This is not an agent demo course. It is a systems-engineering program
          for people who will be accountable when AI systems act.
        </p>
      </section>

      {/* WHO HIRES THIS ROLE */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6">
          Who hires an Agentic AI Systems Engineer
        </h2>

        <p className="text-slate-400 max-w-3xl leading-relaxed mb-8">
          This role exists where automation has crossed into autonomy and
          reliability becomes a business requirement.
        </p>

        <ul className="grid md:grid-cols-2 gap-6 text-slate-400">
          <li>AI platform and infrastructure teams</li>
          <li>Product companies building autonomous AI features</li>
          <li>Enterprises deploying internal AI agents and copilots</li>
          <li>Systems integrators delivering agentic AI solutions</li>
        </ul>
      </section>

      {/* PROBLEMS YOU WILL BE TRUSTED TO SOLVE */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6">
          Problems you will be trusted to solve
        </h2>

        <p className="text-slate-400 max-w-3xl leading-relaxed mb-10">
          After this program, you are expected to handle decisions most teams
          avoid until something breaks.
        </p>

        <ul className="space-y-4 text-slate-400 max-w-3xl">
          <li>Why do agent systems behave correctly in demos but fail in production?</li>
          <li>How do we design memory, planning, and orchestration that scales?</li>
          <li>How do we control cost, latency, and runaway behavior?</li>
          <li>Who is accountable when an autonomous system makes a wrong decision?</li>
          <li>How do we observe, audit, and debug agent behavior over time?</li>
        </ul>

        <p className="mt-8 text-slate-500 max-w-3xl">
          These are systems problems. This program teaches you how to think about
          them before they become incidents.
        </p>
      </section>

      {/* SYSTEMS YOU WILL DESIGN */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6">
          Systems you will design and reason about
        </h2>

        <p className="text-slate-400 max-w-3xl leading-relaxed mb-10">
          The focus is not on tools. It is on architecture, control, and failure
          handling.
        </p>

        <ul className="grid md:grid-cols-2 gap-6 text-slate-400">
          <li>Multi-agent orchestration architectures</li>
          <li>Memory systems (short-term, long-term, externalized)</li>
          <li>Planning and decision-making loops</li>
          <li>Human-in-the-loop control mechanisms</li>
          <li>Failure handling, rollback, and recovery strategies</li>
          <li>Observability and traceability for autonomous behavior</li>
        </ul>
      </section>

      {/* HOW THIS PROGRAM IS DIFFERENT */}
      <section className="mb-24">
        <h2 className="text-2xl font-semibold mb-6">
          How this program is different
        </h2>

        <div className="max-w-3xl space-y-6 text-slate-400">
          <p>
            Most agentic AI programs focus on libraries, frameworks, and demos.
            They stop where responsibility begins.
          </p>

          <p>
            This program treats agents as production software systems — subject
            to the same expectations as any critical infrastructure.
          </p>

          <p className="text-slate-300 font-medium">
            You are trained to make architectural decisions, not follow recipes.
          </p>
        </div>
      </section>

      {/* WHAT CHANGES AFTER COMPLETION */}
      <section className="mb-28">
        <h2 className="text-2xl font-semibold mb-6">
          What changes after completion
        </h2>

        <ul className="space-y-4 text-slate-400 max-w-3xl">
          <li>Design agentic systems that survive real-world complexity</li>
          <li>Communicate clearly with architects, platform teams, and leadership</li>
          <li>Own autonomous systems without hiding behind tools</li>
          <li>Position yourself for senior AI engineering and architecture roles</li>
        </ul>

        <p className="mt-8 text-slate-500 max-w-3xl">
          This is a role upgrade, not a skills checklist.
        </p>
      </section>

      {/* CTA */}
      <section className="text-center mt-32">
        <a
          href="https://agenticaiimplementors.com/lms/courses/masterstroke-agentic-ai-systems-engineer/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-5 rounded-xl bg-primary text-black font-bold uppercase tracking-wide hover:brightness-110 transition"
        >
          Enroll in Masterstroke – Agentic AI Systems Engineer
        </a>

        <p className="mt-6 text-slate-500">
          For engineers building autonomous systems that must work in production.
        </p>
      </section>

    </ProgramLayout>
  );
}
