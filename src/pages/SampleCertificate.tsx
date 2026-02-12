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
    <div className="min-h-screen bg-neutral-950 text-white py-16 px-6">
      {/* Header Section */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Industry-Grade Digital Credential
        </h1>
        <p className="text-neutral-400 max-w-2xl mx-auto">
          Official recognition for mastery in Agentic AI systems architecture,
          governance, and autonomous workflow implementation.
        </p>
      </div>

      {/* Certificate Card */}
      <div className="max-w-5xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-12 shadow-2xl relative">
        {/* Sample Watermark */}
        <div className="absolute top-6 right-6 text-xs text-neutral-500 tracking-widest">
          SAMPLE CREDENTIAL — DEMONSTRATION ONLY
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-2">
            Agentic AI Implementor Certification
          </h2>
          <p className="text-neutral-400">
            This certifies that
          </p>
        </div>

        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold tracking-wide">
            Alexander Vance
          </h3>
        </div>

        <div className="text-center mb-10 text-neutral-300">
          has successfully demonstrated architectural mastery in autonomous AI
          system deployment, governance frameworks, and advanced workflow orchestration.
        </div>

        {/* Metadata Section */}
        <div className="grid md:grid-cols-3 gap-6 text-sm text-neutral-400 mt-12">
          <div>
            <p className="text-neutral-500">Credential ID</p>
            <p className="font-medium text-white">AGENT-AI-9928-VX</p>
          </div>
          <div>
            <p className="text-neutral-500">Issue Date</p>
            <p className="font-medium text-white">February 2026</p>
          </div>
          <div>
            <p className="text-neutral-500">Status</p>
            <p className="font-medium text-green-400">Active</p>
          </div>
        </div>

        {/* QR + Verification */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="bg-white p-3 rounded-lg">
            {qrCode && (
              <img
                src={qrCode}
                alt="QR Code"
                width={120}
                height={120}
              />
            )}
          </div>

          <div className="text-sm text-neutral-400 text-center md:text-left">
            <p className="mb-2 text-white font-medium">
              Public Verification
            </p>
            <p>
              Scan the QR code or visit:
            </p>
            <p className="text-blue-400 break-all mt-1">
              {verificationUrl}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto text-center mt-20">
        <h3 className="text-2xl font-semibold mb-6">
          Earn Your Credential
        </h3>
        <Link
          to="/apply"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-lg font-medium"
        >
          Apply for Certification
        </Link>
      </div>
    </div>
  );
};

export default SampleCertificate;
