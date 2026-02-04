const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the previous page path from location state or session storage
  const from = location.state?.from || sessionStorage.getItem("dashboard_from");
  
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [enrolledPrograms, setEnrolledPrograms] = useState(new Set());
  const paymentHandledRef = useRef(false);

  // ================= FETCH ENROLLMENTS =================
  const fetchEnrollments = async (userId: string) => {
    const { data, error } = await supabase
      .from("enrollments")
      .select("program_id, status")
      .eq("user_id", userId);

    if (error) {
      console.error("Failed to fetch enrollments", error);
      return new Set();
    }

    return new Set(
      data
        .filter((e) => e.status === "active")
        .map((e) => e.program_id)
    );
  };

  // ================= FETCH USER & SESSION =================
  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;

      if (session?.user) {
        setUser(session.user);
        const enrolled = await fetchEnrollments(session.user.id);
        setEnrolledPrograms(enrolled);
      } else {
        setUser(null);
        setEnrolledPrograms(new Set());
      }

      setAuthLoading(false);
    };

    loadSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;

        if (session?.user) {
          setUser(session.user);
          const enrolled = await fetchEnrollments(session.user.id);
          setEnrolledPrograms(enrolled);
        } else {
          setUser(null);
          setEnrolledPrograms(new Set());
        }

        setAuthLoading(false);
      }
    );

    return () => {
      mounted = false;
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // ================= LOAD RAZORPAY SCRIPT =================
  useEffect(() => {
    if ((window as any).Razorpay) {
      setRazorpayReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      setRazorpayReady(true);
    };

    document.body.appendChild(script);
  }, []);

  // ================= LOGOUT HANDLER =================
  const handleLogout = async () => {
    await supabase.auth.signOut();

    // 🔴 CRITICAL: clear any remembered redirect
    sessionStorage.removeItem("dashboard_from");

    // 🔴 FORCE hard reload to the landing page
    window.location.replace("/#/");
  };

  // ================= RAZORPAY ENROLL HANDLER =================
  const handleEnroll = async (programId: string) => {
    // 🛑 GUARD: user must be ready
    if (!user) {
      alert("Session not ready yet. Please wait 1–2 seconds and try again.");
      return;
    }

    if (paymentInProgress) {
      console.warn("Payment already in progress, blocking duplicate call");
      return;
    }
    if (!razorpayReady) {
      alert("Payment system is still loading. Please try again.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/payments/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programSlug: programId,
          userId: user.id,
        }),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const data = await res.json();

      // lock UI
      document.documentElement.classList.add("razorpay-open");
      setPaymentInProgress(true);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Masterstroke Program",
        description: programId.replaceAll("-", " "),
        order_id: data.id,

        // 🔴 CRITICAL: prevent Razorpay redirect flow
        redirect: false,

        prefill: {
          email: user.email,
        },

        theme: {
          color: "#22d3ee",
        },

        modal: {
          backdropclose: false,
          escape: false,
          ondismiss: () => {
            setPaymentInProgress(false);
            document.documentElement.classList.remove("razorpay-open");
            paymentHandledRef.current = false;
          },
        },

        handler: async (response: any) => {
          console.log("RAZORPAY HANDLER FIRED", response);
          setPaymentInProgress(false);
          document.documentElement.classList.remove("razorpay-open");

          try {
            const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                userId: user.id,
                programSlug: programId,
              }),
            });

            if (!verifyRes.ok) {
              const err = await verifyRes.json();
              console.error("VERIFY FAILED", err);
              paymentHandledRef.current = false;
              alert("Payment verification failed on server.");
              return;
            }

            console.log("PAYMENT VERIFIED SUCCESSFULLY");
            const enrolled = await fetchEnrollments(user.id);
            setEnrolledPrograms(enrolled);
            alert("Payment verified. You are now enrolled.");
          } catch (err) {
            console.error("Verification request crashed", err);
            paymentHandledRef.current = false;
            alert("Payment verification failed.");
          }
        },
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      setPaymentInProgress(false);
      document.documentElement.classList.remove("razorpay-open");
      console.error("Enrollment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 bg-[#050608]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-widest">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!authLoading && !user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#050608] text-slate-200 px-6 py-24 font-display">
      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Dashboard</h1>
            <p className="text-slate-400 text-sm">
              Program access and next actions
            </p>
            
            {/* CORRECTED BACK TO PROGRAMS BUTTON */}
            {from ? (
              <button
                onClick={() => navigate(from)}
                className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400 hover:text-white transition-colors"
              >
                <span className="text-lg leading-none">←</span> Back to Program
              </button>
            ) : (
              <button
                onClick={() => navigate('/')}
                className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-colors"
              >
                <span className="text-lg leading-none">←</span> Back to Programs
              </button>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Authenticated as</span>
              <span className="text-sm text-white/70">{user.email}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-red-400 hover:border-red-400/30 transition-all"
              title="Sign Out"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="mb-10">
          <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">
            Programs
          </p>
          <p className="text-slate-400 text-sm">
            Your current access across Masterstroke programs
          </p>
        </div>

        <div className="space-y-6">
          {/* ================= AGENTIC AI SYSTEMS ENGINEER — ACTIVE ================= */}
          <div className="relative rounded-2xl border border-cyan-400/40 bg-white/[0.02] overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,220,246,0.18),transparent_62%)] opacity-70" />
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-8 gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/40 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                  <span className="material-symbols-outlined text-3xl">smart_toy</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Agentic AI Systems Engineer</h3>
                  <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                    Build and operate autonomous, tool-using AI systems.
                    Mastery of multi-agent orchestration and tool-loop grounding.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 lg:justify-end">
                <span className="px-3 py-1 text-[10px] rounded-full bg-cyan-400/10 text-cyan-400 font-bold tracking-widest border border-cyan-400/20">
                  ACTIVE
                </span>
                <a
                  href="/syllabus/full/Agentic%20AI%20Systems%20Engineer%20–%20Syllabus%20&%20Lesson%20Plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-white/10 rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-white/5 transition"
                >
                  Syllabus (PDF)
                </a>
                <button
                  onClick={() => navigate('/lms/courses/masterstroke-agentic-ai-systems-engineer')}
                  className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-[10px] hover:brightness-110 transition shadow-lg shadow-cyan-400/20"
                >
                  Go to LMS
                </button>
              </div>
            </div>
          </div>

          {/* ================= GENAI PLATFORM ARCHITECT ================= */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden">
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-8 gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-yellow-500">
                  <span className="material-symbols-outlined text-3xl">architecture</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">GenAI Platform Architect</h3>
                  <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                    Design scalable GenAI platforms and orchestration layers.
                    Focus on enterprise-grade reliability and provider abstraction.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/syllabus/outline/MASTERSTROKE%20–%20GenAI%20Platform%20Architect.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition"
                >
                  Outline
                </a>
                {enrolledPrograms.has("genai-platform-architect") ? (
                  <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-bold uppercase tracking-widest text-[10px] cursor-default">
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll("genai-platform-architect")}
                    className="px-6 py-3 bg-white text-black rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 transition"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ================= AI VALIDATION & GOVERNANCE ENGINEER ================= */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.01] overflow-hidden">
            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-8 gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-red-400">
                  <span className="material-symbols-outlined text-3xl">gavel</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-300 mb-1">AI Validation & Governance Engineer</h3>
                  <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                    Ensure safety, compliance, and auditability of AI systems.
                    Evaluation frameworks and red-teaming automation.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/syllabus/outline/MASTERSTROKE%20–%20AI%20Validation%20&%20Governance%20Engineer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition"
                >
                  Outline
                </a>
                {enrolledPrograms.has("ai-validation-governance-engineer") ? (
                  <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-bold uppercase tracking-widest text-[10px] cursor-default">
                    Enrolled
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll("ai-validation-governance-engineer")}
                    className="px-6 py-3 bg-white text-black rounded-lg font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 transition"
                  >
                    Enroll
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}