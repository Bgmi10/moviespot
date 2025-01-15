  import React, { useState, useEffect } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { wrap } from 'popmotion';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faPlay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
  import { Link } from 'react-router-dom';
  import { poster_url, poster_url_desktop, profile_url } from '../utils/constans';
  import RatingCircle from './RatingCircle';
  import gif from "../img/movieSpotgif.gif"

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  export const Mainslider = ({ data, loader }) => {
    const [[page, direction], setPage] = useState([0, 0]);
    const [totalMovies, setTotalMovies] = useState(0);

    useEffect(() => {
      if (data) {
        setTotalMovies(data.length);
      }
    }, [data]);
    
    const movieIndex = wrap(0, totalMovies, page);

    const paginate = (newDirection) => {
      setPage([page + newDirection, newDirection]);
    };

    if (loader) {
      return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    if (!data || totalMovies === 0) {
      return <div className="flex items-center justify-center h-screen">No movies available</div>;
    }

    return (
      <div className="relative w-full h-screen overflow-hidden pointer-events-auto z-20">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full h-full"
          >
            <Link
              to={`/searchdetail/${data[movieIndex].id}`}
              className="block w-full h-full cursor-grab"
            >
              <div className="relative w-full h-full">
                <img
                  src={`${poster_url_desktop}${data[movieIndex].backdropPath}`}
                  alt={data[movieIndex].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 backdrop-brightness-50 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute top-32 left-20 right-10 p-10 flex items-start">
                  {loader ? <img
                    src={gif}
                    alt={data[movieIndex].title}
                    className="lg:w-72  sm: w-40 h-auto rounded-xl shadow-lg mr-8"
                  /> : <img
                  src={`${poster_url}${data[movieIndex].posterPath}`}
                  alt={data[movieIndex].title}
                  className="lg:w-72  sm: w-40 h-auto rounded-xl shadow-lg mr-8"
                />}
                  <div className="flex-1">
                    <h2 className="text-6xl font-bold text-white mb-5">{data[movieIndex].title}</h2>
                    <p className="text-xl text-gray-200 mb-6 line-clamp-2">
                      {data[movieIndex].overview}
                    </p>
                    <div className='flex gap-2 mb-6'>
                      {data[movieIndex].language?.map((u) =>  <button
                      key={u}
                      className="border-2 backdrop-blur-md text-white rounded-lg px-7 py-2 text-xl font-semibold duration-300 ease-linear relative">
                        {u}
                      </button>
                      )}
                    </div>
                    <div className='mb-6 flex gap-2'>
                    <RatingCircle rating={data[movieIndex].averageRating} maxRating={10} />
                    </div>
                    <div className='mb-6 flex gap-2'>
                    <button
                      className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 ${
                        data[movieIndex].adult ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                      }`}
                      title={data[movieIndex].adult ? "This movie is suitable for adults only." : "This movie is suitable for all ages."}
                    >
                      {data[movieIndex].adult ? (
                        <>
                          <span>🔞</span> <span>Adult</span>
                        </>
                      ) : (
                        <>
                          <span>🧒</span> <span>All Ages</span>
                        </>
                      )}
                  </button>

                    </div>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center hover:bg-red-700 transition duration-300">
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      Watch Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4 z-20">
          <button
            className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition duration-300 outline-none"
            onClick={() => paginate(-1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        </div>
        <div className="absolute top-1/2 transform -translate-y-1/2 right-4 z-20">
          <button
            className="bg-black bg-opacity-50 text-white p-4 rounded-full hover:bg-opacity-75 transition duration-300 outline-none"
            onClick={() => paginate(1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  };

