import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovie } from "../utils/movieSlice";
import { addMainTrailor } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { inMemoryPersistence } from "firebase/auth";
const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing",
      API_OPTIONS
    );

    const movies = await response.json();
    console.log("nowplayikng",movies);
    dispatch(addNowPlayingMovie(movies));
    
    // return movies.results;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // return null; // No UI yet, update as needed
};

export default useNowPlayingMovies;
