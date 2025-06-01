import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { API_KEY } from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const SkeletonCard = () => (
  <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
    <div className="bg-gray-700 h-72 w-full"></div>
    <div className="p-2">
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-600 rounded w-1/2"></div>
    </div>
  </div>
);

const Popular = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPopularMovies = async () => {
    setFadeIn(false);
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();
      if (data?.results) {
        setMovies(data.results);
      }
      setTimeout(() => setFadeIn(true), 50);
    } catch (err) {
      console.error("Failed to fetch popular movies:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularMovies();
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Navbar />
      <div className="px-40 pt-4 text-white">
        <h2 className="text-3xl font-bold mb-6 mt-2">Popular Movies</h2>

        <div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 transition-opacity duration-500 ease-in-out ${
            fadeIn ? "opacity-100" : "opacity-0"
          }`}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 cursor-pointer transition-transform"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/fallback-image.jpg"
                }
                alt={movie.title}
                className="w-full h-auto"
                onClick={() => navigate(`/movie/${movie.id}`)}
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold"
                onClick={() => navigate(`/movie/${movie.id}`)}
                >{movie.title}</h3>
              </div>
            </div>
          ))}

          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={`skeleton-${index}`} />
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

export default Popular;
