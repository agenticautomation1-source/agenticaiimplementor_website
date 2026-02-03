import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import RequireAuth from "./components/RequireAuth";
import HomeGate from "./pages/HomeGate";
import AuthCallback from "./pages/AuthCallback";
import TestAuth from "./pages/TestAuth";
import Dashboard from "./pages/dashboard/Dashboard";

import SystemsEngineer from "./pages/courses/SystemsEngineer";
import PlatformArchitect from "./pages/courses/PlatformArchitect";
import GovernanceEngineer from "./pages/courses/GovernanceEngineer";

import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contact";
import Courses from "./pages/Courses";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import Features from "./components/Features";
import WhyMasterstroke from "./components/WhyMasterstroke";
import Curriculum from "./components/Curriculum";
import AIAdvisor from "./components/AIAdvisor";

import RefundPolicy from "./pages/RefundPolicy";
import Disclaimer from "./pages/Disclaimer";
import TermsConditions from "./pages/TermsAndConditions";

import { Course } from "./types";
import { supabase } from "./lib/supabaseClient";

const App: React.FC = () => {
  const location = useLocation();
  const [paymentOpen, setPaymentOpen] = useState(false);

  // 🔴 ABSOLUTE RULE:
  // Logged-in users must NEVER stay on "/"
  
  // ========= ENROLL (kept exactly as before) =========
  const handleEnroll = (course: Course) => {
    console.log("Enroll clicked:", course);
  };

  const handlePaymentSuccess = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-slate-100 pointer-events-auto">

      {/* ================= NAVBAR ================= */}
      <Navbar />

      <main className="flex-1">
        <Routes>

          {/* ================= AUTH CALLBACK ================= */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* ================= DASHBOARD (PROTECTED) ================= */}
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
                <>
                  <Hero />
                  <LogoMarquee />
                  <Features />

                  <div id="curriculum">
                    <Curriculum onEnroll={handleEnroll} />
                  </div>

                  <WhyMasterstroke />

                  {/* CTA */}
                  <section className="max-w-[1200px] mx-auto px-6 py-24">
                    <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-white/5 bg-[#05070c]">
                      <div className="relative z-10 flex flex-col items-center gap-8">
                        <h2 className="text-white text-4xl md:text-5xl font-bold font-display max-w-2xl">
                          The Future is Agentic.
                          <br />
                          Play Your Masterstroke
                        </h2>

                        <p className="text-slate-400 text-lg max-w-xl">
                          Masterstroke is a hands-on, cohort-driven program for engineers
                          building real agentic systems in production environments.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            onClick={() =>
                              document
                                .getElementById("curriculum")
                                ?.scrollIntoView({ behavior: "smooth" })
                            }
                            className="px-10 py-5 bg-primary text-white font-bold rounded-xl uppercase tracking-widest text-sm"
                          >
                            Join the Masterstroke Program
                          </button>

                          <button className="px-10 py-5 rounded-xl border border-white/10 text-white font-bold uppercase tracking-widest text-sm">
                            View Case Studies
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              </HomeGate>
            }
          />

          {/* ================= COURSES ================= */}
          <Route path="/courses" element={<Courses />} />
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

          {/* ================= POLICIES ================= */}
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />

          {/* ================= DEBUG ================= */}
          <Route path="/test-auth" element={<TestAuth />} />

        </Routes>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 bg-charcoal/50 py-20">
        <div className="relative pl-20 pr-6 md:pr-8 w-full">
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
