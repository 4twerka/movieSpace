import React, { useEffect, useState } from "react";

const API_KEY = "cf8f659d3c2a36f2361a2b1bdc7eefa3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Welcome() {
  const [movies, setMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/search/movie?query=Spider-Man&api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        const firstMovie = data.results[0];

        if (firstMovie) {
          setMovies([firstMovie]);

          const trailerResponse = await fetch(
            `${BASE_URL}/movie/${firstMovie.id}/videos?api_key=${API_KEY}&language=en-US`
          );
          const trailerData = await trailerResponse.json();

          const youtubeTrailer = trailerData.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );

          if (youtubeTrailer) {
            setTrailerKey(youtubeTrailer.key);
          }
        }
      } catch (error) {
        console.error("Error fetching movies or trailer:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="relative pt-7 md:pt-0 bg-black text-white w-full min-h-screen flex flex-col md:flex-row items-center px-6 md:px-20 bg-gradient-to-r from-black to-[#22000c] gap-6">
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bebasFont">FIND MOVIES</h1>
        <h2 className="text-5xl sm:text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 bebasFont">
          CARTOONS AND MORE
        </h2>
        <p className="text-gray-400 mt-4 text-base sm:text-lg md:text-xl interFont">
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...
        </p>
        {trailerKey && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-6 py-2 border border-white text-white rounded flex items-center justify-center mx-auto md:mx-0 interFont hover:bg-white hover:text-black transition"
          >
            ▶ Watch Trailer
          </button>
        )}
      </div>

      <div className="relative w-full md:w-1/2 flex justify-center md:justify-end items-center mt-10 md:mt-0">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`relative md:absolute ${index === 0 ? "z-10" : "z-0 top-10 right-10"}`}
          >
            <img
              src={`${IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg w-48 sm:w-60 md:w-80 hover:scale-105 transition"
            />
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl aspect-video px-4">
            <iframe
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="Trailer"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg shadow-xl"
            ></iframe>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black px-3 py-1 rounded text-lg"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export { Welcome };