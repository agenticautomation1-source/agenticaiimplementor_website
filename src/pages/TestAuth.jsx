import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function TestAuth() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Check current session on load
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    console.log("Google CTA clicked");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // Corrected to include the hash for your routing system
        redirectTo: window.location.origin + "/#/test-auth",
      },
    });

    if (error) {
      console.error("Google auth error:", error.message);
      alert(error.message);
    }
  };

  const signInWithEmail = async () => {
    const email = prompt("Enter email for Magic Link test");

    if (!email) return;

    console.log("Email CTA clicked");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // Corrected to include the hash for your routing system
        emailRedirectTo: window.location.origin + "/#/test-auth",
      },
    });

    if (error) {
      console.error("Email auth error:", error.message);
      alert(error.message);
    } else {
      alert("Check your email for login link!");
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    alert("Signed out");
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
        fontFamily: "system-ui, sans-serif",
        padding: "20px",
        textAlign: "center"
      }}
    >
      <h1 style={{ letterSpacing: "-0.02em", marginBottom: "0" }}>TEST AUTH PAGE</h1>
      <p style={{ color: "#666", marginTop: "0" }}>Diagnostic tool for Supabase session stabilization</p>

      <div style={{ 
        background: "#0A0A0C", 
        padding: "20px", 
        borderRadius: "12px", 
        border: "1px solid #1A1A1C",
        width: "100%",
        maxWdith: "400px",
        marginBottom: "20px"
      }}>
        <p style={{ fontSize: "12px", color: "#888", marginBottom: "10px", textTransform: "uppercase" }}>Current Session Status</p>
        {loading ? (
          <p>Loading session...</p>
        ) : session ? (
          <div style={{ textAlign: "left" }}>
            <p style={{ color: "#22d3ee", fontWeight: "bold" }}>✅ Logged In</p>
            <p style={{ fontSize: "13px" }}>Email: {session.user.email}</p>
            <button onClick={handleSignOut} style={{ marginTop: "10px", color: "#ff4444", background: "none", border: "1px solid #ff4444", padding: "5px 10px", cursor: "pointer", borderRadius: "4px" }}>Sign Out</button>
          </div>
        ) : (
          <p style={{ color: "#ff4444" }}>❌ No Active Session</p>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={signInWithGoogle}
          style={{
            padding: "16px 32px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "8px"
          }}
        >
          Test Google OAuth
        </button>

        <button
          onClick={signInWithEmail}
          style={{
            padding: "16px 32px",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            backgroundColor: "#1A1A1C",
            color: "white",
            border: "1px solid #333",
            borderRadius: "8px"
          }}
        >
          Test Magic Link
        </button>
      </div>

      {session && (
        <div style={{ marginTop: "40px", width: "100%", maxWidth: "600px" }}>
          <p style={{ fontSize: "12px", color: "#444" }}>Debug Metadata:</p>
          <pre style={{ 
            textAlign: "left", 
            fontSize: "10px", 
            background: "#000", 
            padding: "15px", 
            borderRadius: "8px", 
            overflow: "auto",
            border: "1px solid #111"
          }}>
            {JSON.stringify(session.user, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}