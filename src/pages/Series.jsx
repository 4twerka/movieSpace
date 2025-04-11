import React, { useEffect, useState } from "react";

const API_KEY = "cf8f659d3c2a36f2361a2b1bdc7eefa3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Series() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWithDetails = async (endpoint) => {
    const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();

    return Promise.all(
      data.results.map(async (item) => {
        const detailsRes = await fetch(`${BASE_URL}/tv/${item.id}?api_key=${API_KEY}&language=en-US`);
        const details = await detailsRes.json();
        return { ...item, genres: details.genres || [] };
      })
    );
  };

  useEffect(() => {
    const fetchAllSeries = async () => {
      setIsLoading(true);
      try {
        const [popularData, topRatedData, onTheAirData] = await Promise.all([
          fetchWithDetails("/tv/popular"),
          fetchWithDetails("/tv/top_rated"),
          fetchWithDetails("/tv/on_the_air"),
        ]);
        setPopular(popularData);
        setTopRated(topRatedData);
        setOnTheAir(onTheAirData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllSeries();
  }, []);

  const renderSection = (title, items) => (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl bebasFont font-semibold">{title}</h2>
        <button className="text-gray-400 hover:text-white">See More</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {items.map((item) => (
          <div key={item.id} className="space-y-2 cursor-pointer interFont">
            <div className="w-full rounded-lg overflow-hidden">
              <img
                className="w-full h-auto object-cover"
                src={`${IMAGE_BASE_URL}${item.poster_path}`}
                alt={item.name}
              />
            </div>
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-xs text-gray-400">
              {new Date(item.first_air_date).getFullYear()}{" "}
              <span className="text-red-500"> • </span>{" "}
              {item.genres.map((g) => g.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen text-white px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-400 text-lg">Loading...</p>
        ) : (
          <>
            {renderSection("TOP RATED", topRated)}
            {renderSection("ON THE AIR", onTheAir)}
            {renderSection("POPULAR", popular)}
          </>
        )}
      </div>
    </div>
  );
}

export { Series };