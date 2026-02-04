const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve the previous page info if available via state
  const from = location.state?.from || sessionStorage.getItem("dashboard_from");
  
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const [enrolledPrograms, setEnrolledPrograms] = useState(new Set());
  const paymentHandledRef = useRef(false);

  // =========================================================
  // REPAIRED: FETCH ENROLLMENTS (Removed TS Types)
  // =========================================================
  const fetchEnrollments = async (userId) => {
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

  // =========================================================
  // REPAIRED: SESSION & AUTH LISTENER
  // =========================================================
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

  // =========================================================
  // RAZORPAY SCRIPT LOADER
  // =========================================================
  useEffect(() => {
    if (window.Razorpay) {
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

  // =========================================================
  // REPAIRED: LOGOUT HANDLER
  // =========================================================
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Clear all session/path trackers
    sessionStorage.removeItem("dashboard_from");
    localStorage.removeItem("returnPath"); 
    // Force redirect to landing page
    window.location.replace("/#/");
  };

  // =========================================================
  // REPAIRED: BACK TO PROGRAMS LOGIC (CRITICAL BUG FIX)
  // =========================================================
  const handleBackToProgram = () => {
    // 1. Check if we saved a course origin in the Navbar before login
    const savedCoursePath = localStorage.getItem("returnPath");
    
    if (savedCoursePath && savedCoursePath.includes("/courses/")) {
      // Return to the specific program (SystemsEngineer, PlatformArchitect, etc.)
      navigate(savedCoursePath);
    } else {
      // 2. Fallback for first-time login: Go to "Featured Curriculum" on Home
      // Note: Make sure your landing page curriculum section has id="curriculum"
      window.location.href = "/#/#curriculum";
    }
  };

  // =========================================================
  // RAZORPAY ENROLL HANDLER (Removed TS Types)
  // =========================================================
  const handleEnroll = async (programId) => {
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

      document.documentElement.classList.add("razorpay-open");
      setPaymentInProgress(true);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "Masterstroke Program",
        description: programId.replaceAll("-", " "),
        order_id: data.id,
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
        handler: async (response) => {
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
            alert("Payment verified. You are now enrolled in this program.");

          } catch (err) {
            console.error("Verification request crashed", err);
            paymentHandledRef.current = false;
            alert("Payment verification failed.");
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setPaymentInProgress(false);
      document.documentElement.classList.remove("razorpay-open");
      console.error("Enrollment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  // =========================================================
  // CONDITIONAL LOADING RENDER
  // =========================================================
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050608] text-slate-400">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">Initializing Dashboard</p>
        </div>
      </div>
    );
  }

  if (!authLoading && !user) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#050608] text-slate-200 px-6 py-24 font-display">

      {/* ================= HEADER SECTION ================= */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h1 className="text-5xl font-black text-white mb-2 tracking-tighter italic uppercase">Dashboard</h1>
            <p className="text-slate-500 text-sm font-medium tracking-widest uppercase mb-6">
              Program access and next actions
            </p>
			
            {/* REPAIRED: <- Back to Programs Button */}
            <button
              onClick={handleBackToProgram}
              className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 hover:text-white transition-all duration-300"
            >
              <span className="text-xl leading-none transition-transform group-hover:-translate-x-2">←</span> 
              Back to Programs
            </button>
          </div>

          <div className="flex items-center gap-6 bg-white/[0.03] border border-white/10 p-4 rounded-2xl">
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Authenticated Account</span>
              <span className="text-xs text-white/70 font-bold">{user.email}</span>
            </div>
            {/* REPAIRED: Logout Button Present */}
            <button 
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/5 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              title="Terminate Session"
            >
              <span className="material-symbols-outlined text-xl">logout</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= PROGRAMS SECTION ================= */}
      <section className="max-w-7xl mx-auto mb-20">
        <div className="mb-12">
          <p className="text-cyan-400 text-[10px] font-black uppercase tracking-[0.5em] mb-3">
            Available Programs
          </p>
          <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
            Manage your progress across the Agentic AI Implementors masterstroke curriculum.
          </p>
        </div>

        <div className="space-y-8">

          {/* ================= AGENTIC AI SYSTEMS ENGINEER block ================= */}
          <div className="relative rounded-[32px] border border-cyan-400/40 bg-white/[0.02] overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(0,220,246,0.15),transparent_60%)]" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-10 gap-10">
              <div className="flex items-start gap-8">
                <div className="p-5 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                  <span className="material-symbols-outlined text-4xl">smart_toy</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase italic">
                    Agentic AI Systems Engineer
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                    Build and operate autonomous, tool-using AI systems.
                    Mastery of multi-agent orchestration, tool-loop grounding, and enterprise agentic patterns.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 lg:justify-end">
                <span className="px-4 py-1.5 text-[10px] rounded-full bg-cyan-400/10 text-cyan-400 font-black tracking-widest border border-cyan-400/20">
                  ACTIVE
                </span>

                <a
                  href="/syllabus/full/Agentic%20AI%20Systems%20Engineer%20–%20Syllabus%20&%20Lesson%20Plan.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 border border-white/10 rounded-xl font-bold uppercase tracking-widest text-[10px] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  Syllabus (PDF)
                </a>

                <button
                  onClick={() => navigate('/lms/courses/masterstroke-agentic-ai-systems-engineer')}
                  className="px-8 py-4 bg-cyan-400 text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:brightness-110 shadow-lg shadow-cyan-400/20 transition-all active:scale-95"
                >
                  Access Curriculum
                </button>
              </div>
            </div>
          </div>

          {/* ================= GENAI PLATFORM ARCHITECT block ================= */}
          <div className="relative rounded-[32px] border border-white/10 bg-white/[0.01] overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(234,179,8,0.12),transparent_60%)]" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-10 gap-10">
              <div className="flex items-start gap-8">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-yellow-500">
                  <span className="material-symbols-outlined text-4xl">architecture</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight uppercase italic">
                    GenAI Platform Architect
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                    Design scalable GenAI platforms and orchestration layers.
                    Focus on enterprise-grade reliability, provider abstraction, and infrastructure safety.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="/syllabus/outline/MASTERSTROKE%20–%20GenAI%20Platform%20Architect.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all"
                >
                  Outline
                </a>

                {enrolledPrograms.has("genai-platform-architect") ? (
                  <button className="px-8 py-4 bg-white/10 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] cursor-default border border-white/5">
                    ENROLLED
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll("genai-platform-architect")}
                    className="px-8 py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ================= AI VALIDATION & GOVERNANCE ENGINEER block ================= */}
          <div className="relative rounded-[32px] border border-white/10 bg-white/[0.01] overflow-hidden group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(220,38,38,0.15),transparent_60%)]" />

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-10 gap-10">
              <div className="flex items-start gap-8">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-red-500">
                  <span className="material-symbols-outlined text-4xl">gavel</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-300 mb-2 tracking-tight uppercase italic">
                    AI Validation & Governance Engineer
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
                    Ensure safety, compliance, and auditability of AI systems.
                    Master evaluation frameworks, adversarial testing, and red-teaming automation.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="/syllabus/outline/MASTERSTROKE%20–%20AI%20Validation%20&%20Governance%20Engineer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-4 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-all"
                >
                  Outline
                </a>

                {enrolledPrograms.has("ai-validation-governance-engineer") ? (
                   <button className="px-8 py-4 bg-white/10 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] cursor-default border border-white/5">
                    ENROLLED
                  </button>
                ) : (
                  <button
                    onClick={() => handleEnroll("ai-validation-governance-engineer")}
                    className="px-8 py-4 bg-white text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= PLATFORM UTILITIES FOOTER ================= */}
      <section className="max-w-7xl mx-auto border-t border-white/5 pt-12 text-center">
        <p className="text-[9px] text-slate-700 uppercase tracking-[0.6em] font-black">
          Masterstroke Identity Protocol v2.4.0
        </p>
      </section>
    </main>
  );
}