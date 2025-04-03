import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
    return (
        <div className="min-h-screen interFont flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-white">Sign In</h2>
        <form action="https://httpbin.org/post" method="POST" className="space-y-4">
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
            <span className="px-3 text-gray-400">
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
              required
            />
          </div>
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
            <span className="px-3 text-gray-400">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v2H3a1 1 0 000 2h1v4a1 1 0 001 1h10a1 1 0 001-1v-4h1a1 1 0 000-2h-1V8a6 6 0 00-6-6z" clipRule="evenodd" />
              </svg>
            </span>
            <input
              type="password"
              name="password"
              className="w-full p-3 text-white bg-transparent focus:outline-none"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white bg-pink-600 rounded-lg hover:bg-pink-500 transition"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-gray-400">
          Not a member? <Link to="/register" className="text-pink-500 hover:underline">Sign up now</Link>
        </p>
      </div>
    </div>
    );
}

export { LoginPage };