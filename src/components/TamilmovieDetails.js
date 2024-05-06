import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from 'axios';

const TamilmovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Make a request to your server to fetch movie details using the movieId
        const response = await axios.get(`http://localhost:3002/api/movies/${movieId}`);
    
        if (response.data) {
          const selectedMovie = response.data;
    
          setMovieDetails({
            title: selectedMovie.title,
            poster_path: selectedMovie.poster_path,
            videoUrl: selectedMovie.download_link,
            background_path: selectedMovie.background_path,
            overview: selectedMovie.overview,
          });
        } else {
          console.error('Movie not found.');
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchMovieDetails();
  }, [movieId]);

  return (
    <div className="relative flex flex-col items-center">
      {loading ? (
        <p>Loading movie details...</p>
      ) : movieDetails ? (
        <div className="relative max-w-screen-md m-4 p-4 shadow-lg rounded-lg text-white">
          <div
            style={{ backgroundImage: `url(${movieDetails.background_path})` }}
            className="w-full h-64 bg-cover rounded-lg mb-2 relative"
          >
            {/* Overlay with Poster Image */}
            <div className="absolute top-0 left-0 w-full h-full bg-cover rounded-lg">
              <img src={movieDetails.poster_path} alt="" className="w-38 h-40 rounded-lg" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black p-4">
              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 24"
                  stroke="white"
                  className="w-12 h-12 text-green-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l7 9-7 9V3z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2">{movieDetails.title}</h1>

          {/* Overview */}
          <p className="text-white mb-4">{movieDetails.overview}</p>

          {/* Video Player */}
          <ReactPlayer
            url={movieDetails.videoUrl}
            controls={true}
            width="100%"
            height="auto"
            className="mt-4"
          />

          {/* Download Button */}
          <a
            href={movieDetails.videoUrl}
            download={`${encodeURIComponent(movieDetails.title)}.mkv`}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-block"
          >
            Download
          </a>
        </div>
      ) : (
        <p className="text-white">Movie details not found.</p>
      )}
    </div>
  );
};

export default TamilmovieDetails;
