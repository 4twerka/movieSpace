import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function GoogleLogin() {
  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (!user) return;

      const userRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          email: user.email || "",
          firstName: user.displayName || "",
          photo: user.photoURL || "",
          lastName: "",
          age: ""
        });
      }

      toast.success("User logged in", { position: "top-left" });
      window.location.href = "/profile";
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Login failed");
    }
  }

  return (
    <button
      onClick={googleLogin}
      className="flex items-center justify-center gap-2 w-full py-3 text-white bg-white/10 hover:bg-white/20 rounded-lg transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
}

export { GoogleLogin };