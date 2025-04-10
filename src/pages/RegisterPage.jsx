import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../components/firebase";
import { setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName,
          lastName,
          age,
        });
      }
      toast.success("User registered successfully!", { position: "top-center" });
      window.location.href = "/profile";
    } catch (error) {
      toast.error(error.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-6 sm:p-8 space-y-6 bg-neutral-900 rounded-xl shadow-xl border border-neutral-800">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-white">Sign Up</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex items-center bg-neutral-800 rounded-lg overflow-hidden">
            <input
              type="text"
              name="firstName"
              className="w-full p-3 text-white bg-transparent focus:outline-none"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center bg-neutral-800 rounded-lg overflow-hidden">
            <input
              type="text"
              name="lastName"
              className="w-full p-3 text-white bg-transparent focus:outline-none"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center bg-neutral-800 rounded-lg overflow-hidden">
            <input
              type="number"
              name="age"
              className="w-full p-3 text-white bg-transparent focus:outline-none"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              min="7"
            />
          </div>
          <div className="flex items-center bg-neutral-800 rounded-lg overflow-hidden">
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
            Sign Up
          </button>
        </form>

        <div className="flex items-center justify-center gap-2">
          <span className="h-px w-1/4 bg-neutral-600" />
          <span className="text-neutral-400 text-sm">or</span>
          <span className="h-px w-1/4 bg-neutral-600" />
        </div>

        <button
          className="flex items-center justify-center gap-2 w-full py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-neutral-400 text-sm sm:text-base">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export { RegisterPage };