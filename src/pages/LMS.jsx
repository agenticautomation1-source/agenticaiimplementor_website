import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const PROGRAM_MAP = {
  "agentic-ai-systems-engineer": "agentic_ai_engineer",
  "genai-platform-architect": "genai_platform_architect",
  "ai-validation-governance-engineer": "ai_validation_governance",
};

const LMS_CONTENT = {
  "agentic-ai-systems-engineer": {
    title: "Agentic AI Systems Engineer",
    intensity: "96 Hour Comprehensive Engineering Track",
    modules: [
      {
        title: "Phase 01 – Foundations of Agentic Systems",
        hours: "12 Hours",
        lessons: [
          "State-aware Design Principles",
          "Autonomous Agent Loops",
          "LLM Agency Theory",
          "Prompt Contracts & Control"
        ],
      },
      {
        title: "Phase 02 – Logic Layer & n8n Orchestration",
        hours: "24 Hours",
        lessons: [
          "Advanced Workflow Design",
          "API Integrations",
          "Conditional Logic & Branching",
          "Failure Handling Strategies"
        ],
      },
      {
        title: "Phase 03 – Multi-Agent Architectures",
        hours: "18 Hours",
        lessons: [
          "Agent Coordination Patterns",
          "Supervisor Agents",
          "CrewAI Patterns",
          "Delegation & Task Routing"
        ],
      },
      {
        title: "Phase 04 – Memory & Planning Loops",
        hours: "14 Hours",
        lessons: [
          "Vector Memory Systems",
          "Short vs Long-Term Memory",
          "Recursive Planning",
          "Execution Graph Design"
        ],
      },
      {
        title: "Phase 05 – Production Hardening & Safety",
        hours: "12 Hours",
        lessons: [
          "Deterministic Execution",
          "Guardrails & Governance",
          "Rate Limiting & Cost Control",
          "Production Monitoring"
        ],
      },
      {
        title: "Advanced Module – LangGraph Mastery",
        hours: "16 Hours",
        lessons: [
          "State Machines with LangGraph",
          "Custom Agent Graphs",
          "Advanced Orchestration",
          "Enterprise Deployment Patterns"
        ],
      },
    ],
  },

  "ai-validation-governance-engineer": {
    title: "AI Validation & Governance Engineer",
    intensity: "96 Hour Enterprise Validation Track",
    modules: [
      {
        title: "Phase 01 – Foundations of AI Validation",
        hours: "12 Hours",
        lessons: [
          "AI Failure Modes",
          "Validation Philosophy",
          "Enterprise Risk Surfaces"
        ],
      },
      {
        title: "Phase 02 – Model, Prompt & Output Testing",
        hours: "16 Hours",
        lessons: [
          "Deterministic Testing",
          "Prompt Validation",
          "Regression Testing",
          "Output Constraints"
        ],
      },
      {
        title: "Phase 03 – Bias, Fairness & Hallucination Detection",
        hours: "14 Hours",
        lessons: [
          "Bias Testing Techniques",
          "Fairness Metrics",
          "Hallucination Detection"
        ],
      },
      {
        title: "Phase 04 – Human-in-the-Loop Systems",
        hours: "12 Hours",
        lessons: [
          "Review Workflows",
          "Escalation Paths",
          "Override Design"
        ],
      },
      {
        title: "Phase 05 – Governance & Compliance",
        hours: "16 Hours",
        lessons: [
          "Audit Trails",
          "ISO / SOC2 Alignment",
          "Regulatory Mapping"
        ],
      },
      {
        title: "Phase 06 – Production Monitoring",
        hours: "14 Hours",
        lessons: [
          "Drift Detection",
          "Incident Workflows",
          "Rollback Strategies"
        ],
      },
      {
        title: "Capstone – Enterprise Governance Framework",
        hours: "12 Hours",
        lessons: [
          "Design Complete Governance System",
          "Risk Modeling",
          "Defense & Architecture Review"
        ],
      },
    ],
  },

  "genai-platform-architect": {
    title: "GenAI Platform Architect",
    intensity: "96 Hour Enterprise Architecture Track",
    modules: [
      {
        title: "Phase 01 – Enterprise GenAI Foundations",
        hours: "16 Hours",
        lessons: [
          "Reference Architectures",
          "Enterprise Constraints",
          "Platform Fundamentals"
        ],
      },
      {
        title: "Phase 02 – Provider Abstraction & Routing",
        hours: "20 Hours",
        lessons: [
          "Multi-Provider Strategy",
          "Fallback Systems",
          "Cost-Aware Routing"
        ],
      },
      {
        title: "Phase 03 – Multi-Tenant Platforms",
        hours: "18 Hours",
        lessons: [
          "Tenant Isolation",
          "Access Control",
          "Governance Layers"
        ],
      },
      {
        title: "Phase 04 – Reliability & Cost Control",
        hours: "14 Hours",
        lessons: [
          "Observability Systems",
          "Performance Engineering",
          "FinOps Strategy"
        ],
      },
      {
        title: "Phase 05 – Security & Compliance",
        hours: "16 Hours",
        lessons: [
          "Enterprise Approvals",
          "Auditability",
          "Risk Controls"
        ],
      },
      {
        title: "Capstone – Platform Architecture Defense",
        hours: "12 Hours",
        lessons: [
          "End-to-End Architecture",
          "Tradeoff Analysis",
          "Defense Review"
        ],
      },
    ],
  },
};

const LMS = () => {
  const { programId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [liveSession, setLiveSession] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  
  const [progressMap, setProgressMap] = useState({});
  const [user, setUser] = useState(null);




  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) return navigate("/dashboard");

      setUser(session.user);

      const internalId = PROGRAM_MAP[programId];
      if (!internalId) return navigate("/dashboard");

      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("program_id")
        .eq("user_id", session.user.id)
        .eq("program_id", internalId)
        .single();

      if (!enrollment) return navigate("/dashboard");

      const { data: progress } = await supabase
        .from("lesson_progress")
        .select("lesson_key, completed")
        .eq("user_id", session.user.id)
        .eq("program_id", internalId);

// Fetch next live session
const now = new Date().toISOString();

const { data: sessionData } = await supabase
  .from("live_sessions")
  .select("*")
  .eq("program_id", internalId)
  .eq("is_active", true)
  .gte("session_date", now)
  .order("session_date", { ascending: true })
  .limit(1)
  .single();

if (sessionData) {
  setLiveSession(sessionData);
}

      const map = {};
      progress?.forEach(p => {
        map[p.lesson_key] = p.completed;
      });

      setProgressMap(map);

setLoading(false);
    };

    init();
  }, [programId, navigate]);
  
  // ⬇️ ADD NEW useEffect RIGHT HERE

No.
It’s not okay.

Your second useEffect is broken again. You forgot to close the updateCountdown function.

Right now your structure is:

const updateCountdown = () => {
  ...
  setTimeLeft(...)
  
  updateCountdown();
  const interval = setInterval(...)


See the problem?
You never closed updateCountdown with };

So everything after setTimeLeft(...) is still inside that function.

That’s why build fails.

EXACT FIX — DO THIS

Go to your second useEffect.

Replace the entire block with this:

useEffect(() => {
  if (!liveSession) return;

  const updateCountdown = () => {
    const nowTime = new Date().getTime();
    const sessionTime = new Date(liveSession.session_date).getTime();
    const diff = sessionTime - nowTime;

    if (diff <= 0) {
      setTimeLeft("Live Now");
      return;
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`);
  };   // ← YOU WERE MISSING THIS

  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);

  return () => clearInterval(interval);

}, [liveSession]);  

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading LMS...
      </div>
    );
  }

  const program = LMS_CONTENT[programId];
  const internalId = PROGRAM_MAP[programId];

  const allLessons = program.modules.flatMap((module, mIndex) =>
    module.lessons.map((_, lIndex) => `${mIndex}-${lIndex}`)
  );

  const completedCount = allLessons.filter(key => progressMap[key]).length;
  const progressPercent = Math.round(
    (completedCount / allLessons.length) * 100
  );

  const toggleLesson = async (lessonKey) => {
    const newValue = !progressMap[lessonKey];

    setProgressMap(prev => ({
      ...prev,
      [lessonKey]: newValue,
    }));

    await supabase
      .from("lesson_progress")
      .upsert({
        user_id: user.id,
        program_id: internalId,
        lesson_key: lessonKey,
        completed: newValue,
      });
  };

  return (
    <div className="min-h-screen bg-[#050608] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-3">{program.title}</h1>
        <p className="text-cyan-400 text-sm uppercase tracking-widest mb-6">
          {program.intensity}
        </p>
		
		
		{/* LIVE SESSION CARD */}
{liveSession && (
  <div className="mb-12 p-6 rounded-2xl border border-cyan-500/30 bg-cyan-500/10">
    <h3 className="text-lg font-semibold mb-2">
      Live Session: {liveSession.title}
    </h3>

    <p className="text-sm text-slate-300 mb-4">
      {new Date(liveSession.session_date).toLocaleString()}
    </p>
	
	{timeLeft && (
  <p className="text-cyan-400 text-sm mb-3">
    {timeLeft}
  </p>
)}

    <a
      href={liveSession.zoom_link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-cyan-400 text-black px-4 py-2 rounded font-semibold"
    >
      Join Live Session
    </a>
  </div>
)}

		
        {/* PROGRESS BAR */}
        <div className="mb-12">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-cyan-400 h-3 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-6">
          {program.modules.map((module, mIndex) => (
            <div key={mIndex} className="border border-white/10 rounded-2xl bg-white/[0.02]">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === mIndex ? null : mIndex)
                }
                className="w-full text-left p-6 flex justify-between items-center"
              >
                <span className="font-semibold">{module.title}</span>
                <span className="text-xs text-cyan-400 font-bold">
                  {module.hours}
                </span>
              </button>

              {openIndex === mIndex && (
                <div className="px-6 pb-6 space-y-3 text-sm text-slate-300">
                  {module.lessons.map((lesson, lIndex) => {
                    const lessonKey = `${mIndex}-${lIndex}`;
                    const completed = progressMap[lessonKey];

                    return (
                      <div
                        key={lessonKey}
                        className="flex justify-between items-center border-b border-white/5 pb-2"
                      >
                        <span className={completed ? "text-cyan-400" : ""}>
                          {lesson}
                        </span>

                        <button
                          onClick={() => toggleLesson(lessonKey)}
                          className={`text-xs px-3 py-1 rounded ${
                            completed
                              ? "bg-cyan-400 text-black"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          {completed ? "Completed" : "Mark Complete"}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LMS;
