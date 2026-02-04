import React, { useState } from "react";
import Navbar from "../components/Navbar";

const Contact: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
body: JSON.stringify({
  full_name: name,
  email,
  inquiry_type: inquiryType,
  message,
}),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setInquiryType("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100">
      <Navbar isLoggedIn={false} onLogin={() => {}} />

      <main className="pt-32 pb-24">
        <div className="max-w-[900px] mx-auto px-6">
          {/* ================= HEADER ================= */}
          <div className="mb-16">
            <h1 className="text-white text-4xl md:text-5xl font-bold font-display mb-4">
              Contact Us
            </h1>

            <p className="text-slate-400 text-sm">
              We respond within 1–2 business days.
            </p>

            <p className="mt-8 text-slate-300 leading-relaxed max-w-2xl">
              Have questions about{" "}
              <span className="text-white font-semibold">Masterstroke</span>,
              enterprise training, agentic AI systems, or partnerships?
              Reach out with clear context and our team will respond promptly.
            </p>
          </div>

          {/* ================= CONTACT GRID ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* ===== LEFT: CONTACT INFO ===== */}
            <div className="space-y-8">
              <div>
                <h2 className="text-white text-xl font-bold font-display mb-3">
                  Program & Enrollment
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Questions about curriculum, cohort timelines, prerequisites,
                  or learning outcomes.
                </p>
                <p className="mt-3 text-slate-300 text-sm">
                  Email:{" "}
                  <a
                    href="mailto:contact@agenticaiimplementors.com"
                    className="text-primary font-semibold hover:underline"
                  >
                    contact@agenticaiimplementors.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-white text-xl font-bold font-display mb-3">
                  Enterprise & Partnerships
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Corporate training, internal upskilling, or custom agentic AI
                  system design engagements.
                </p>
                <p className="mt-3 text-slate-300 text-sm">
                  Email:{" "}
                  <a
                    href="mailto:enterprise@agenticaiimplementors.com"
                    className="text-primary font-semibold hover:underline"
                  >
                    enterprise@agenticaiimplementors.com
                  </a>
                </p>
              </div>

              <div>
                <h2 className="text-white text-xl font-bold font-display mb-3">
                  Legal & Compliance
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Terms, policies, compliance, or legal clarifications.
                </p>
                <p className="mt-3 text-slate-300 text-sm">
                  Email:{" "}
                  <a
                    href="mailto:legal@agenticaiimplementors.com"
                    className="text-primary font-semibold hover:underline"
                  >
                    legal@agenticaiimplementors.com
                  </a>
                </p>
              </div>
            </div>

      {/* ===== RIGHT: CONTACT FORM ===== */}
<div className="bg-white/5 border border-white/10 rounded-2xl p-8">
  <h2 className="text-white text-xl font-bold font-display mb-6">
    Send a Message
  </h2>

  <form className="space-y-6" onSubmit={handleSubmit}>
    <div>
      <label className="block text-slate-400 text-sm mb-2">
        Full Name
      </label>
      <input
        type="text"
        name="full_name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-slate-100 focus:outline-none focus:border-primary"
      />
    </div>

    <div>
      <label className="block text-slate-400 text-sm mb-2">
        Email Address
      </label>
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-slate-100 focus:outline-none focus:border-primary"
      />
    </div>

    <div>
      <label className="block text-slate-400 text-sm mb-2">
        Inquiry Type
      </label>
      <select
        name="inquiry_type"
        required
        value={inquiryType}
        onChange={(e) => setInquiryType(e.target.value)}
        className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-slate-100 focus:outline-none focus:border-primary"
      >
        <option value="">Select one</option>
        <option>Program / Enrollment</option>
        <option>Enterprise / Corporate Training</option>
        <option>Partnerships</option>
        <option>Legal / Policy</option>
        <option>General</option>
      </select>
    </div>

    <div>
      <label className="block text-slate-400 text-sm mb-2">
        Message
      </label>
      <textarea
        name="message"
        rows={5}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full rounded-lg bg-background-dark border border-white/10 px-4 py-3 text-slate-100 focus:outline-none focus:border-primary resize-none"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-primary text-white font-bold py-4 rounded-xl glow-accent hover:brightness-110 transition-all uppercase tracking-widest text-sm disabled:opacity-50"
    >
      {loading ? "Submitting..." : "Submit Request"}
    </button>

    {status === "success" && (
      <p className="text-green-400 text-sm text-center">
        Message sent successfully.
      </p>
    )}

    {status === "error" && (
      <p className="text-red-400 text-sm text-center">
        Something went wrong. Please try again.
      </p>
    )}

    <p className="text-slate-500 text-xs text-center">
      Please avoid sharing sensitive credentials or confidential
      data.
    </p>
  </form>
</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
