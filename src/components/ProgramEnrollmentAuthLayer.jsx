import { supabase } from "../lib/supabaseClient";

export default function ProgramEnrollmentAuthLayer({ redirectPath }) {
  const signInWithGoogle = async () => {
    console.log("Google CTA clicked");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + redirectPath,
      },
    });

    if (error) {
      console.error("Google auth error:", error.message);
      alert(error.message);
    }
  };

  const signInWithEmail = async () => {
    const email = prompt("Enter email");
    if (!email) return;

    console.log("Email CTA clicked");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin + redirectPath,
      },
    });

    if (error) {
      console.error("Email auth error:", error.message);
      alert(error.message);
    } else {
      alert("Check your email for login link");
    }
  };

  return (
    <div
      className="relative z-[9999] pointer-events-auto"
      style={{
        background: "#020203",
        borderRadius: "16px",
        padding: "32px",
      }}
    >
      <button
        onClick={signInWithGoogle}
        className="w-full mb-4 py-3 bg-white text-black font-bold rounded-lg"
      >
        Continue with Google
      </button>

      <button
        onClick={signInWithEmail}
        className="w-full py-3 bg-cyan-500 text-black font-bold rounded-lg"
      >
        Continue with Email
      </button>
    </div>
  );
}
