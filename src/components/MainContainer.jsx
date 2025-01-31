import React from "react";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlaying);
  if (!movies )
    return <div class="flex items-center justify-center h-screen">
  <div class="bg-blue-500 text-white p-4 rounded-lg">Loading Movies...</div>
</div>
; // Instead of returning null
  // console.log("Movies of mainContainer:", movies);
  const mainMovie = movies?.results[0];
  const { original_title, overview, id } = mainMovie;
  // console.log("Main movie:", mainMovie);

  return (
    <div className="w-screen h-screen ">
      <VideoBackground id={id} />
      <VideoTitle original_title={original_title} overview={overview} />
    </div>
  );
};

export default MainContainer;
