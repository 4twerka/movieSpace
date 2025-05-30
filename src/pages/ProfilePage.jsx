import React, { useEffect, useState } from "react";
import { auth, db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ProfilePage({ favourites, addFavourites }) {
  const [userDetails, setUserDetails] = useState(null);

  const handleDeleteAll = () => {
    addFavourites([]);
    toast.info("All movies have been removed", { position: "top-center" });
  };

  const handleDelete = (movieData) => {
    const updated = favourites.filter((item) => item.id !== movieData.id);
    addFavourites(updated);
    toast.info("Movie has been removed", { position: "top-center" });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserDetails(docSnap.data());
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userDetails?.photo) {
      console.log("userDetails.photo:", userDetails.photo);
    }
  }, [userDetails]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = "/login";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      {userDetails ? (
        <div className="max-w-5xl w-full space-y-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">User Profile</h1>
          <div className="bg-[#111] p-10 rounded-3xl shadow-2xl border border-gray-800">
            <div className="flex justify-center">
              <img
                src={userDetails.photo}
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border-4 border-neutral-700"
              />
            </div>
            <p className="text-2xl font-semibold mt-4">
              👤 {userDetails.firstName} {userDetails.lastName}
            </p>
            <button
              onClick={handleLogout}
              className="mt-6 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg font-semibold shadow-lg hover:scale-105 transition duration-300"
            >
              🔒 Log Out
            </button>
          </div>

          <div className="w-full text-left">
            <h2 className="text-3xl font-semibold mb-6">🎬 Favorite Movies</h2>
            {favourites.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="mb-6 px-5 py-2 rounded-full bg-gradient-to-r from-red-700 to-pink-600 text-white text-sm font-semibold shadow-md hover:scale-105 transition duration-300"
              >
                🗑️ Remove All
              </button>
            )}
            {favourites.length > 0 ? (
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
                {favourites.map((item) => (
                  <div
                    key={item.id}
                    className="bg-[#1a1a1a] p-4 rounded-xl shadow-lg border border-gray-700 hover:bg-[#222] transition"
                  >
                    {item.poster_path ? (
                      <Link to={`/movie/${item.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                          alt={item.title}
                          className="w-full h-56 object-cover rounded-lg mb-3"
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-56 bg-gray-800 rounded-lg mb-3 flex items-center justify-center text-gray-500 text-sm">
                        No image
                      </div>
                    )}
                    <p className="text-base font-medium truncate">{item.title}</p>
                    <button
                      onClick={() => handleDelete(item)}
                      className="mt-3 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-semibold shadow-md hover:scale-105 transition duration-300"
                    >
                      ❌ Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-lg">No favorite movies yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
}

export { ProfilePage };