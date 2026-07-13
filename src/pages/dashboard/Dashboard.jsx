import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

// ❌ DUPLICATE IMPORT — kept but commented, NOT deleted
// import { useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabaseClient";

// ❌ ILLEGAL HOOK USAGE — kept but commented, NOT deleted
// const location = useLocation();

const PROGRAMS = {
  AGENTIC: "agentic-ai-systems-engineer",
  GENAI: "genai-platform-architect",
  GOVERNANCE: "ai-validation-governance-engineer",
};
// For Testing it is blocked and replaced
//const PROGRAM_MAP = {
//  "agentic-ai-systems-engineer": {
//    id: "agentic_ai_engineer",
//  },
//  "genai-platform-architect": {
//    id: "genai_platform_architect",
//  },
//  "ai-validation-governance-engineer": {
//    id: "ai_validation_governance",
//  },
//};

const PROGRAM_MAP = {
  "agentic-ai-systems-engineer": {
    id: "b36863cd-0dc3-4360-b8d3-90e849ef153a",
  },

  "genai-platform-architect": {
    id: "e1f01af4-c7c2-49a1-8357-7c783d65c4c9",
  },

  "ai-validation-governance-engineer": {
    id: "c46f7707-3495-47b9-a759-eb6f5b92c642",
  },
};

export default function Dashboard() {
  const navigate = useNavigate();

  // ✅ LEGAL hook usage (THIS is the fix)
  const location = useLocation();

const [cleaned, setCleaned] = useState(false);

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [razorpayReady, setRazorpayReady] = useState(false);
  const [enrolledPrograms, setEnrolledPrograms] = useState(new Set());

  const isAgenticEnrolled = enrolledPrograms.has(
  PROGRAM_MAP[PROGRAMS.AGENTIC].id
);

const isGenAIEnrolled = enrolledPrograms.has(
  PROGRAM_MAP[PROGRAMS.GENAI].id
);

const isGovernanceEnrolled = enrolledPrograms.has(
  PROGRAM_MAP[PROGRAMS.GOVERNANCE].id
);

  // ================= FETCH ENROLLMENTS =================
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

  // ================= FETCH USER (CORRECT WAY) =================
  const isReturningFromPayment = () => {
  const params = new URLSearchParams(window.location.search);
  return (
    params.has("razorpay_payment_id") ||
    params.has("razorpay_order_id")
  );
};
  
  useEffect(() => {
  let mounted = true;

  const loadSessionAndEnrollments = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!mounted) return;

    if (!session?.user) {
      setUser(null);
      setEnrolledPrograms(new Set());
      setAuthLoading(false);
      return;
    }

    setUser(session.user);

    // 🔥 FORCE REFRESH AFTER PAYMENT
    const enrolled = await fetchEnrollments(session.user.id);
    setEnrolledPrograms(enrolled);

    setAuthLoading(false);

    // 🔥 CLEAN URL AFTER FIRST POST-PAYMENT LOAD
if (!cleaned && isReturningFromPayment()) {
  window.history.replaceState({}, "", "/dashboard");
  setCleaned(true);
}
  };

  loadSessionAndEnrollments();

  return () => {
    mounted = false;
  };
}, [location.key]);


  // ================= LOAD RAZORPAY SCRIPT =================
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

  // ================= RAZORPAY ENROLL HANDLER =================
  const handleEnroll = async (programId) => {

 //   alert("handleEnroll started");
console.log("handleEnroll started");

    const API_BASE =
  import.meta.env.DEV
    ? "http://localhost:4000"
    : "/api";


//    console.log("API_BASE =", API_BASE);
//console.log("CREATE ORDER URL =", `${API_BASE}/payments/create-order`);


    
//    console.log("ENROLL CLICKED", { razorpayReady, user });

    if (!user) {
      alert("Session not ready yet. Please wait 1–2 seconds and try again.");
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
  program_id: PROGRAM_MAP[programId].id,
  user_id: user.id,
}),
      });

      if (!res.ok) throw new Error("Order creation failed");

      const data = await res.json();

      const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: data.amount,
  currency: data.currency,
  name: "Masterstroke Program",
  description: programId.replaceAll("-", " "),
  order_id: data.id,
  prefill: { email: user.email },
  theme: { color: "#22d3ee" },

handler: async function (response) {
  try {
  //  console.log("USER =", user);

// console.log("EMAIL =", user.email);

// console.log("METADATA =", user.user_metadata);

    const verifyRes = await fetch(`${API_BASE}/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
 // For Testing
//     body: JSON.stringify({
 //       razorpay_order_id: response.razorpay_order_id,
 //       razorpay_payment_id: response.razorpay_payment_id,
 //       razorpay_signature: response.razorpay_signature,
 //       user_id: user.id,
 //       program_id: PROGRAM_MAP[programId].id,
 //     }),
  
body: JSON.stringify({
  razorpay_order_id: response.razorpay_order_id,
  razorpay_payment_id: response.razorpay_payment_id,
  razorpay_signature: response.razorpay_signature,

  user_id: user.id,
  program_id: PROGRAM_MAP[programId].id,

  student_name:
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    "",

  student_email: user.email,
}),

});

    const result = await verifyRes.json();

    if (!verifyRes.ok) {
      console.error("VERIFY API FAILED", result);
      alert(result.error || "Payment verification failed. Contact support.");
      return;
    }

    // Optimistic UI update
    setEnrolledPrograms((prev) => {
  const next = new Set(prev);
  next.add(PROGRAM_MAP[programId].id);
  return next;
});

    // Hard re-fetch from DB
    const enrolled = await fetchEnrollments(user.id);
    setEnrolledPrograms(enrolled);
  } catch (err) {
    console.error("VERIFY CALL FAILED", err);
    alert("Payment verification failed. Please contact support.");
  }
},

};

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Enrollment error:", err);
      alert("Payment failed. Please try again.");
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading dashboard…
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-[#050608] text-slate-200 px-6 py-24 font-display">

      {/* ================= HEADER ================= */}
      <section className="max-w-7xl mx-auto mb-16">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400 text-sm">
              Program access and next actions
            </p>
			
<button
  onClick={() => {
    navigate("/");
    setTimeout(() => {
      document
        .getElementById("curriculum")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }}
  className="mt-4 text-xs uppercase tracking-widest text-cyan-400 hover:underline"
>
  ← Back to Program
</button>			

          </div>

          <div className="flex items-center gap-4">
  {user && (
    <span className="text-xs text-white/70">
      Signed in as <strong>{user.email}</strong>
    </span>
  )}
</div>

        </div>
      </section>

      {/* ================= PROGRAMS ================= */}
      <section className="max-w-7xl mx-auto mb-20">
        <p className="text-cyan-400 text-xs font-bold uppercase tracking-[0.3em] mb-2">
          Programs
        </p>
        <p className="text-slate-400 text-sm mb-10">
          Your current access across Masterstroke programs
        </p>

        <div className="space-y-6">

          {/* ================= AGENTIC AI SYSTEMS ENGINEER — ACTIVE ================= */}
          <div className="relative rounded-2xl border border-cyan-400/40 bg-white/[0.02] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_left,rgba(0,220,246,0.18),transparent_62%)]" />


            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between p-8 gap-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-cyan-400/10 border border-cyan-400/40">
                  <span className="material-symbols-outlined text-cyan-400 text-3xl">
                    smart_toy
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Agentic AI Systems Engineer
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl">
                    Build and operate autonomous, tool-using AI systems.
                    Mastery of multi-agent orchestration and tool-loop grounding.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 lg:justify-end">


{isAgenticEnrolled ? (
  <>
    <span className="px-3 py-1 text-[10px] rounded-full bg-cyan-400/10 text-cyan-400 font-bold tracking-widest">
      ACTIVE
    </span>

    <a
      href="/syllabus/full/Agentic%20AI%20Systems%20Engineer%20–%20Syllabus%20&%20Lesson%20Plan.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 border border-white/20 rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Full Syllabus & Lesson Plan (PDF)
    </a>

    <a
     href="/lms/agentic-ai-systems-engineer"
      className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Go to LMS
    </a>
  </>
) : (
  <>
    <span className="text-xs text-slate-400 italic">
      Access details will appear here once available
    </span>

    <button
      onClick={() => handleEnroll(PROGRAMS.AGENTIC)}
      className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Enroll
    </button>
  </>
)}




              </div>
            </div>
          </div>

          {/* ================= GENAI PLATFORM ARCHITECT ================= */}
          <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_left,rgba(234,179,8,0.15),transparent_62%)]" />


            <div className="relative flex items-center justify-between p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="material-symbols-outlined text-yellow-400 text-3xl">
                    architecture
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    GenAI Platform Architect
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl">
                    Design scalable GenAI platforms and orchestration layers.
                    Focus on enterprise-grade reliability and provider abstraction.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
 
{isGenAIEnrolled ? (
  <>
    <span className="px-3 py-1 text-[10px] rounded-full bg-cyan-400/10 text-cyan-400 font-bold tracking-widest">
      ACTIVE
    </span>

    <a
      href="/syllabus/full/GenAI%20Platform%20Architect%20–%20Syllabus%20&%20Lesson%20Plan.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 border border-white/20 rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Full Syllabus & Lesson Plan (PDF)
    </a>

    <a
      href="/lms/genai-platform-architect"
      className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Go to LMS
    </a>
  </>
) : (
  <>
    <span className="text-xs text-slate-400 italic">
      Access details will appear here once available
    </span>

    <button
      onClick={() => handleEnroll(PROGRAMS.GENAI)}
      className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Enroll
    </button>
  </>
)}
              </div>
            </div>
          </div>

          {/* ================= AI VALIDATION & GOVERNANCE ENGINEER ================= */}
          <div className="relative rounded-2xl border border-red-500/30 bg-white/[0.02] overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_left,rgba(220,38,38,0.18),transparent_62%)]" />


            <div className="relative flex items-center justify-between p-8">
              <div className="flex items-start gap-6">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                  <span className="material-symbols-outlined text-red-400 text-3xl">
                    gavel
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-300 mb-1">
                    AI Validation & Governance Engineer
                  </h3>
                  <p className="text-slate-400 text-sm max-w-xl">
                    Ensure safety, compliance, and auditability of AI systems.
                    Evaluation frameworks and red-teaming automation.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">

{isGovernanceEnrolled ? (
  <>
    <span className="px-3 py-1 text-[10px] rounded-full bg-cyan-400/10 text-cyan-400 font-bold tracking-widest">
      ACTIVE
    </span>

    <a
      href="/syllabus/full/AI%20Validation%20&%20Governance%20Engineer%20–%20Syllabus%20&%20Lesson%20Plan.pdf"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-3 border border-white/20 rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Full Syllabus & Lesson Plan (PDF)
    </a>

    <a
      href="/lms/ai-validation-governance-engineer"
      className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Go to LMS
    </a>
  </>
) : (
  <>
    <span className="text-xs text-slate-400 italic">
      Access details will appear here once available
    </span>

    <button
      onClick={() => handleEnroll(PROGRAMS.GOVERNANCE)}
      className="px-6 py-3 bg-cyan-400 text-black rounded-lg font-bold uppercase tracking-widest text-xs"
    >
      Enroll
    </button>
  </>
)}


              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
