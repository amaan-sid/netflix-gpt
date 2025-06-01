import { useEffect, useState } from 'react';
import { API_KEY } from '../constants';

const usePopular = (page = 1) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;

  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`;
    const fetchPopular = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setPopularMovies(data.results || []);
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopular();
  }, [page]);

  return { popularMovies, loading };
};

export default usePopular;
