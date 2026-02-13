import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const PROGRAM_MAP = {
  "agentic-ai-systems-engineer": "agentic_ai_engineer",
  "genai-platform-architect": "genai_platform_architect",
  "ai-validation-governance-engineer": "ai_validation_governance",
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

  return (
    <div className="min-h-screen bg-[#050608] text-white p-10">
      <h1 className="text-3xl font-bold mb-8">
        {programId.replaceAll("-", " ")}
      </h1>

      <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
        <h2 className="text-xl font-semibold mb-2">
          Module 1 – Foundations
        </h2>
        <p className="text-slate-400 text-sm">
          LMS placeholder content. Replace with real modules later.
        </p>
      </div>
    </div>
  );
};

export default LMS;
