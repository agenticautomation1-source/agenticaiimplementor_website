import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AIValidationGovernanceEngineer() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ================= EMAIL STATE =================
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= GOOGLE SIGN-IN =================
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
    } catch (err) {
      console.error("Google sign-in error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= EMAIL OTP SIGN-IN =================
  const signInWithEmail = async () => {
    if (!email) return;

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Email sign-in error:", error);
      }
    } catch (err) {
      console.error("Email sign-in exception:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#050608] text-slate-200 font-display">
      {/* ================= HERO ================= */}
      <section className="relative pt-40 pb-32 px-6 lg:px-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-red-600/10 to-transparent blur-[160px]" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="inline-block mb-6 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-500/30 text-red-400 bg-red-500/5">
            Enrollment Open
          </span>

          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white mb-8">
            Masterstroke – AI Validation &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-500">
              Governance Engineer
            </span>
          </h1>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12">
            Build AI systems that are safe, auditable, compliant, and trusted in
            enterprise environments.
          </p>

          {/* ================= AUTH CTA ================= */}
          <div className="flex flex-col items-center gap-4 justify-center">
            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="px-10 py-4 bg-red-500 text-black font-bold uppercase tracking-widest text-sm rounded-lg hover:brightness-110 disabled:opacity-60"
            >
              Continue with Google
            </button>

            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-black/40 border border-white/20 rounded-lg text-sm text-white focus:outline-none"
              />
              <button
                onClick={signInWithEmail}
                disabled={loading}
                className="px-6 py-3 border border-white/20 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-white/5 disabled:opacity-60"
              >
                Email Login
              </button>
            </div>

            <button className="px-10 py-4 border border-white/15 text-white font-bold uppercase tracking-widest text-sm rounded-lg hover:bg-white/5">
              Download Syllabus
            </button>
          </div>
        </div>
      </section>

      {/* ================= WHO THIS PROGRAM IS FOR ================= */}
      <section className="py-28 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 text-center">
            Who This Program Is For
          </p>
          <h2 className="text-4xl font-bold text-white text-center mb-20">
            For engineers who control AI risk
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: "shield_lock",
                title: "AI Risk & Compliance Teams",
                points: [
                  "Governance frameworks",
                  "Risk assessment protocols",
                  "Regulatory readiness",
                ],
              },
              {
                icon: "task_alt",
                title: "AI & ML Engineers",
                points: [
                  "Hardened production systems",
                  "Automated audit pipelines",
                  "Adversarial testing",
                ],
              },
              {
                icon: "gavel",
                title: "Enterprise & Policy Leaders",
                points: [
                  "Safety guardrails",
                  "Strategic approval flows",
                  "Ethics board integration",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="relative rounded-2xl border border-red-500/30 bg-white/[0.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,0,0,0.28),transparent_65%)]" />
                <div className="relative p-10 text-center">
                  <span className="material-symbols-outlined text-5xl text-red-500 mb-6">
                    {card.icon}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <ul className="text-sm text-slate-400 space-y-2">
                    {card.points.map((p) => (
                      <li key={p}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
