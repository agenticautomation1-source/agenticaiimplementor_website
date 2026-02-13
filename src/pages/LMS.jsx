import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const LMS = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkEnrollment = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate("/dashboard");
        return;
      }

      const { data } = await supabase
        .from("enrollments")
        .select("program_id")
        .eq("user_id", session.user.id)
        .eq("program_id", programId)
        .single();

      if (!data) {
        navigate("/dashboard");
        return;
      }

      setLoading(false);
    };

    checkEnrollment();
  }, [programId, navigate]);

  if (loading) return <div className="p-10 text-white">Loading LMS...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-semibold mb-6">
        LMS – {programId}
      </h1>

      <div className="space-y-4">
        <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
          <h2 cl
