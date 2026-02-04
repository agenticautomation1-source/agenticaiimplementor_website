import React from "react";
import Navbar from "../components/Navbar";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-dark text-slate-100">
      {/* ================= NAVBAR ================= */}
      <Navbar isLoggedIn={false} onLogin={() => {}} />

      {/* ================= CONTENT ================= */}
      <main className="pt-32 pb-24">
        <div className="max-w-[800px] mx-auto px-6">
          {/* ================= HEADER ================= */}
          <div className="mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-bold font-display mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-slate-400 text-sm">Last Updated: October 2024</p>

            <p className="mt-8 text-slate-300 leading-relaxed">
              Welcome to{" "}
              <span className="text-white font-bold">Masterstroke</span>. These
              Terms and Conditions govern your access to and use of our platform,
              training programs, content, and services. By enrolling or using
              the platform, you agree to be bound by these terms in full.
            </p>
          </div>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 01 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">01.</span> Acceptance of
              Terms
            </h2>
            <p className="text-slate-400 leading-relaxed">
              By accessing or using the Masterstroke platform, you confirm that
              you have read, understood, and agreed to these Terms & Conditions.
              If you do not agree, you must immediately discontinue use of the
              platform and its services.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 02 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">02.</span> Eligibility &
              Age Requirement
            </h2>
            <p className="text-slate-400 leading-relaxed">
              You must be at least{" "}
              <span className="text-cyan-400 font-semibold">18 years old</span>{" "}
              to enroll in any Masterstroke program. By enrolling, you represent
              and warrant that you meet this requirement.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 03 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">03.</span> Account
              Registration
            </h2>
            <p className="text-slate-400 leading-relaxed">
              You agree to provide accurate, current, and complete information
              during registration. You are solely responsible for maintaining
              the confidentiality of your account credentials and for all
              activities conducted under your account.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 04 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">04.</span> Pricing &
              Payments
            </h2>
            <p className="text-slate-400 leading-relaxed">
              All program fees are displayed at checkout and processed in{" "}
              <span className="text-cyan-400 font-semibold">INR</span> unless
              stated otherwise. Prices are subject to change without prior
              notice.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 05 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">05.</span> Intellectual
              Property
            </h2>
            <p className="text-slate-400 leading-relaxed">
              All content, including videos, curriculum, frameworks, source
              code, documentation, and design elements are the exclusive
              intellectual property of Masterstroke. Access is granted strictly
              for personal educational use.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 06 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">06.</span> User Conduct
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Any misuse of the platform, harassment, redistribution of content,
              reverse engineering, or unethical behavior may result in immediate
              termination of access without refund.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 07 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">07.</span> Course Access &
              Duration
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Course access duration is defined at the time of purchase.
              Lifetime access, where offered, is subject to continued platform
              availability.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 08 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">08.</span> Refund Policy
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Refunds are governed strictly by our Refund Policy. Due to the
              digital and cohort-based nature of Masterstroke, refunds are
              limited and conditional.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 09 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">09.</span> Limitation of
              Liability
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Masterstroke shall not be liable for any indirect, incidental,
              consequential, or economic damages arising from use of the
              platform or training outcomes.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 10 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">10.</span> Third-Party
              Services
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Some programs require third-party tools or APIs. You are
              responsible for complying with their respective terms and any
              associated costs.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 11 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">11.</span> Modification of
              Services
            </h2>
            <p className="text-slate-400 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of
              the platform or curriculum with reasonable notice.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 12 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">12.</span> Privacy Policy
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Your use of the platform is also governed by our Privacy Policy.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 13 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">13.</span> Account
              Termination
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Accounts may be terminated without notice for violations of these
              Terms & Conditions.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 14 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">14.</span> Governing Law
            </h2>
            <p className="text-slate-400 leading-relaxed">
              These Terms are governed by the laws of India. Jurisdiction lies
              exclusively with Indian courts.
            </p>
          </section>

          <div className="border-b border-white/10 my-12" />

          {/* ================= 15 ================= */}
          <section className="space-y-4">
            <h2 className="text-white text-xl font-bold font-display flex items-center gap-3">
              <span className="text-primary/60 text-lg">15.</span> Contact
              Information
            </h2>
            <p className="text-slate-400 leading-relaxed">
              For any questions regarding these Terms & Conditions, contact us
              at{" "}
              <a
                href="mailto:support@agenticaiimplementors.com"
                className="text-primary font-bold hover:underline"
              >
                support@agenticaiimplementors.com
              </a>
              .
            </p>
          </section>

          <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-500 text-xs italic">
              By enrolling in Masterstroke, you acknowledge that you have read
              and agreed to these Terms & Conditions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;
