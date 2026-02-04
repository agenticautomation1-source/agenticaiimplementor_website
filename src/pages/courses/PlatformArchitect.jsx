// src/pages/courses/PlatformArchitect.jsx
import ProgramEnrollment from "../../components/ProgramEnrollment";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function PlatformArchitect() {
  const [email, setEmail] = useState("");




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  const signInWithEmail = async () => {
  if (!email) {
    alert("Please enter your email");
    return;
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: window.location.origin,
    },
  });

  if (error) {
    alert("Email sign-in failed");
    return;
  }

  alert("Check your email for the login link");
};

  return (
    <main className="bg-[#050608] text-slate-200 font-display">

      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-28 px-6 lg:px-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[520px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-[140px]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            Masterstroke <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500">
              GenAI Platform Architect
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Design secure, scalable, multi-tenant GenAI platforms for real enterprise environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-cyan-400 text-black font-bold uppercase tracking-widest text-sm hover:brightness-110 transition">
              Secure Your Spot
            </button>
            <button className="px-10 py-4 border border-white/15 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition">
              Download Syllabus
            </button>
          </div>
        </div>
      </section>

      {/* ================= TARGET AUDIENCE ================= */}
      <section className="py-24 px-6 lg:px-20 bg-[#12141a]/40">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 mb-4">
            Target Audience
          </h2>
          <h3 className="text-3xl font-bold text-white mb-16">
            Who this program is for
          </h3>

          <div className="grid md:grid-cols-3 gap-8">

            {/* Senior Engineers */}
            <div className="rounded-2xl border border-cyan-400/40 bg-white/[0.02] backdrop-blur-xl
                            shadow-[inset_0_0_22px_rgba(0,220,246,0.18)]">
              <div className="h-48 m-4 rounded-xl flex items-center justify-center
                              bg-[radial-gradient(circle_at_center,rgba(0,220,246,0.18),transparent_70%)]">
                <span className="material-symbols-outlined text-[56px]" style={{ color: "#00dcf6" }}>
                  database
                </span>
              </div>
              <div className="p-8 pt-2">
                <div className="flex gap-4 mb-6 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                  <span>12 Weeks</span>
                  <span>Expert</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">Senior Engineers</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Transitioning from GenAI features to production-grade platform architectures.
                </p>
              </div>
            </div>

            {/* Cloud Architects */}
            <div className="rounded-2xl border border-red-400/40 bg-white/[0.02] backdrop-blur-xl
                            shadow-[inset_0_0_22px_rgba(255,77,77,0.18)]">
              <div className="h-48 m-4 rounded-xl flex items-center justify-center
                              bg-[radial-gradient(circle_at_center,rgba(255,77,77,0.18),transparent_70%)]">
                <span className="material-symbols-outlined text-[56px] text-red-400">
                  shield
                </span>
              </div>
              <div className="p-8 pt-2">
                <div className="flex gap-4 mb-6 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                  <span>8 Weeks</span>
                  <span>Expert</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Cloud & Platform Architects
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Designing secure, scalable enterprise GenAI foundations.
                </p>
              </div>
            </div>

            {/* Tech Leads */}
            <div className="rounded-2xl border border-amber-400/40 bg-white/[0.02] backdrop-blur-xl
                            shadow-[inset_0_0_22px_rgba(255,179,0,0.18)]">
              <div className="h-48 m-4 rounded-xl flex items-center justify-center
                              bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.18),transparent_70%)]">
                <span className="material-symbols-outlined text-[56px] text-amber-400">
                  hub
                </span>
              </div>
              <div className="p-8 pt-2">
                <div className="flex gap-4 mb-6 text-slate-500 text-[10px] uppercase tracking-widest font-bold">
                  <span>10 Weeks</span>
                  <span>Expert</span>
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  Tech Leads & AI Consultants
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Designing long-term AI platform foundations.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CURRICULUM FOCUS ================= */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-cyan-400 mb-4 text-center">
            Curriculum Focus
          </h2>
          <h3 className="text-3xl font-bold text-white mb-16 text-center">
            What You Learn to Solve
          </h3>

          <div className="grid lg:grid-cols-2 gap-12">

            {/* LEFT */}
            <div className="space-y-6">
              <div className="p-6 rounded-2xl border border-cyan-400/40
                              bg-[radial-gradient(circle_at_left,rgba(0,220,246,0.18),transparent_70%)]">
                <span className="text-cyan-400 font-mono text-2xl font-bold">01</span>
                <h4 className="text-white font-bold text-lg mt-2">
                  Enterprise GenAI Architecture
                </h4>
                <p className="text-slate-400 text-sm">
                  Distributed, event-driven GenAI platforms at scale.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-red-400/40
                              bg-[radial-gradient(circle_at_left,rgba(255,77,77,0.18),transparent_70%)]">
                <span className="text-red-400 font-mono text-2xl font-bold">02</span>
                <h4 className="text-white font-bold text-lg mt-2">
                  Multi-Tenant Isolation & Security
                </h4>
                <p className="text-slate-400 text-sm">
                  IAM, boundaries, and injection mitigation.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-amber-400/40
                              bg-[radial-gradient(circle_at_left,rgba(255,179,0,0.18),transparent_70%)]">
                <span className="text-amber-400 font-mono text-2xl font-bold">03</span>
                <h4 className="text-white font-bold text-lg mt-2">
                  Model Abstraction & Portability
                </h4>
                <p className="text-slate-400 text-sm">
                  Provider-agnostic routing layers.
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="grid sm:grid-cols-2 gap-6">

              {[
                ["cloud", "Cloud GenAI Providers", "Infra Strategy"],
                ["database", "Vector Data Lifecycle", "Data Architecture"],
                ["payments", "Cost Governance & FinOps", "Operations"],
                ["auto_awesome", "And Much More", "Full Syllabus"],
              ].map(([icon, title, subtitle]) => (
                <div key={title}
                     className="p-8 rounded-2xl text-center border border-cyan-400/40
                                bg-[radial-gradient(circle_at_center,rgba(0,220,246,0.18),transparent_70%)]">
                  <span className="material-symbols-outlined text-4xl mb-4"
                        style={{ color: "#00dcf6" }}>
                    {icon}
                  </span>
                  <h5 className="text-white font-bold">{title}</h5>
                  <p className="text-slate-500 text-xs uppercase tracking-widest mt-1">
                    {subtitle}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>
      </section>

  	  
	     {/* ================= PROGRAM ENROLLMENT (SHARED) ================= */}
      <ProgramEnrollment programSlug="genai-platform-architect" />


    </main>
  );
}
