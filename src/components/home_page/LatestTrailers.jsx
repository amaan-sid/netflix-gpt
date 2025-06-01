import React, { useEffect, useState } from "react";
import { API_KEY } from "@/utils/constants";
const LatestTrailers = () => {
  const [trailers, setTrailers] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState(null);
  const [selected, setSelected] = useState("popular");
  const [fadeIn, setFadeIn] = useState(false);
  const buttons = ["popular", "now_playing", "upcoming", "top_rated"];

  useEffect(() => {
    const fetchLatestTrailers = async () => {
      setFadeIn(false); 
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${selected}?api_key=${API_KEY}`
        );
        const data = await res.json();
        const movies = data.results;

        // fetch trailers for each movie
        const trailerPromises = movies.map(async (movie) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`
          );
          const data = await res.json();
          const trailer = data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          return trailer ? { ...movie, trailerKey: trailer.key } : null;
        });

        const trailersWithKeys = (await Promise.all(trailerPromises)).filter(
          Boolean
        );
        setTrailers(trailersWithKeys);

        // fade in after data loaded
        setTimeout(() => setFadeIn(true), 200);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatestTrailers();
  }, [selected]);

  return (
    <div className="p-4 text-white">
      <div className="flex space-x-4 mb-4 items-center">
        <h2 className="text-[25px] font-bold">Latest Trailers</h2>
        <div className="flex rounded-3xl border border-[#22b9d6]">
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => setSelected(btn)}
              className={`cursor-pointer rounded-3xl px-4 py-2 transition-opacity duration-500 ease-in-out ${
                selected === btn ? "bg-[#22b9d6] text-black" : " text-white"
              }`}
            >
              {btn.replace("_", " ").toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Fade container wrapping trailer list */}
      <div
        className={`flex overflow-x-auto space-x-4 pb-2 transition-opacity ease-in-out ${
          fadeIn ? "opacity-100" : "opacity-0"
        }`}
        key={selected} // remount fade container when tab changes
      >
        {trailers.map((movie) => (
          <div
            key={movie.id}
            className="min-w-[300px] cursor-pointer"
            onClick={() => setActiveTrailer(movie.trailerKey)}
          >
            <div className="relative min-w-[300px] hover:scale-105 transition-transform">
              <img
                src={`https://img.youtube.com/vi/${movie.trailerKey}/mqdefault.jpg`}
                alt={movie.title}
                className="rounded w-full z-10 cursor-pointer"
              />
              <button
                onClick={() => setActiveTrailer(movie.trailerKey)}
                className="absolute inset-0 flex items-center justify-center text-white font-semibold bg-opacity-40 hover:bg-opacity-60 active:scale-105 transition-transform rounded cursor-pointer"
              >
                <span className="text-4xl"> ▶ </span>
              </button>
              <h3 className="mt-2 text-sm font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen trailer overlay */}
      {activeTrailer && (
        <div className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl px-4">
            <button
              className="absolute hover:text-red-600 cursor-pointer top-2 right-4 text-white text-3xl font-bold z-10"
              onClick={() => setActiveTrailer(null)}
            >
              &times;
            </button>
            <div className="w-full aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${activeTrailer}?autoplay=1`}
                title="Trailer"
                frameBorder="0"
                allowFullScreen
                className="w-full h-full rounded"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestTrailers;
