import React from "react";

function ProfilePage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl w-full space-y-10 text-center">
        <h1 className="text-5xl font-bold tracking-wide">User Profile</h1>
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800">
          <p className="text-xl font-semibold">Name: John</p>
          <p className="text-xl font-semibold">Surname: Doe</p>
          <p className="text-md text-gray-400">Age: 28</p>
          <p className="text-md text-gray-400">Favorite Genre: Sci-Fi</p>
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
    </div>
    );
}

export { ProfilePage }