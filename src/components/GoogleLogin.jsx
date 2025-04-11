import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc } from "firebase/firestore";

function GoogleLogin() {
    function googleLogin() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then(async(result) => {
        const user = result.user;
        if (result.user) {
           await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstName: user.displayName,
                    photo: user.photoURL,
                    lastName: "",
                    age: ""
                  });
          toast.success("User logged in", {position: "top-left"});
          window.location.href = "/profile";
        }
      });
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