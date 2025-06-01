import React, { useEffect, useState } from 'react';
import { API_KEY } from '@/utils/constants';
import { useNavigate } from 'react-router-dom';

const WhatsPopular = () => {
  const navigate = useNavigate();
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">What's Popular</h2>
      <div className="flex overflow-x-auto space-x-4 ">
        {popularMovies.map((movie) => (
          <div key={movie.id} className="max-w-[200px] bg-gray-800 rounded-lg p-2 text-white flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="rounded mb-2 cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            />
            <div className="p-2">
              <h3 className="text-sm font-semibold cursor-pointer hover:text-blue-600"
              onClick={() => navigate(`/movie/${movie.id}`)}
              >{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatsPopular;
