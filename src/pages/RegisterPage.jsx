import React from "react";
import { Link } from "react-router-dom";

function RegisterPage() {
    return (
        <div className="min-h-screen interFont flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
                <form action="https://httpbin.org/post" method="POST" className="space-y-4">
                    <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                        <input
                            type="text"
                            name="firstName"
                            className="w-full p-3 text-white bg-transparent focus:outline-none"
                            placeholder="First Name"
                            required
                        />
                    </div>
                    <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                        <input
                            type="text"
                            name="lastName"
                            className="w-full p-3 text-white bg-transparent focus:outline-none"
                            placeholder="Last Name"
                            required
                        />
                    </div>
                    <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                        <input
                            type="number"
                            name="age"
                            className="w-full p-3 text-white bg-transparent focus:outline-none"
                            placeholder="Age"
                            required
                            min="7"
                            defaultValue="7"
                        />
                    </div>
                    <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                        <input
                            type="email"
                            name="email"
                            className="w-full p-3 text-white bg-transparent focus:outline-none"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
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
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-400">
                    Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export { RegisterPage };