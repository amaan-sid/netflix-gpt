import { useEffect, useState } from 'react';
import { API_KEY } from '../constants';

const useTopRated = () => {
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchTopRated = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setTopRated(data.results || []);
      } catch (error) {
        console.error('Failed to fetch top-rated movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopRated();
  }, []);

  return { topRated, loading };
};

export default useTopRated;
