import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

export default function SystemsEngineer() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  const storeLead = async (user: any) => {
    if (!user?.email) return;

    await supabase.from("leads").insert({
      email: user.email,
      provider: user.app_metadata?.provider || "email",
      program: "agentic-ai-systems-engineer",
    });
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session && mounted) {
        setSession(data.session);
        await storeLead(data.session.user);
      }
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session && mounted) {
          setSession(session);
          await storeLead(session.user);
        }
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  // ================= AUTH ACTIONS =================

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          window.location.origin + "/courses/agentic-ai-systems-engineer",
      },
    });
  };

  const signInWithEmail = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setEmailLoading(true);

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo:
          window.location.origin + "/courses/agentic-ai-systems-engineer",
      },
    });

    setEmailLoading(false);
    alert("Check your email for the login link");
  };

  return (
    <main className="bg-[#050608] text-slate-200 font-display">

      {/* ================= HERO ================= */}
      <section className="relative pt-36 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-cyan-500/10 to-transparent blur-[140px]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8">
            Masterstroke <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
              Agentic AI Systems Engineer
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Transition from low-code automation into production-grade agentic AI
            systems designed for real enterprise environments.
          </p>
        </div>
      </section>

      {/* ================= AUTH / ENROLLMENT ================= */}
      <section className="py-28 px-6">
        <div className="max-w-md mx-auto bg-white/[0.04] border border-white/10 rounded-3xl p-12 text-center">

          <h2 className="text-2xl font-bold text-white mb-6">
            {session
              ? "You're signed in"
              : "Sign in to view pricing & syllabus"}
          </h2>

          {!session && (
            <>
              {/* GOOGLE */}
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full mb-4 py-3 rounded-lg bg-white text-black font-bold hover:brightness-95"
              >
                Continue with Google
              </button>

              {/* EMAIL */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg bg-black border border-white/10 text-white mb-4"
              />

              <button
                type="button"
                onClick={signInWithEmail}
                disabled={emailLoading}
                className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg disabled:opacity-60"
              >
                {emailLoading ? "Sending link..." : "Continue with Email"}
              </button>
            </>
          )}

          {session && (
            <div className="mt-6 space-y-4">
              <button
                type="button"
                onClick={() =>
                  window.open(
                    "/syllabus/masterstroke-agentic-ai-systems-engineer.pdf",
                    "_blank"
                  )
                }
                className="w-full py-3 border border-white/20 rounded-lg font-bold"
              >
                Download Syllabus
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/lms/courses/masterstroke-agentic-ai-systems-engineer")
                }
                className="w-full py-3 bg-cyan-400 text-black font-bold rounded-lg"
              >
                Secure Your Spot
              </button>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
