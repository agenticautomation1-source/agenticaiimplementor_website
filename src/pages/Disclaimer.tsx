import React from "react";

const Disclaimer: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100">
      <main className="pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-bold font-display mb-4">
              Disclaimer
            </h1>
            <p className="text-slate-400 text-sm">Last Updated: October 2024</p>

            <p className="mt-8 text-slate-300 leading-relaxed">
              The information provided on{" "}
              <span className="text-white font-bold">Masterstroke Agentic AI</span> is
              for general educational and informational purposes only. By
              accessing this platform, you acknowledge and agree to the
              following terms.
            </p>
          </div>

          <div className="border-b border-white/10 my-12" />

          {/* 01 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">01.</span>
              Educational Purpose Only
            </h2>

            <div className="text-slate-400 leading-relaxed space-y-4">
              <p>
                All courses, programs, tutorials, and learning materials offered
                are intended solely for{" "}
                <span className="text-white font-semibold">
                  Educational Purposes
                </span>
                . They are not a substitute for professional, legal, financial,
                or business advice.
              </p>
              <p>
                You should consult appropriate professionals before making
                decisions based on the information provided through our
                platform.
              </p>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 02 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">02.</span>
              No Career or Employment Guarantees
            </h2>

            <div className="text-slate-400 leading-relaxed">
              <p className="mb-4">Masterstroke Agentic AI does not guarantee:</p>

              <ul className="space-y-3 pl-4">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-cyan-400 text-sm mt-1">
                    fiber_manual_record
                  </span>
                  <span>Employment or job placement.</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-cyan-400 text-sm mt-1">
                    fiber_manual_record
                  </span>
                  <span>Career advancement or specific salary increases.</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-cyan-400 text-sm mt-1">
                    fiber_manual_record
                  </span>
                  <span>
                    Business success or predetermined financial outcomes.
                  </span>
                </li>
              </ul>

              <p className="mt-6 text-sm italic">
                Any career or professional outcomes depend on individual effort,
                experience, skills, and market conditions.
              </p>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 03 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">03.</span>
              Accuracy of Information
            </h2>

            <div className="text-slate-400 leading-relaxed">
              <p className="mb-4">
                While we strive for accuracy, the field of artificial
                intelligence and automation evolves rapidly. As a result:
              </p>

              <ul className="space-y-3 pl-4">
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-cyan-400 text-sm mt-1">
                    error_outline
                  </span>
                  <span>Content may become outdated over time.</span>
                </li>
                <li className="flex gap-3">
                  <span className="material-symbols-outlined text-cyan-400 text-sm mt-1">
                    error_outline
                  </span>
                  <span>
                    Tools, APIs, and platforms referenced may change or be
                    discontinued.
                  </span>
                </li>
              </ul>

              <div className="mt-6 p-4 glass-card rounded-lg text-sm text-slate-300">
                We are not responsible for errors, omissions, or outcomes
                resulting from the use of this information.
              </div>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 04 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">04.</span>
              Use of Third-Party Tools
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Our courses involve third-party software, platforms, APIs, or
              services. Masterstroke Agentic AI does not own or control these services
              and is not responsible for their availability, functionality, or
              pricing changes. Use of these tools is subject to their respective
              terms and policies.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 05 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">05.</span>
              No Professional Liability
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Masterstroke Agentic AI shall not be held liable for any direct or indirect
              loss, damage, or consequences arising from the use or misuse of
              course content or implementation of techniques taught. You assume
              full responsibility for how you apply the knowledge gained.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 06 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">06.</span>
              Technology and AI Risks
            </h2>

            <p className="text-slate-400 mb-4">
              Artificial Intelligence systems and automation workflows carry
              inherent risks, including but not limited to:
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-lg max-w-md">
              <ul className="text-sm text-slate-300 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400 text-xs">
                    priority_high
                  </span>
                  System errors or failures
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400 text-xs">
                    priority_high
                  </span>
                  Bias or unintended behavior
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400 text-xs">
                    priority_high
                  </span>
                  Security and compliance concerns
                </li>
              </ul>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 07 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">07.</span>
              External Links Disclaimer
            </h2>

            <p className="text-slate-400 leading-relaxed">
              This website may contain links to external websites for
              convenience. We do not endorse, guarantee, or assume
              responsibility for the accuracy or reliability of information on
              external sites.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 08 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">08.</span>
              Testimonials and Examples
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Testimonials, case studies, and examples used on this site are for
              illustrative purposes only. They do not represent a guarantee
              that you will achieve the same or similar results.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 09 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">09.</span>
              Intellectual Property
            </h2>

            <p className="text-slate-400 leading-relaxed">
              All materials provided through our training platform are protected
              by copyright. Unauthorized distribution, sharing, or resale of
              course content is strictly prohibited and may result in legal
              action.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* 10 */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">10.</span>
              Contact for Clarification
            </h2>

            <p className="text-slate-400">
              If you have any questions regarding this Disclaimer or how it
              applies to your enrollment, please contact our legal team at{" "}
              <a
                href="mailto:contact@agenticaiintegrators.com"
                className="text-cyan-400 font-bold hover:underline"
              >
                contact@agenticaiintegrators.com
              </a>
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs italic">
              By continuing to use this platform, you acknowledge that you have
              read and understood this disclaimer.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Disclaimer;
