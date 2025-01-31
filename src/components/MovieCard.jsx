import React from "react";
import { CDN_IMG_URL } from "../utils/constants";
const MovieCard = ({ movie }) => {
  const cdn_img_url = CDN_IMG_URL;
  if (!movie) return null;
  const { id, original_title, poster_path } = movie;
  return (
    <div className="flex flex-row cursor-pointer ">
      {/* {movies?.results.map((movie) => { */}
      <div className="w-40 h-60 ">
        <img
          src={`${cdn_img_url}${poster_path}`}
          alt={original_title}
          className="rounded-md w-full h-full"
        />
      </div>
    </div>
  );
};

export default MovieCard;
