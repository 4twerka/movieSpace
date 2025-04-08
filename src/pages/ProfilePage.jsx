import React, { useEffect, useState } from "react";
import { auth, db} from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      } else {
        console.log("user is not logged in");
      }
    });
  }
  useEffect(() => {
    fetchUserData();
  }, [])

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.log(error.message);
    }
  }

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      {userDetails ? (
        <div className="max-w-4xl w-full space-y-10 text-center">
        <h1 className="text-5xl font-bold tracking-wide">User Profile</h1>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
          <p className="text-xl font-semibold">Name: {userDetails.firstName}</p>
          <p className="text-xl font-semibold">Surname: {userDetails.lastName}</p>
          <p className="text-md text-gray-400">Age: {userDetails.age}</p>
          <button onClick={handleLogout} className="bg-red-500">Log Out</button>
          {/* <p className="text-md text-gray-400">Favorite Genre: Sci-Fi</p> */}
        </div>
        <div className="w-full">
          <h2 className="text-3xl font-semibold mb-6">Favorite Movies</h2>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {[1, 2, 3, 4].map((id) => (
              <div key={id} className="bg-gray-900 p-4 rounded-xl shadow-md border border-gray-800 hover:bg-gray-800 transition">
                <div className="w-full h-56 bg-gray-800 rounded-lg"></div>
                <p className="mt-3 text-base font-medium truncate">Movie Title {id}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    );
}

export { ProfilePage };