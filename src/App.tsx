import VerifyCertificate from "./pages/VerifyCertificate";
import SampleCertificate from "./pages/SampleCertificate";
import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import LearningPathPage from "./pages/learning-path/LearningPath.page";

import Courses from "./pages/Courses";
import Programs from "./pages/Programs";
import AuthCallback from "./pages/AuthCallback";
import TestAuth from "./pages/TestAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import RequireAuth from "./components/RequireAuth";

import SystemsEngineer from "./pages/courses/SystemsEngineer";
import PlatformArchitect from "./pages/courses/PlatformArchitect";
import GovernanceEngineer from "./pages/courses/GovernanceEngineer";

import CookiePolicy from "./pages/CookiePolicy";
import Contact from "./pages/Contact";
import RefundPolicy from "./pages/RefundPolicy";
import Disclaimer from "./pages/Disclaimer";
import TermsConditions from "./pages/TermsAndConditions";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LogoMarquee from "./components/LogoMarquee";
import WhyMasterstroke from "./components/WhyMasterstroke";
import Curriculum from "./components/Curriculum";
import AIAdvisor from "./components/AIAdvisor";

const App: React.FC = () => {
  {/* const location = useLocation(); - Delete later 
  const isLearningPath = location.pathname === "/learning-path";*/}

  const [paymentOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-slate-100 pointer-events-auto">
      {/* NAVBAR */}
      <Navbar />

      <main className="flex-1 min-h-screen">
        <Routes>
          {/* AUTH CALLBACK */}
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />

          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <LogoMarquee />
                <div id="curriculum">
                  <Curriculum />
                </div>
                <WhyMasterstroke />
              </>
            }
          />

          {/* COURSES */}
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

          {/* PROGRAMS */}
          <Route path="/programs" element={<Programs />} />

          {/* LEARNING PATH */}
          <Route path="/learning-path" element={<LearningPathPage />} />

          {/* POLICIES */}
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/terms-and-conditions" element={<TermsConditions />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
		  <Route path="/sample-certificate" element={<SampleCertificate />} />
		  <Route path="/verify/:id" element={<VerifyCertificate />} />
          {/* TEST */}
          <Route path="/test-auth" element={<TestAuth />} />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* FOOTER */}
      
        <footer className="border-t border-white/5 bg-charcoal/50 py-12">
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
    

      {/* AI ADVISOR */}
      {!paymentOpen && <AIAdvisor />}
    </div>
  );
};

export default App;
