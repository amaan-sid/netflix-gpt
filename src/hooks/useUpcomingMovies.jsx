import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovie } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { inMemoryPersistence } from "firebase/auth";
const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      API_OPTIONS
    );

    const movies = await response.json();
    // console.log(movies);
    dispatch(addUpcomingMovie(movies));
    
    // return movies.results;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // return null; // No UI yet, update as needed
};

export default useUpcomingMovies;
