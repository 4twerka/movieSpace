import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const API_KEY = "cf8f659d3c2a36f2361a2b1bdc7eefa3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const YOUTUBE_BASE_URL = "https://www.youtube.com/embed/";

const SeriesPage = ({ addFavourites }) => {
  const { id } = useParams();
  const [series, setSeries] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddFavourite = (seriesData) => {
    addFavourites((prev) => {
      const alreadyExists = prev.some((item) => item.id === seriesData.id);
      if (alreadyExists) {
        toast.info("This series is already in your favourites.", { position: "top-center", toastId: seriesData.id });
        return prev;
      } else {
        toast.success("Added to favourites", {
          position: "top-center",
          toastId: seriesData.id,
        });
      }
      return [...prev, seriesData];
    });
  };

  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=en-US`);
        const data = await response.json();
        setSeries(data);

        const videoResponse = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const videoData = await videoResponse.json();

        const officialTrailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (officialTrailer) {
          setTrailer(officialTrailer.key);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  return (
    <div className="min-h-screen interFont bg-black text-white px-4 md:px-8 py-10">
      {isLoading ? (
        <div className="flex justify-center text-5xl text-white items-center">Loading...</div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-3xl md:text-5xl font-bold">{series.name}</h1>
          <p className="text-gray-400 text-lg">
            {series.first_air_date?.slice(0, 4)} • {series.episode_run_time?.[0] || "N/A"} min
          </p>

          <div className="relative w-full pt-[56.25%] bg-gray-800 rounded-lg overflow-hidden">
            {trailer ? (
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`${YOUTUBE_BASE_URL}${trailer}`}
                title="Series Trailer"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="absolute inset-0 flex items-center justify-center text-gray-400 text-lg">No trailer available</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <p className="text-gray-300 text-lg">{series.overview}</p>

              <div className="flex flex-wrap gap-4">
                <a href={series.homepage} className="bg-red-600 hover:bg-red-500 transition px-6 py-3 rounded-lg text-lg">
                  Watch Now
                </a>
                <button
                  onClick={() =>
                    handleAddFavourite({
                      id: series.id,
                      title: series.name,
                      poster_path: series.poster_path,
                    })
                  }
                  className="bg-gray-800 hover:bg-gray-700 transition px-6 py-3 rounded-lg text-lg"
                >
                  + Add to Favorites
                </button>
              </div>
            </div>

            <div className="space-y-3 text-gray-400">
              <p>
                <span className="text-white font-semibold">Genres:</span> {series.genres?.map((g) => g.name).join(", ")}
              </p>
              <p>
                <span className="text-white font-semibold">IMDB Rating:</span> ⭐ {parseInt(series.vote_average)}/10
              </p>
              <p>
                <span className="text-white font-semibold">Seasons:</span> {series.number_of_seasons}
              </p>
              <p>
                <span className="text-white font-semibold">Episodes:</span> {series.number_of_episodes}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SeriesPage };