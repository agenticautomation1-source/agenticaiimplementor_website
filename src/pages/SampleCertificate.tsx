import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Link } from "react-router-dom";

const SampleCertificate: React.FC = () => {
  const verificationUrl =
    "https://www.agenticaiimplementors.com/verify/AGENT-AI-9928-VX";

  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    QRCode.toDataURL(verificationUrl)
      .then(setQrCode)
      .catch(console.error);
  }, [verificationUrl]);

  return (
    <div className="min-h-screen bg-[#071A18] text-white py-20 px-6">
      
      {/* PAGE TITLE */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-semibold tracking-tight">
          Secure Credential View
        </h1>
        <p className="text-sm text-emerald-300 mt-2 tracking-wider">
          ID: AGENT-AI-9928-VX | Verified on Ethereum Mainnet
        </p>
      </div>

      {/* CERTIFICATE CONTAINER */}
      <div className="max-w-6xl mx-auto rounded-2xl overflow-hidden border border-emerald-900 shadow-2xl">

        {/* GRADIENT SPLIT BACKGROUND */}
        <div className="relative bg-gradient-to-br from-[#0b2c28] via-[#102f2a] to-[#1a332f] p-14">

          {/* LEFT ACCENT BAR */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>

          {/* SAMPLE WATERMARK */}
          <div className="absolute top-6 right-8 text-xs tracking-widest text-emerald-200 opacity-50">
            MASTERSTROKE
          </div>

          {/* HEADER */}
          <div className="mb-14">
            <p className="text-xs tracking-[0.4em] text-emerald-400 mb-2">
              SECURITY CLEARANCE LEVEL 4
            </p>
            <p className="text-sm tracking-[0.3em] text-emerald-200">
              CERTIFICATE OF ARCHITECTURAL MASTERY
            </p>
          </div>

          {/* MAIN CONTENT */}
          <div className="text-center mb-14">
            <p className="text-sm text-emerald-200 tracking-widest mb-6">
              THIS DIGITAL RECORD CONFIRMS THE ACHIEVEMENT OF
            </p>

            <h2 className="text-6xl md:text-7xl font-extrabold tracking-[0.15em] mb-6">
              ALEXANDER VANCE
            </h2>

            <div className="w-24 h-[2px] bg-emerald-400 mx-auto mb-8"></div>

            <p className="text-lg text-emerald-100">
              Systems Engineer: Governance & Autonomous Systems
            </p>

            <p className="text-sm text-emerald-300 mt-4 max-w-2xl mx-auto">
              Validated through the Agentic AI Framework for excellence in large-scale 
              autonomous deployment and ethical governance protocols.
            </p>
          </div>

          {/* FOOTER ROW */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">

            {/* LEFT META */}
            <div className="flex flex-col gap-6 text-sm text-emerald-200">
              <div>
                <p className="uppercase tracking-widest text-xs text-emerald-400">
                  Issue Date
                </p>
                <p>October 24, 2023</p>
              </div>

              <div>
                <p className="uppercase tracking-widest text-xs text-emerald-400">
                  Architect Signature
                </p>
                <p className="italic">S. Sterling</p>
              </div>
            </div>

            {/* RIGHT QR */}
            <div className="bg-[#0f2421] border border-emerald-800 rounded-xl p-6 flex items-center gap-6">
              {qrCode && (
                <img
                  src={qrCode}
                  alt="QR Code"
                  width={90}
                  height={90}
                  className="bg-white p-2 rounded"
                />
              )}
              <div className="text-xs text-emerald-300">
                <p className="text-emerald-400 font-semibold mb-2">
                  SECURE PROTOCOL
                </p>
                <p>Scan to verify</p>
                <p>on-chain identity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER DETAILS SECTION */}
      <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-2 gap-8">

        {/* DETAILS CARD */}
        <div className="bg-[#0f2421] border border-emerald-900 rounded-xl p-8">
          <h3 className="text-emerald-400 font-semibold mb-6">
            Credential Details
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-emerald-300">Status</span>
              <span className="text-emerald-400 font-medium">
                Active / Verified
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">Track</span>
              <span>Systems Engineer – Lvl 4</span>
            </div>
            <div className="flex justify-between">
              <span className="text-emerald-300">Blockchain Hash</span>
              <span>0x71C...4e1F</span>
            </div>
          </div>
        </div>

        {/* DOWNLOAD CARD */}
        <div className="bg-[#0f2421] border border-emerald-900 rounded-xl p-8">
          <h3 className="text-emerald-400 font-semibold mb-6">
            Download Options
          </h3>

          <p className="text-sm text-emerald-300 mb-8">
            Export high-resolution secure PDF with metadata for LinkedIn and professional portfolios.
          </p>

          <button className="w-full bg-emerald-400 text-[#06221f] font-semibold py-3 rounded-lg hover:brightness-110 transition">
            Download PDF Credential
          </button>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-20">
        <Link
          to="/"
          className="text-emerald-400 hover:text-white transition text-sm tracking-widest uppercase"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SampleCertificate;
