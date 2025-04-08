import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_KEY = "cf8f659d3c2a36f2361a2b1bdc7eefa3";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function Recommend() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`);
                const result = await response.json();

                const moviesWithRuntime = await Promise.all(
                    result.results.map(async (movie) => {
                        const detailsResponse = await fetch(`${BASE_URL}/movie/${movie.id}?api_key=${API_KEY}&language=un-US`);
                        const details = await detailsResponse.json();
                        return { ...movie, runtime: details.runtime || "N/A" };
                    })
                );

                setMovies(moviesWithRuntime);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const moviesToShow = showAll ? movies : movies.slice(0, 12);

    return (
        <div className="bg-black flex justify-center items-center min-h-screen px-4 py-8">
            <div className="w-full max-w-6xl text-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl bebasFont font-semibold flex items-center gap-2">
                        YOU MAY LIKE THIS
                    </h2>
                    {showAll ? (<button onClick={() => setShowAll(!showAll)} className="text-red-500 hover:text-white">Close</button>)
                     : (<button onClick={() => setShowAll(!showAll)} className="text-gray-400 hover:text-white">See More</button>)}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {isLoading ? (
                        <div className="flex justify-center text-5xl text-white items-center">Loading...</div>
                    ) : (
                        moviesToShow.map((movie) => (
                            <Link key={movie.id} to={`/movie/${movie.id}`}>
                                <div className="space-y-2 cursor-pointer interFont">
                                    <div className="w-full rounded-lg overflow-hidden">
                                        <img 
                                            className="w-full h-auto object-cover" 
                                            src={`${IMAGE_BASE_URL}${movie.poster_path}`} 
                                            alt={movie.title} 
                                        />
                                    </div>
                                    <p className="text-sm font-medium truncate">{movie.title}</p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(movie.release_date).getFullYear()} 
                                        <span className="text-red-500"> &#8226; </span> 
                                        {movie.runtime} min
                                    </p>
                                </div>
                            </Link>
                        ))
                )}
                </div>
            </div>
        </div>
    );
}

export { Recommend };