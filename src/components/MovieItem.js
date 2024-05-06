import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieImage from './MovieImage';

const MovieItem = ({ movie }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0); // 4 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 bg-black rounded-xl overflow-hidden shadow-md transition-transform duration-300 transform  mb-4 cursor-pointer">
      <MovieImage
        src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
        alt={movie.title}
        linkTo={`/movie/${movie.id}`}
        loading={loading}
      />
      <div className="p-4">
        <Link
          to={`/movie/${movie.id}`}
          className={`block mt-1 text-sm leading-tight font-semibold text-white hover:underline hover:text-rose-600  ${
            loading ? 'bg-gray-300 animate-pulse' : ''
          } whitespace-normal overflow-ellipsis`}
        >
          {loading ? (
            
            ""
          ) : (
            movie.title
          )}
        </Link>
      </div>
    </div>
  );
};

export default MovieItem;
