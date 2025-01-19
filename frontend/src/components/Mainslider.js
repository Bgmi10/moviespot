import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { poster_url, poster_url_desktop } from '../utils/constans';
import { motion } from "framer-motion";
import RatingCircle from './RatingCircle';
import Loader from './admin/Loader';  
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import ScrollToTop from './ScrollToTop';

export const Mainslider = ({ data, loader }) => {
  const navigate = useNavigate();
    
  if (loader) {
    return <Loader loading={loader} />;
  }

  if (!data) {
    return <div className="flex items-center justify-center h-screen">No movies available</div>;
  }

  const slideVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  
  
  return (
    <div className="relative w-full h-screen cursor-grab">
      <ScrollToTop />
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
        }}
        pagination = {{
          clickable: true
        }}
        className={`w-full h-full`}
      >
        {data && data?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-[100%]">
              <img
                src={`${poster_url_desktop}${movie?.backdropPath}`}
                alt={movie?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 backdrop-brightness-50 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute sm: top-24 lg:left-20 right-10 p-10 sm: flex-col lg:flex-row flex items-start lg:top-16">
                <div className="relative group">
                  <img
                    src={`${poster_url}${movie?.posterPath}`}
                    alt={movie?.title}
                    className="lg:w-80 sm: w-40 h-auto rounded-2xl mr-8"
                  />
                </div>
                <div className="flex-1 opacity-0 animate-fadeIn">
                  <motion.h2 className="lg:text-6xl lg:mt-0 sm: text-3xl font-bold text-white lg:mb-5 sm: mb-2 sm: mt-1 animate-slideUp" 
                   variants={slideVariants}
                   initial="hidden"
                   animate="visible"
                   transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {movie.title}
                  </motion.h2>
                  <p className="lg:text-xl sm: text-md text-gray-200 lg:mb-6 sm: mb-3 line-clamp-3 animate-slideUp delay-100">
                    {movie?.overview}
                  </p>
                  <div className="flex gap-2 lg:mb-6 sm: mb-4 animate-slideUp delay-200 flex-wrap">
                  {movie.language.map((lang) => (
                        <span
                          key={lang}
                          className="border-2 text-white rounded-lg lg:px-4 lg:py-2 sm: p-1 lg:text-xl 
                          font-bold"
                        >
                          {lang}
                        </span>
                      ))}
                  </div>
                  <div className="lg:mb-6 sm: mb-4 flex gap-2 animate-slideUp delay-300">
                    <RatingCircle rating={movie?.averageRating} maxRating={10} />
                  </div>
                  <div className="lg:mb-6 sm: mb-4 flex gap-2 animate-slideUp delay-400">
                    <span
                      className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors duration-300
                        ${movie?.adult ? "backdrop-blur-md border-2" : "backdrop-blur-md border-2"} text-white`}
                    >
                      {movie?.adult ? (
                        <>
                          <span>🔞</span>
                          <span>Adult</span>
                        </>
                      ) : (
                        <>
                          <span>🧒</span>
                          <span>All Ages</span>
                        </>
                      )}  
                    </span>
                  </div>  
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center 
                     hover:bg-red-700 z-50 cursor-pointer animate-slideUp" onClick={() => navigate(`/slider/detail/${movie.id}`)}>
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      Watch Now
                    </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper> 
    </div>
  );
};

export default Mainslider;