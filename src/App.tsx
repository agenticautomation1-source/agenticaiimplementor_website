import { useEffect } from "react";
import { supabase } from "./lib/supabaseClient";

import React, { useState } from "react";
import AuthCallback from "./pages/AuthCallback";
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import TestAuth from "./pages/TestAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth";
import HomeGate from "./components/HomeGate";
import SystemsEngineer from "./pages/courses/SystemsEngineer";
import PlatformArchitect from "./pages/courses/PlatformArchitect";
import GovernanceEngineer from "./pages/courses/GovernanceEngineer";
import AgenticAISystemsEngineer from "./pages/programs/AgenticAISystemsEngineer";
import GenAIPlatformArchitect from "./pages/programs/GenAIPlatformArchitect";
import AIValidationGovernanceEngineer from "./pages/programs/AIValidationGovernanceEngineer";
import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import WhyMasterstroke from "./components/WhyMasterstroke";
import Curriculum from "./components/Curriculum";
import AIAdvisor from "./components/AIAdvisor";
import RefundPolicy from "./pages/RefundPolicy";
import Disclaimer from "./pages/Disclaimer";
import TermsConditions from "./pages/TermsAndConditions";
import { Course } from "./types";

const App: React.FC = () => {

  const [paymentOpen, setPaymentOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

const handleEnroll = (course: Course) => {
  console.log("Enroll clicked:", course);
};

  // ⚠️ LEGACY UI STATE — NOT USED FOR AUTH
  


  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-slate-100 pointer-events-auto">
      {/* AUTH-AWARE NAVBAR */}
      <Navbar />

      <main className="flex-1">
        <Routes>
          {/* ================= DASHBOARD (AUTH REQUIRED) ================= */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard setPaymentOpen={setPaymentOpen} />
              </RequireAuth>
            }
          />

{/* ================= HOME ================= */}
<Route
  path="/"
  element={
    <HomeGate>
      <div>
        <Hero />
        <LogoMarquee />

        <div id="curriculum">
			<Curriculum />
		</div>

        <WhyMasterstroke />

        {/* ================= CTA ================= */}
        <section className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-white/5 bg-[#05070c]">
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(59,130,246,0.18),transparent_60%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-white text-4xl md:text-5xl font-bold font-display max-w-2xl">
                The Future is Agentic.
                <br />
                Play Your Masterstroke
              </h2>

              <p className="text-slate-400 text-lg max-w-xl">
                Masterstroke is a hands-on, cohort-driven program for
                engineers building real agentic systems in production
                environments.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() =>
                    document
                      .getElementById("curriculum")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-10 py-5 bg-primary text-white font-bold rounded-xl glow-accent hover:scale-105 transition-all active:scale-95 uppercase tracking-widest text-sm"
                >
                  Join the Masterstroke Program
                </button>

                <button className="px-10 py-5 rounded-xl border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-primary transition-all">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </HomeGate>
  }
/>

          {/* ================= COURSES ================= */}
          <Route path="/courses" element={<Courses />} />

          {/* ================= POLICY PAGES ================= */}
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />

          {/* ================= TEST AUTH ================= */}
          <Route path="/test-auth" element={<TestAuth />} />

          {/* ================= PROGRAM / COURSE PAGES ================= */}
          <Route
            path="/courses/agentic-ai-systems-engineer"
            element={<SystemsEngineer />}
          />
          <Route
            path="/courses/genai-platform-architect"
            element={<PlatformArchitect />}
          />
          <Route
            path="/courses/ai-validation-governance-engineer"
            element={<GovernanceEngineer />}
          />
        </Routes>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 bg-charcoal/50 py-20">
        <div className="relative pl-20 pr-6 md:pr-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* BRAND */}
            <Link
              to="/"
              className="md:col-span-2 flex items-start gap-4 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="size-10 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient
                      id="footerBlueGrad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M46 15 L20 75 L32 75 L50 25 Z"
                    fill="url(#footerBlueGrad)"
                  />
                  <path
                    d="M54 15 L80 75 L70 75 L50 25 Z"
                    fill="url(#footerBlueGrad)"
                  />
                  <path d="M58 45 L88 45 L88 52 L62 52 Z" fill="#2563eb" />
                  <path d="M64 60 L88 60 L88 67 L68 67 Z" fill="#1e40af" />
                  <path d="M25 80 L75 80 L75 90 L25 90 Z" fill="#1e3a8a" />
                  <circle
                    cx="48"
                    cy="65"
                    r="7"
                    fill="#6366f1"
                    className="animate-pulse"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-3">
                <h2 className="text-white text-lg font-semibold font-display leading-tight">
                  Agentic AI{" "}
                  <span className="text-slate-500 font-light">
                    Implementors
                  </span>
                </h2>
                <p className="text-slate-500 text-sm max-w-sm">
                  Building production-grade agentic systems through the
                  Masterstroke program.
                </p>
              </div>
            </Link>

            {/* NETWORK */}
            <div className="md:col-start-3 flex flex-col gap-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">
                Network
              </h4>
              <Link
                to="/about"
                className="text-slate-500 hover:text-primary text-sm"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-slate-500 hover:text-primary text-sm"
              >
                Contact
              </Link>
            </div>

            {/* POLICIES */}
            <div className="md:col-start-4 flex flex-col gap-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">
                Policies
              </h4>
              <Link
                to="/refund-policy"
                className="text-slate-500 hover:text-primary text-sm"
              >
                Refund Policy
              </Link>
              <Link
                to="/disclaimer"
                className="text-slate-500 hover:text-primary text-sm"
              >
                Disclaimer
              </Link>
              <Link
                to="/terms-and-conditions"
                className="text-slate-500 hover:text-primary text-sm"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/cookie-policy"
                className="text-slate-500 hover:text-primary text-sm"
              >
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex justify-between text-slate-600 text-xs">
            <p>Built for production-grade agentic systems.</p>
            <p>© {new Date().getFullYear()} Agentic AI Implementors</p>
          </div>
        </div>
      </footer>

      {!paymentOpen && <AIAdvisor />}
    </div>
  );
};

export default App;
