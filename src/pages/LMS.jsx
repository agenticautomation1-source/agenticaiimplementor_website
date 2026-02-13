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
      { title: "Phase 01 – Foundations of Agentic Systems", hours: "12 Hours", desc: "State-aware design, autonomous loops, theory of LLM agency." },
      { title: "Phase 02 – Logic Layer & n8n Orchestration", hours: "24 Hours", desc: "Advanced workflows, API integrations, conditional logic." },
      { title: "Phase 03 – Multi-Agent Architectures", hours: "18 Hours", desc: "Coordination strategies, supervision, CrewAI patterns." },
      { title: "Phase 04 – Memory & Planning Loops", hours: "14 Hours", desc: "Vector memory systems, recursive planning modules." },
      { title: "Phase 05 – Production Hardening & Safety", hours: "12 Hours", desc: "Deterministic execution, governance protocols." },
      { title: "Advanced Module – LangGraph Mastery", hours: "16 Hours", desc: "Complex state machines & custom agent logic." },
    ],
  },

  "ai-validation-governance-engineer": {
    title: "AI Validation & Governance Engineer",
    intensity: "96 Hour Enterprise Validation Track",
    modules: [
      { title: "Phase 01 – Foundations of AI Validation", hours: "12 Hours", desc: "AI failure modes, validation philosophy, enterprise risk surfaces." },
      { title: "Phase 02 – Model, Prompt & Output Testing", hours: "16 Hours", desc: "Deterministic testing, prompt validation, regression testing." },
      { title: "Phase 03 – Bias, Fairness & Hallucination Detection", hours: "14 Hours", desc: "Bias testing, fairness metrics, hallucination detection." },
      { title: "Phase 04 – Human-in-the-Loop Systems", hours: "12 Hours", desc: "Review workflows, escalation paths, approval systems." },
      { title: "Phase 05 – Governance, Auditability & Compliance", hours: "16 Hours", desc: "Audit trails, ISO/SOC2 alignment, regulatory mapping." },
      { title: "Phase 06 – Production Monitoring & Incident Response", hours: "14 Hours", desc: "Drift detection, incident workflows, rollback strategies." },
      { title: "Capstone – Enterprise Governance Framework", hours: "12 Hours", desc: "Design and defend a complete AI governance system." },
    ],
  },

  "genai-platform-architect": {
    title: "GenAI Platform Architect",
    intensity: "96 Hour Enterprise Architecture Track",
    modules: [
      { title: "Phase 01 – Enterprise GenAI Foundations", hours: "16 Hours", desc: "Reference architectures, enterprise constraints." },
      { title: "Phase 02 – Provider Abstraction & Model Routing", hours: "20 Hours", desc: "Multi-provider strategies, fallbacks, cost-aware routing." },
      { title: "Phase 03 – Multi-Tenant GenAI Platforms", hours: "18 Hours", desc: "Tenant isolation, access control, governance layers." },
      { title: "Phase 04 – Reliability, Scaling & Cost Control", hours: "14 Hours", desc: "Observability, performance engineering, FinOps." },
      { title: "Phase 05 – Governance, Security & Compliance", hours: "16 Hours", desc: "Enterprise approvals, auditability, risk controls." },
      { title: "Capstone – Enterprise Platform Architecture Defense", hours: "12 Hours", desc: "End-to-end architecture design & defense." },
    ],
  },
};

const LMS = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        navigate("/dashboard");
        return;
      }

      const internalId = PROGRAM_MAP[programId];
      if (!internalId) {
        navigate("/dashboard");
        return;
      }

      const { data } = await supabase
        .from("enrollments")
        .select("program_id")
        .eq("user_id", session.user.id)
        .eq("program_id", internalId)
        .single();

      if (!data) {
        navigate("/dashboard");
        return;
      }

      setLoading(false);
    };

    checkEnrollment();
  }, [programId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading LMS...
      </div>
    );
  }

  const program = LMS_CONTENT[programId];

  return (
    <div className="min-h-screen bg-[#050608] text-white px-6 py-20">
      <div className="max-w-6xl mx-auto">

        <div className="mb-14">
          <h1 className="text-4xl font-bold mb-3">{program.title}</h1>
          <p className="text-cyan-400 text-sm uppercase tracking-widest">
            {program.intensity}
          </p>
        </div>

        <div className="space-y-8">
          {program.modules.map((module, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.02]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{module.title}</h2>
                <span className="text-xs text-cyan-400 font-bold">
                  {module.hours}
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                {module.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LMS;
