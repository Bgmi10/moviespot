import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import MovieItem from './MovieItem';
import { api_url } from '../utils/constans';


const MovieList = ({ searchTerm, apiUrl = api_url }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(false);

  const containerRef = useRef();

  const fetchMovies = useCallback(async (pageNumber) => {
    try {
      setLoading(true);

      const response = await axios.get(`${apiUrl}${pageNumber}`);

      const newMovies = response.data.results.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setMovies((prevMovies) => [...prevMovies, ...newMovies]);

      if (newMovies.length > 0) {
        // Show the "Load More" button if there might be more movies
        setShowLoadMoreButton(true);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, searchTerm, setMovies, setLoading, setShowLoadMoreButton]);

  useEffect(() => {
    // Fetch initial 20 movies
    fetchMovies(page);
  }, [page, fetchMovies]);

  const handleLoadMoreClick = () => {
    // Increment the page number and fetch more movies
    setPage((prevPage) => prevPage + 1);
    fetchMovies(page + 1);
  };

  const handleIntersection = useCallback(
    (entries) => {
      const target = entries[0];

      if (target.isIntersecting) {
        setShowLoadMoreButton(true);
      }
    },
    []
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    const currentContainerRef = containerRef.current;

    if (currentContainerRef) {
      observer.observe(currentContainerRef);
    }

    return () => {
      if (currentContainerRef && observer) {
        observer.unobserve(currentContainerRef);
      }
    };
  }, [containerRef, handleIntersection]);

  const renderMovies = () => {
    return (
      <div className="container mx-auto mt-6">


        <div className="flex flex-wrap">
          {movies.map((movie) => (
            <div key={movie.id} className="mb-4 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
              {/* Adjust width for small devices (w-full for single column) */}
              <MovieItem movie={movie} />
            </div>
          ))}
        </div>
        {showLoadMoreButton && (
          <div className="flex justify-center ">
            <button
              onClick={handleLoadMoreClick}
              className="bg-rose-600 text-white py-2 px-4 rounded-full"
              disabled={loading}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="bg-black">
      {renderMovies()}

    </div>
  );
};

export default MovieList;
