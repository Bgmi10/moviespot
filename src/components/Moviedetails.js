import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player/youtube';
import { poster_url } from '../utils/constans';
import renderStarRating from './RenderStarRating'
import useMovieDetails from './useMovieDetails'

const MovieDetails = () => {
  const { id } = useParams();
  const { movieDetails, trailerKey } = useMovieDetails(id);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto mt-8">
      {windowWidth > 768 && movieDetails ? (
        // Render for larger devices
        <div className="relative">
          {/* Video Player for Background */}
          {trailerKey && (
            <div className="absolute inset-0 z-0">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                playing
                loop
                muted
                width="100%"
                height="100%"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0 }}
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                    },
                  },
                }}
              />
            </div>
          )}

          <div className="relative z-10 flex flex-col md:flex-row p-4 md:p-10 items-center justify-center cursor-pointer bg-gradient-to-r from-black">
            <div className="md:w-1/2 lg:w-1/3 xl:w-1/4  md:h-72 rounded-lg  md:mb-0 z-10 transform transition-transform hover:scale-110 overflow-hidden bg-gradient-to-r from-black">
              {movieDetails.poster_path && (
                <img
                  className="w-52 h-52 rounded-lg "
                  src={`${poster_url}${movieDetails.poster_path}`}
                  alt=""
                />
              )}
            </div>

            <div className="ml-0 md:ml-8 text-white ">
              <h2 className="text-base md:text-4xl font-bold mb-2">
                {movieDetails.title || <Skeleton width={200} />}
              </h2>
              <p className="text-white mb-2">{movieDetails.release_date || <Skeleton width={100} />}</p>
              <p className="mt-2 md:mt-4 text-sm md:text-lg font-bold">Overview</p>
              <p className="mt-2 text-sm md:text-lg">{movieDetails.overview || <Skeleton count={3} />}</p>
              <p className="mt-2 md:mt-4 text-sm md:text-lg">
                <span className="font-bold">Rating:</span>{' '}
                {movieDetails.vote_average ? (
                  renderStarRating(movieDetails.vote_average)
                ) : (
                  <Skeleton width={80} />
                )}{' '}
                ({movieDetails.vote_count || <Skeleton width={50} />} votes)
              </p>
              <p className="mt-2 text-sm md:text-lg">
                <span className="font-bold">Genres:</span>{' '}
                {movieDetails.genres ? (
                  movieDetails.genres.map((genre) => genre.name).join(', ')
                ) : (
                  <Skeleton width={150} />
                )}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Render for smaller devices
        <div>
          {movieDetails && (
            <div
              className="relative flex flex-col md:flex-row p-4 md:p-10 items-center justify-center bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url(https://www.themoviedb.org/t/p/original${movieDetails.backdrop_path})`,
              }}
            >
              <div className="absolute inset-0 bg-black opacity-60"></div>
             {movieDetails.poster_path && (
                <img
                  className=" h-40 sm: w-36 md:w-1/2 lg:w-1/3 xl:w-1/4  md:h-72 rounded-lg mb-4 md:mb-0 z-10 transform transition-transform "
                  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${movieDetails.poster_path}`}
                  alt=""
                />
              )} 
              <div className="ml-0 md:ml-8 text-white z-10">
                <h2 className="text-base md:text-4xl font-bold mb-2">
                  {movieDetails.title || <Skeleton width={200} />}
                </h2>
                <p className="text-white mb-2">{movieDetails.release_date || <Skeleton width={100} />}</p>
                <p className="mt-2 md:mt-4 text-sm md:text-lg font-bold">Overview</p>
                <p className="mt-2 text-sm md:text-lg">{movieDetails.overview || <Skeleton count={3} />}</p>
                <p className="mt-2 md:mt-4 text-sm md:text-lg">
                  <span className="font-bold">Rating:</span>{' '}
                  {movieDetails.vote_average ? (
                    renderStarRating(movieDetails.vote_average)
                  ) : (
                    <Skeleton width={80} />
                  )}{' '}
                  ({movieDetails.vote_count || <Skeleton width={50} />} votes)
                </p>
                <p className="mt-2 text-sm md:text-lg">
                  <span className="font-bold">Genres:</span>{' '}
                  {movieDetails.genres ? (
                    movieDetails.genres.map((genre) => genre.name).join(', ')
                  ) : (
                    <Skeleton width={150} />
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {trailerKey && windowWidth <= 768 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-white">Movie Trailer</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="rounded-lg shadow-md"
              width="100%" // Make the iframe responsive
              height="315"
              src={`https://www.youtube.com/embed/${trailerKey}?&mute=1`}
              title="Movie Trailer"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
