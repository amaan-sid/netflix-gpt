import React from 'react'
import { CDN_IMG_URL } from '../utils/constants';
import MovieList from './MovieList';
import { useSelector } from 'react-redux'
const SecondaryContainer = () => {
  const now_playing = useSelector((state) => state.movies.nowPlaying);
  const Popular = useSelector((state) => state.movies.Popular);
  const Upcoming = useSelector((state) => state.movies.Upcoming);
  const TopRated = useSelector((state) => state.movies.TopRated);
  const cdn_img_url = CDN_IMG_URL;
  return (

    <div className='-mt-40'>
      {/* <h1 className="text-2xl font-bold text-white z-30">Movies</h1> */}
      <MovieList movies={now_playing} title={"Now Playing"}/>
      <MovieList movies={Popular} title={"Popular"} />
      <MovieList movies={Upcoming} title={"Upcoming"} />
      <MovieList movies={TopRated} title={"Top Rated"} />
    </div>
  )
}

export default SecondaryContainer