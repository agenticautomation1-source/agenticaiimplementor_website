import { supabase } from "../lib/supabaseClient";

export default function TestAuth() {
  const signInWithGoogle = async () => {
    console.log("Google CTA clicked");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/test-auth",
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
        emailRedirectTo: window.location.origin + "/test-auth",
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
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        background: "#020203",
        color: "white",
        fontFamily: "system-ui",
      }}
    >
      <h1>TEST AUTH PAGE</h1>

      <button
        onClick={signInWithGoogle}
        style={{
          padding: "16px 32px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Continue with Google
      </button>

      <button
        onClick={signInWithEmail}
        style={{
          padding: "16px 32px",
          fontSize: "18px",
          cursor: "pointer",
        }}
      >
        Continue with Email
      </button>
    </div>
  );
}
