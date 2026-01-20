import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100">
      <main className="pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-bold font-display mb-4">
              Refund Policy
            </h1>
            <p className="text-slate-400 text-sm">Last Updated: October 2024</p>

            <p className="mt-8 text-slate-300 leading-relaxed">
              This Refund Policy applies to all enrollments in the{" "}
              <span className="text-white font-bold">
                Masterstroke Agentic AI Systems &amp; Automation Engineering Program
              </span>.
            </p>
          </div>

          <div className="border-b border-white/10 my-12" />

          {/* 01 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">01.</span>
              Our Position on Refunds
            </h2>

            <div className="text-slate-400 leading-relaxed space-y-4">
              <p>
                Masterstroke Agentic AI is a high-intensity, professional training
                program designed for serious career transition and skill
                acquisition. Due to the nature of digital delivery, live
                sessions, proprietary materials, and limited cohort capacity,
                refunds are governed by strict but fair conditions.
              </p>
              <p>
                We encourage all participants to review the curriculum, program
                structure, and prerequisites carefully before enrolling.
              </p>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 02 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">02.</span>
              Refund Eligibility
            </h2>

            <div className="text-slate-400 leading-relaxed">
              <p className="mb-4">
                You are eligible for a refund under the following conditions:
              </p>

              <ul className="space-y-3 pl-4">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">
                    check_circle
                  </span>
                  <span>
                    Refund request submitted within{" "}
                    <span className="text-cyan-400 font-semibold">
                      7 calendar days
                    </span>{" "}
                    of enrollment.
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">
                    check_circle
                  </span>
                  <span>
                    Less than{" "}
                    <span className="text-cyan-400 font-semibold">10%</span> of
                    course content completed.
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">
                    check_circle
                  </span>
                  <span>
                    No access or download of restricted or premium materials.
                  </span>
                </li>

                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-primary text-sm mt-1">
                    check_circle
                  </span>
                  <span>
                    Attendance of no more than{" "}
                    <span className="text-cyan-400 font-semibold">
                      one live session
                    </span>.
                  </span>
                </li>
              </ul>

              <p className="mt-6 text-sm italic">
                Requests meeting all criteria will be processed after
                verification.
              </p>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 03 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">03.</span>
              Non-Refundable Scenarios
            </h2>

            <div className="text-slate-400 leading-relaxed">
              <ul className="space-y-3 pl-4">
                {[
                  "Requests after the 7-day window",
                  "Completion of more than 10% of the program",
                  "Access to premium or bonus materials",
                  "Attendance of multiple live sessions",
                  "Non-completion due to personal or professional reasons",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="material-symbols-outlined text-red-500/60 text-sm mt-1">
                      cancel
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 p-4 glass-card rounded-lg text-sm text-slate-300">
                Masterstroke Agentic AI is a skills-based training program, not a job
                placement service. Refunds based on job placement or salary
                outcomes are not permitted.
              </div>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 04 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">04.</span>
              Special Considerations
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Exceptional circumstances such as medical emergencies may be
              reviewed at management discretion. Documentation may be required.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 05 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">05.</span>
              Refund Processing
            </h2>

            <p className="text-slate-400">
              Approved refunds are processed within{" "}
              <span className="text-cyan-400 font-semibold">
                7–10 business days
              </span>{" "}
              to the original payment method.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 06 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">06.</span>
              How to Request a Refund
            </h2>

            <p className="text-slate-400">
              Email{" "}
              <span className="font-mono bg-white/5 px-2 py-1 rounded">
                "Refund Request - [Your Name]"
              </span>{" "}
              including:
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg max-w-md">
              <ul className="text-sm text-slate-300 space-y-1">
                <li>• Full name:</li>
                <li>• Registered email:</li>
                <li>• Enrollment date:</li>
                <li>• Reason for request:</li>
              </ul>
            </div>

            <p className="text-slate-400">
              Send to{" "}
              <a
                href="mailto:contact@agenticaiintegrators.com"
                className="text-primary font-bold hover:underline"
              >
                contact@agenticaiintegrators.com
              </a>
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 07 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">07.</span>
              Policy Updates
            </h2>

            <p className="text-slate-400">
              This policy may be updated at any time and becomes effective upon
              publication.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs italic">
              This policy balances learner fairness with the realities of
              delivering a premium cohort-based program.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RefundPolicy;
