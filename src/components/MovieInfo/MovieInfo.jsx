import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { API_KEY } from "@/utils/constants";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";

const MovieInfo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // modal state

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const [detailsRes, creditsRes, videosRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`),
      ]);

      const detailsData = await detailsRes.json();
      const creditsData = await creditsRes.json();
      const videosData = await videosRes.json();

      setMovie(detailsData);
      setCast(creditsData.cast.slice(0, 20) || []);
      setVideos(videosData || []);

      const trailerVideo = videosData.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      setTrailer(trailerVideo || null);
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="">
        {/* Top Section */}
        <div className="h-[480px] bg-gradient-to-bl from-[#341f1f] via-[#4b241e] to-[#553b1c]">
          <div className="px-40 py-6 flex gap-8">
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                  : "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={movie.title}
              className="rounded-lg shadow-lg w-72 object-cover"
            />
            <div className="flex-1 py-2">
              <h1 className="text-4xl text-white font-bold mb-2">
                {movie.title}
                <span className="text-4xl text-white font-normal">
                  {" "}
                  ({movie.release_date?.slice(0, 4)})
                </span>
              </h1>
              <p className="text-white mb-4">
                {movie.release_date} • {movie.runtime || "N/A"} min •{" "}
                {movie.original_language?.toUpperCase()}
              </p>
              <h1 className="text-white text-2xl">Overview </h1>
              <p className="mb-6 text-white">{movie.overview}</p>
              <p className="text-sm text-white">
                ⭐ {movie.vote_average} / 10 ({movie.vote_count} votes)
              </p>
              <div className="mt-4 flex space-x-4 text-white items-center">
                <strong>Genres:</strong>{" "}
                {movie.genres?.map((g) => g.name).join(", ")}
                {trailer && (
                  <button
                    className="ml-6 text-white bg-[#22b9d6] cursor-pointer px-4 py-2 rounded-lg hover:scale-105 hover:text-black transition"
                    onClick={() => setIsOpen(true)}
                  >
                    ▶️ Play Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        <div className="mb-10 px-40">
          <h2 className="text-2xl font-bold m-4">Top Billed Cast</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {cast.map((actor) => (
              <div
                key={actor.id}
                className="max-w-[200px] bg-gray-800 hover:scale-105 transition-transform ease-in-out rounded-lg p-2 text-white flex-shrink-0"
              >
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                      : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                  }
                  alt={actor.name}
                  className="w-full cursor-pointer h-56 object-cover rounded mb-2"
                  onClick={() => navigate(`/person/${actor.id}`)}
                />
                <p className="font-medium cursor-pointer hover:text-blue-500">
                  {actor.name}
                </p>
                <p className="text-sm text-gray-300">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trailer Modal */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-4xl rounded bg-black shadow-lg overflow-hidden">
              <div className="flex justify-end p-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white text-2xl font-bold hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailer?.key}`}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </>
  );
};

export default MovieInfo;
