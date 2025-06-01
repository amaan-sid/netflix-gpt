import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { API_KEY } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const NowPlaying = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNowPlayingMovies = async () => {
    setFadeIn(false);
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      setMovies( data.results);
      setTimeout(() => setFadeIn(true), 50);
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlayingMovies();
  }, [page]);

  

  return (
    <>
      <Navbar />
      <div className="px-40 pt-4 text-white">
        <h2 className="text-3xl font-bold mb-8 mt-4">Now Playing Movies</h2>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-opacity duration-500 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden hover:scale-105 shadow-lg transition-transform"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold cursor-pointer ">
                  {movie.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          <button
            onClick={() => setPage(page-1)}
            className= "cursor-pointer hover:bg-gray-700 text-white px-3 py-2 rounded-full text-lg font-semibold transition-all disabled:opacity-50"
            disabled={isLoading || page == 1}
            type="button"
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page+1)}
            className= "cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-lg font-semibold transition-all disabled:opacity-50"
            disabled={isLoading}
            type="button"
          >
            Next
          </button>
        </div>
        <p  className="text-center mt-2 text-gray-400">Page {page}</p>
      </div>
    </>
  );
};

export default NowPlaying;
