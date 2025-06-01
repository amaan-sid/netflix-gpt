import { useEffect, useState } from 'react';
import { API_KEY } from '../constants';

const useNowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch(URL);
        const data = await res.json();
        setNowPlaying(data.results || []);
      } catch (error) {
        console.error('Failed to fetch now playing movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlaying();
  }, []);

  return { nowPlaying, loading };
};

export default useNowPlaying;
