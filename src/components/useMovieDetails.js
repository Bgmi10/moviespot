// useMovieDetails.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useMovieDetails = (id) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=a79a50cc9c617bb7abb717d180c0e357`
        );

        setMovieDetails(response.data);

        const trailerResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=a79a50cc9c617bb7abb717d180c0e357`
        );

        const videoResults = trailerResponse.data.results;

        const trailer = videoResults.find((video) => video.type === 'Trailer' || video.site === 'YouTube');

        if (trailer) {
          setTrailerKey(trailer.key);
        } else if (videoResults.length > 0) {
          setTrailerKey(videoResults[0].key);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return { movieDetails, trailerKey };
};

export default useMovieDetails;
