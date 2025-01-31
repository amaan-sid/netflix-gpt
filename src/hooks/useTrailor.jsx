import React, { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { addMainTrailor } from "../utils/movieSlice";
import { useSelector, useDispatch } from "react-redux";

const useTrailor = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    movieTrailor();
  }, []);

  const movieTrailor = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/"+id+"/videos",
      API_OPTIONS
    );
    const videos = await response.json();
    const filterTrailor = videos?.results?.filter(
      (video) => video.type === "Trailer"
    );
    const trailor = filterTrailor?.length
      ? filterTrailor[0]
      : videos.results[0];
    if (trailor) {
      // console.log("Dispatching trailer:", trailor);
      dispatch(addMainTrailor(trailor));
    }
  };
  return <div></div>;
};

export default useTrailor;
