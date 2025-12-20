import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { poster_url, poster_url_desktop } from '../utils/constants';
import { motion } from "framer-motion";
import movieSpotgif from "../img/movieSpotgif.gif";
import Loader from './admin/Loader';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import ScrollToTop from './ScrollToTop';
import "./mainslider.css";
import { useState } from 'react';
import PreloadImage from './PreloadImage';

export const Mainslider = ({ data, loader }) => {
  const navigate = useNavigate(); 
 const [activeIndex, setActiveIndex] = useState(0);
 const [swiperInstance, setSwiperInstance] = useState(null);
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
    
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-screen">
      <ScrollToTop />
      {loader ? (
        <Loader loading={loader} />
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          grabCursor={true}
          draggable={true}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={false}
          className="w-full h-full select-none"
        >
          {data?.map((movie) => (
            <SwiperSlide key={movie.id} className="relative cursor-grab">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={`${poster_url_desktop}${movie?.backdropPath}`}
                  alt={movie?.title}
                  className="w-full h-full object-cover transform scale-105"
                  loading="eager"
                />
                <div 
                  className="absolute inset-0 bg-black/20 blur-xs group-hover:brightness-50"
                  style={{ backdropFilter: 'brightness(0.7)'  }}
                />
                
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="absolute inset-0 flex items-center px-2 sm:px-6 lg:px-24 py-2 sm:py-6 lg:py-10"
                >
                  <div className="container mx-auto flex flex-row items-center gap-2 sm:gap-6">
                  <motion.div className="relative group flex-shrink-0" variants={fadeInUp}>
                  <PreloadImage 
                    src={`${poster_url}${movie.posterPath}`}
                    placeholder={movieSpotgif}
                    lazy={false}
                    className="w-20 sm:w-40 md:w-44 lg:w-52 h-auto rounded-md sm:rounded-xl lg:rounded-3xl posterimg"
                    imgClassName="w-32 md:w-44 lg:w-52 h-auto rounded-xl sm:rounded-xl lg:rounded-3xl 
                     transition-all duration-300 ease-in-out 
                    "
                    alt={movie.title}
                  />
                
                </motion.div>

                    <div className="flex-1 space-y-1 sm:space-y-3 lg:space-y-4">
                      <motion.h2
                        variants={fadeInUp}
                        className="text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight"
                      >
                        {movie.title} <span className="text-gray-200 text-xs sm:text-base lg:text-lg">({movie.releaseDate.slice(0,4)})</span>
                      </motion.h2>

                      {<motion.p 
                        variants={fadeInUp}
                        className="text-gray-200 line-clamp-2 sm:line-clamp-3 lg:line-clamp-4 max-w-full sm:max-w-3xl text-[9px] lg:text-xl"
                      >
                        {movie?.overview}
                      </motion.p>}

                      <motion.div 
                        variants={fadeInUp}
                        className="flex flex-wrap gap-1 sm:gap-2"
                      >
                        {movie.language.slice(0, window.innerWidth < 640 ? 2 : movie.language.length).map((lang) => (
                          <span
                            key={lang}
                            className="px-1 sm:px-2 py-0.5 sm:py-1 sm: text-xs lg:text-md text-white font-medium rounded 
                            bg-white/10 backdrop-blur-sm border border-white/20 
                            transition-colors duration-300 hover:bg-white/20"
                          >
                            {lang}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div 
                        variants={fadeInUp}
                        className="flex gap-1 sm:gap-4 pt-0.5 sm:pt-2"
                      >
                        <button
                          className="bg-rose-600 hover:bg-rose-700 text-white px-2 sm:px-4 py-1 sm:py-2 
                          rounded text-xs sm:text-base font-semibold flex items-center gap-1 sm:gap-2"
                          onClick={() => navigate(`/slider/detail/${movie.id}`)}
                        >
                          <FontAwesomeIcon icon={faPlay} className="text-xs" />
                          <span className="hidden sm:inline">Watch Now</span>
                          <span className="sm:hidden">Watch</span>
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!loader && data?.length > 0 && (
        <div className="flex justify-center gap-2 absolute bottom-2 sm:bottom-6 lg:bottom-6 left-0 right-0 z-20">
           {data.map((_, idx) => (
             <button
              key={idx}
               className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                 idx === activeIndex ? 'bg-white w-4 sm:w-6' : 'bg-white/50 w-1.5 sm:w-2'
               }`}
               onClick={() => swiperInstance?.slideTo(idx)}
               aria-label={`Go to slide ${idx + 1}`}
             />
           ))}
         </div>
       )}
    </div>
  );
};

export default Mainslider;