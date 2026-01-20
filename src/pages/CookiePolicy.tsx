import React from "react";
import Navbar from "../components/Navbar";

const CookiePolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100">
      <Navbar isLoggedIn={false} onLogin={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          {/* ================= HEADER ================= */}
          <div className="mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-bold font-display mb-4">
              Cookie Policy
            </h1>

            <p className="text-slate-400 text-sm">
              Last Updated: October 2024
            </p>

            <p className="mt-8 text-slate-300 leading-relaxed">
              This Cookie Policy explains how{" "}
              <span className="text-white font-bold">
                Agentic AI Integrators – Masterstroke
              </span>{" "}
              uses cookies and similar technologies to ensure platform security,
              system reliability, and a high-quality learning experience.
            </p>
          </div>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 01 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">01.</span>
              What Are Cookies
            </h2>

            <p className="text-slate-400 leading-relaxed">
              Cookies are small text files stored on your device when you access
              a website. They allow systems to recognize your device, maintain
              secure sessions, and improve platform functionality.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 02 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">02.</span>
              Why We Use Cookies
            </h2>

            <ul className="space-y-3 pl-4 text-slate-400">
              <li>• Secure authentication and session management</li>
              <li>• Reliable navigation across the Masterstroke platform</li>
              <li>• Performance monitoring and system stability</li>
              <li>• Continuous improvement of curriculum delivery and UX</li>
            </ul>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 03 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">03.</span>
              Types of Cookies We Use
            </h2>

            <div className="space-y-4 text-slate-400">
              <p>
                <span className="text-white font-semibold">
                  Essential Cookies
                </span>{" "}
                – Required for core functionality such as login security,
                authorization, and protected access to training material.
              </p>

              <p>
                <span className="text-white font-semibold">
                  Analytics Cookies
                </span>{" "}
                – Help us understand usage patterns and platform performance so
                we can optimize reliability and learning outcomes.
              </p>

              <p>
                <span className="text-white font-semibold">
                  Preference Cookies
                </span>{" "}
                – Remember user preferences such as interface behavior and
                session continuity.
              </p>
            </div>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 04 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">04.</span>
              Third-Party Cookies
            </h2>

            <p className="text-slate-400 leading-relaxed">
              We may use limited third-party services such as analytics,
              infrastructure monitoring, or payment providers. These services
              may set their own cookies and are governed by their respective
              privacy policies.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 05 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">05.</span>
              Managing Cookies
            </h2>

            <p className="text-slate-400 leading-relaxed">
              You can control or disable cookies through your browser settings.
              Please note that disabling essential cookies may impact access to
              secure areas of the platform and reduce system reliability.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 06 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">06.</span>
              Updates to This Policy
            </h2>

            <p className="text-slate-400 leading-relaxed">
              This Cookie Policy may be updated periodically to reflect system
              changes, regulatory requirements, or improvements to our platform.
              Continued use of Masterstroke constitutes acceptance of the
              updated policy.
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs italic">
              Masterstroke is committed to transparency, security, and
              responsible system design across all user interactions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CookiePolicy;
