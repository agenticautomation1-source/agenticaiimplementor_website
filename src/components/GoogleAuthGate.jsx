import { GoogleLogin } from "@react-oauth/google";

export default function GoogleAuthGate({ onSuccess }) {
  return (
    <div className="mt-6 border border-white/10 rounded-2xl p-6 bg-white/5">
      <p className="text-slate-400 text-sm mb-4">
         AUTH GATE TEST — IF YOU SEE THIS, FILE IS USED Sign in to view pricing and download the syllabus.
      </p>

      <div className="flex flex-col gap-4">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            onSuccess(credentialResponse);
          }}
          onError={() => {
            alert("Google sign-in failed. Please try again.");
          }}
          useOneTap={false}
        />

        <a
          href="/lms/wp-login.php"
          className="text-sm text-sky-400 hover:underline text-center"
        >
          Continue with Email instead
        </a>
      </div>
    </div>
  );
}
