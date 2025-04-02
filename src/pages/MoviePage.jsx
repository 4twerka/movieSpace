import React from "react";

const MoviePage = () => {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto">
          {/* Назва фільму */}
          <h1 className="text-4xl font-bold mb-2">Interstellar</h1>
          <p className="text-gray-400 mb-4">2014 • Sci-Fi, Adventure • 169 min</p>
  
          {/* Контейнер для відео та інформації */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Відео */}
            <div className="w-full md:w-3/4">
              <div className="aspect-w-16 aspect-h-9 bg-gray-800">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/zSWdZVtXT7E"
                  title="Movie Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
  
            {/* Опис + кнопки */}
            <div className="w-full md:w-1/4 space-y-4">
              <p className="text-gray-300 text-sm">
                A team of explorers travel through a wormhole in space in an
                attempt to ensure humanity's survival.
              </p>
              <p>
                <span className="text-gray-400">Director:</span> Christopher Nolan
              </p>
              <p>
                <span className="text-gray-400">Stars:</span> Matthew McConaughey,
                Anne Hathaway, Jessica Chastain
              </p>
              <p>
                <span className="text-gray-400">IMDB Rating:</span> ⭐ 8.7/10
              </p>
  
              {/* Кнопки */}
              <div className="flex gap-4">
                <button className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-lg">
                  Watch Now
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 transition px-4 py-2 rounded-lg">
                  + Add to Favorites
                </button>
              </div>
            </div>
          </div>
  
          {/* Додаткова інформація */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-3">Movie Details</h2>
            <p className="text-gray-400">
              <strong>Release Date:</strong> November 7, 2014
            </p>
            <p className="text-gray-400">
              <strong>Genres:</strong> Sci-Fi, Drama, Adventure
            </p>
            <p className="text-gray-400">
              <strong>Box Office:</strong> $677 million
            </p>
          </div>
        </div>
      </div>
    );
  };
  
export { MoviePage };
  