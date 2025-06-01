import { useEffect, useState } from 'react';
import { API_KEY } from '../constants';

const useUpcoming = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setUpcoming(data.results || []);
      } catch (error) {
        console.error('Failed to fetch upcoming movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcoming();
  }, []);

  return { upcoming, loading };
};

export default useUpcoming;
