import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { poster_url } from '../../utils/constants';
import useFetchCategory from '../../hooks/useFetchSection';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import movieSpotgif from "../../img/movieSpotgif.gif"; 
import PreloadImage from '../PreloadImage';


export default function Section({ title, type, category }) {
  const { data, error, loader } = useFetchCategory(type, category);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Force recalculation after component mounts
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  // Function to determine slides per view based on screen width
  const getSlidesPerView = () => {
    const width = window.innerWidth;
    if (width < 640) return 3;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    if (width < 1280) return 5;
    return 6;
  };

  return (
    <div className="px-4 py-6 lg:p-10 mt-4 md:mt-8 ">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-md md:text-2xl lg:text-2xl font-bold border-2 shadow-[0_0_15px_1px_rgba(255,255,255,0.3)] text-white backdrop-blur-lg rounded-3xl px-4 lg:px-10 py-1">{title}</h2>
        <Link to={`/section/${title}/${type}/${category}`} className="group flex items-center text-white font-bold text-sm lg:text-2xl transition-colors duration-300">
          <div className='items-center flex font-bold text-sm md:text-xl lg:text-2xl px-3 md:px-6 border-2 shadow-[0_0_15px_1px_rgba(255,255,255,0.3)] lg:px-10 rounded-3xl py-1' >
            <span className="mr-2 group-hover:text-rose-600">More</span>
            <FaArrowRight className="group-hover:translate-x-10 transition-transform duration-300 group-hover:text-rose-600" />
          </div>
        </Link>
      </div>
      
      {isClient && (
        <div className='swiper-container'> 
          <Swiper
            modules={[Navigation]}
            navigation={false}
            spaceBetween={10}
            slidesPerView={getSlidesPerView()}
            slidesPerGroup={getSlidesPerView()}
            breakpoints={{
              640: {
                slidesPerView: 6,
                slidesPerGroup: 5,
              },
              768: {
                slidesPerView: 4,
                slidesPerGroup: 4
              },
              1024: {
                slidesPerView: 6,
                slidesPerGroup: 6
              },
              1280: {
                slidesPerView: 8,
                slidesPerGroup: 8
              },
              1536: {
                slidesPerView: 8,
                slidesPerGroup: 8
              }
            }}
            className="swiper-section"
          >
            {data?.map((movie, index) => (
              <SwiperSlide key={index} className="pb-6">
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.01 }}
                >
                  <Link to={`/section/detail/${movie.type}/${movie.category}/${movie.id}`}>
                    <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
                      <PreloadImage 
                        src={`${poster_url}${movie.posterPath}`}
                        placeholder={movieSpotgif}
                        lazy={true}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-cover rounded-2xl shadow-lg"
                        alt={movie.title}
                      />
                    </div>
                  </Link>
                  <motion.h3
                    className="mt-2 text-sm md:text-lg lg:text-lg font-bold text-white truncate"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {movie.title} 
                  </motion.h3>
                  <span className="text-white text-xs md:text-sm">({movie.releaseDate.slice(0, 4)})</span>
                  <div className='flex flex-wrap gap-1 mt-1'>
                    {movie.language.map((item, index) =>  
                      <motion.h1
                        className="text-[8px] md:text-[11px] px-1 text-blue-500 font-bold"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        key={index}
                      >
                        {item}  
                      </motion.h1> 
                    )} 
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}