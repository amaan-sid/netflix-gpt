import React, { useEffect, useState } from "react";
import { API_KEY } from "@/utils/constants";
import { useNavigate } from "react-router-dom";
const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day"); // 'day' or 'week'
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(false); // start fade-out
    fetch(
      `https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setTimeout(() => setFadeIn(true), 50); // trigger fade-in after data loads
      })
      .catch((err) => console.error(err));
  }, [timeWindow]);

  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <h2 className="text-2xl text-white font-bold">Trending Movies</h2>
        <div className="rounded-3xl border border-[#22b9d6] ">
          <button
            onClick={() => setTimeWindow("day")}
            className={`px-4 py-2 rounded-3xl font-semibold cursor-pointer transition-colors duration-300 ease-in-out ${
              timeWindow === "day"
                ? "bg-[#22b9d6] text-black"
                : " text-white"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setTimeWindow("week")}
            className={`px-4 py-2 rounded-3xl font-semibold cursor-pointer transition-colors duration-300 ease-in-out ${
              timeWindow === "week"
                ? "bg-[#22b9d6] text-black"
                : "text-white"
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      <div
        className={`flex overflow-x-auto space-x-4 pb-2 transition-opacity duration-500 ease-in-out ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        key={timeWindow} // ensures remount on toggle
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="max-w-[200px] bg-gray-800 rounded-lg p-2 text-white flex-shrink-0"
          >
            <img
            onClick={() => navigate(`/movie/${movie.id}`)}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded mb-2 cursor-pointer"
            />
            <h3 className="text-sm font-semibold cursor-pointer hover:text-blue-600"
            onClick={() => navigate(`/movie/${movie.id}`)}>
              {movie.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trending;
