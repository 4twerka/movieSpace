import React, { useEffect, useState } from "react";

const API_KEY = "cf8f659d3c2a36f2361a2b1bdc7eefa3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Welcome() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const spiderManResponse = fetch(
          `${BASE_URL}/search/movie?query=Spider-Man&api_key=${API_KEY}&language=en-US`
        );

        const [spiderManData] = await Promise.all([
          (await spiderManResponse).json(),
        ]);

        setMovies([
          spiderManData.results[0],
        ]);
      } catch (error) {
        console.error("Error fetching movies:", error);
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
        <button className="mt-6 px-6 py-2 border border-white text-white rounded flex items-center justify-center mx-auto md:mx-0 interFont hover:bg-white hover:text-black transition">
          ▶ Watch Trailer
        </button>
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
    </div>
  );
}

export { Welcome };