import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../components/firebase";
import { toast } from "react-toastify";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged successfully!", { position: "top-center" });
      window.location.href = "/profile";
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-neutral-900 rounded-xl shadow-xl border border-neutral-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center bg-neutral-800 rounded-lg overflow-hidden">
            <span className="px-3 text-neutral-400">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8z" />
                <path fillRule="evenodd" d="M2 18a8 8 0 1116 0H2z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="email"
              name="email"
              className="w-full p-3 text-white bg-transparent focus:outline-none"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center bg-neutral-800 rounded-lg overflow-hidden">
            <span className="px-3 text-neutral-400">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 2a6 6 0 00-6 6v2H3a1 1 0 000 2h1v4a1 1 0 001 1h10a1 1 0 001-1v-4h1a1 1 0 000-2h-1V8a6 6 0 00-6-6z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <input
              type="password"
              name="password"
              className="w-full p-3 text-white bg-transparent focus:outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-base sm:text-lg font-semibold text-white bg-neutral-700 rounded-lg hover:bg-neutral-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-1/4 bg-neutral-600" />
          <span className="text-neutral-400 text-sm">or</span>
          <span className="h-px w-1/4 bg-neutral-600" />
        </div>

        <button
          onClick={() => alert("Google sign-in logic goes here")}
          className="flex items-center justify-center gap-2 w-full py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>

        <p className="text-center text-neutral-400 text-sm sm:text-base">
          Not a member?{" "}
          <Link to="/register" className="text-white hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}

export { LoginPage };