import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { poster_url, poster_url_desktop } from '../utils/constants';
import { motion } from "framer-motion";
import RatingCircle from './RatingCircle';
import Loader from './admin/Loader';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import ScrollToTop from './ScrollToTop';
import { useState } from 'react';

export const Mainslider = ({ data, loader }) => {
  const navigate = useNavigate();
  const [isGrabbing, setIsGrabbing] = useState(false);
    
  return (
    <div className={`relative w-full h-screen `}
    
    >
      <ScrollToTop />
    {loader ? <Loader loading={loader} /> : <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true
        }}
        className="w-full h-full"
      >
        {data?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-full" 
            >
              <img
                src={`${poster_url_desktop}${movie?.backdropPath}`}
                alt={movie?.title}
                className="w-full h-full object-cover"
                loading="eager"
                
              />
              <div className="absolute inset-0 backdrop-brightness-50 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {(
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className={`absolute sm: top-24 lg:left-24 right-10 p-10 sm: flex-col lg:flex-row flex items-start lg:top-20 ${!isGrabbing ? "cursor-grab" : "cursor-grabbing" }`}
                >
                  <motion.div 
                    className="relative group"
                    onMouseDown={() => setIsGrabbing(true)}
                  onMouseLeave={() => setIsGrabbing(false)}
                  onMouseUp={() => setIsGrabbing(false)}
                  >
                    <img
                      src={`${poster_url}${movie?.posterPath}`}
                      alt={movie?.title}
                      className="lg:w-[350px] sm: w-40 h-auto rounded-3xl mr-8"
                      loading="eager"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h2
                      className="lg:text-6xl lg:mt-0 sm: text-3xl font-bold text-white lg:mb-7 sm: mb-2 sm: mt-3"
                    >
                      {movie.title}
                    </motion.h2>

                    <motion.p 
                      className="lg:text-xl sm: text-md text-gray-200 lg:mb-8 sm: mb-3 line-clamp-3"
                    >
                      {movie?.overview}
                    </motion.p>

                    <motion.div 
                      className="flex gap-2 lg:mb-8 sm: mb-4 flex-wrap"
                    >
                      {movie.language.map((lang) => (
                        <span
                          key={lang}
                          className="border-2 text-white rounded-lg px-4 py-2 lg:text-xl sm: text-sm font-bold backdrop-blur-sm"
                        >
                          {lang}
                        </span>
                      ))}
                    </motion.div>

                    <motion.div 
                      className="lg:mb-8 sm: mb-4 flex gap-2"
                    >
                      <RatingCircle rating={movie?.averageRating} maxRating={10} />
                    </motion.div>

                    <motion.div 
                      className="lg:mb-8 sm: mb-4 flex gap-2"
                    >
                      <span className="px-4 py-2 lg:text-xl sm: text-sm rounded-lg font-bold flex items-center gap-2 transition-colors duration-300 backdrop-blur-sm border-2 text-white">
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
                    </motion.div>
                    <motion.button
                      className="bg-red-600 text-white px-6 py-3 sm: p-1 lg:text-xl  sm: text-md rounded-lg font-bold flex items-center 
                        hover:bg-red-700 z-50 cursor-pointer"
                      onClick={() => navigate(`/slider/detail/${movie.id}`)}
                    >
                      <FontAwesomeIcon icon={faPlay} className="mr-2" />
                      Watch Now
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper> }
    </div>
  );
};

export default Mainslider;