import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function ProgramEnrollment({
  programSlug = "agentic-ai-systems-engineer",
}) {
  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // ================= EMAIL LOGIN =================
  const signInWithEmail = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    setEmailLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setEmailLoading(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for the login link");
    }
  };

  // ================= GOOGLE LOGIN =================
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error("Google OAuth error:", error.message);
      alert(error.message);
    }
  };

  return (
    <section className="relative z-10 py-32 px-6 text-center pointer-events-auto">
      <h2 className="text-5xl font-bold mb-10 text-white">
        Program Enrollment
      </h2>

      <div className="relative z-20 max-w-md mx-auto bg-white/[0.04] border border-white/10 rounded-3xl p-12 backdrop-blur-xl pointer-events-auto">

        <div className="text-cyan-400 uppercase tracking-widest text-xs font-bold mb-4">
          Pricing and Content Details
        </div>

        <div className="text-2xl font-semibold text-slate-300 mb-6">
          Sign in to view pricing and download the syllabus
        </div>

        <ul className="text-left space-y-3 text-slate-400 mb-8 text-sm">
          <li>• Core transition track + advanced modules</li>
          <li>• Hands-on labs with production templates</li>
          <li>• Enterprise-grade system patterns</li>
          <li>• Certification of completion</li>
        </ul>

        {/* GOOGLE SIGN-IN */}
        <div className="mb-6 pointer-events-auto">
          <button
            type="button"
            onClick={signInWithGoogle}
            className="w-full py-3 rounded-lg bg-white text-black font-bold
                       flex items-center justify-center gap-3
                       hover:bg-gray-100 transition pointer-events-auto"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.73 1.23 9.24 3.26l6.91-6.91C35.82 1.77 30.28 0 24 0 14.64 0 6.56 5.39 2.62 13.22l8.39 6.52C13.07 13.09 18.1 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.43-4.74H24v9h12.65c-.55 2.97-2.2 5.49-4.65 7.18l7.11 5.52C43.94 36.84 46.5 30.95 46.5 24z"/>
              <path fill="#FBBC05" d="M11.01 28.74c-.48-1.44-.75-2.97-.75-4.74s.27-3.3.75-4.74l-8.39-6.52C.93 16.1 0 19.95 0 24s.93 7.9 2.62 11.26l8.39-6.52z"/>
              <path fill="#34A853" d="M24 48c6.28 0 11.82-2.07 15.76-5.61l-7.11-5.52c-1.97 1.33-4.49 2.12-8.65 2.12-5.9 0-10.93-3.59-12.99-8.74l-8.39 6.52C6.56 42.61 14.64 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* EMAIL LOGIN */}
        <div className="border-t border-white/10 pt-6 pointer-events-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-black border border-white/10
                       text-white mb-4 focus:outline-none focus:border-cyan-400 pointer-events-auto"
          />

          <button
            type="button"
            onClick={signInWithEmail}
            disabled={emailLoading}
            className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg
                       hover:brightness-110 disabled:opacity-60 transition pointer-events-auto"
          >
            {emailLoading ? "Sending link..." : "Continue with Email"}
          </button>
        </div>

      </div>
    </section>
  );
}
