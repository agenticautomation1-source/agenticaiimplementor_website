import React from "react";
import { useParams } from "react-router-dom";

const VerifyCertificate: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center px-6">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold mb-6">
          Credential Verification
        </h1>

        <div className="mb-6">
          <p className="text-neutral-400">Credential ID</p>
          <p className="text-xl font-semibold text-white">{id}</p>
        </div>

        <div className="mb-6">
          <p className="text-neutral-400">Status</p>
          <p className="text-green-400 font-semibold">Active</p>
        </div>

        <p className="text-neutral-400 text-sm">
          This credential has been issued by Agentic AI Implementors and is currently valid.
        </p>
      </div>
    </div>
  );
};

export default VerifyCertificate;
