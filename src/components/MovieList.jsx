import React from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux'
const MovieList = ({movies,title}) => {
  
  return (
    <div className='overflow-x-scroll bg-black  '>
        <div className=''> 
        <h1 className="text-3xl font-bold text-white z-10 sticky px-6 mb-2">{title}</h1>
        </div>
        <div className='flex gap-4 px-6'> 
        {movies?.results?.map((movie) => (
            <div className='z-10'>
            <MovieCard key={movie.id} movie={movie} />
            </div>
        ))}
        </div>
        
    </div>
  )
}

export default MovieList