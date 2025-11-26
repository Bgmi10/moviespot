// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination } from 'swiper/modules';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faBookmark, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { poster_url, poster_url_desktop } from '../utils/constants';
// import { motion, AnimatePresence } from "framer-motion";
// import RatingCircle from './RatingCircle';
// import Loader from './admin/Loader';
// import 'swiper/css';
// import 'swiper/css/autoplay';
// import 'swiper/css/pagination';
// import ScrollToTop from './ScrollToTop';
// import "./mainslider.css";
// import PreloadImage from './PreloadImage';
// import movieSpotgif from "../img/movieSpotgif.gif";
// import { useState, useEffect } from 'react';

// export const Mainslider = ({ data, loader }) => {
//   const navigate = useNavigate();
//   const [swiperInstance, setSwiperInstance] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   // Animation variants
//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5 }
//     },
//     exit: {
//       opacity: 0,
//       y: -20,
//       transition: { duration: 0.3 }
//     }
//   };

//   const staggerChildren = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.1
//       }
//     },
//     exit: {
//       opacity: 0,
//       transition: { 
//         staggerChildren: 0.05,
//         staggerDirection: -1
//       }
//     }
//   };

//   useEffect(() => {
//     if (data && data.length > 0) {
//       data.forEach(movie => {
//         if (movie.backdropPath) {
//           const img = new Image();
//           img.src = `${poster_url_desktop}${movie.backdropPath}`;
//         }
//         if (movie.posterPath) {
//           const img = new Image();
//           img.src = `${poster_url}${movie.posterPath}`;
//         }
//       });
//     }
//   }, [data]);
    
//   return (
//     <div className="relative w-full h-screen">
//       <ScrollToTop />
//       {loader ? <Loader loading={loader} /> : 
//         <Swiper
//           grabCursor={true}
//           draggable={true}
//           modules={[Autoplay, Pagination]}
//           spaceBetween={0}
//           slidesPerView={1}
//           autoplay={{
//             delay: 4000,
//             disableOnInteraction: false,
//             pauseOnMouseEnter: true
//           }}
//           pagination={false}
//           className="w-full h-full"
//           onSwiper={(swiper) => setSwiperInstance(swiper)}
//           onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
//           speed={800}
//         >
//           {data?.map((movie, index) => (
//             <SwiperSlide key={index}>
//               {({ isActive }) => (
//                 <div className="relative w-full h-full">
//                   <img
//                     src={`${poster_url_desktop}${movie?.backdropPath}`}
//                     alt={movie?.title}
//                     className="w-full h-full object-cover"
//                     loading={index === 0 ? "eager" : "lazy"}
//                     style={{
//                       transition: "transform 1s ease-in-out",
//                       transform: isActive ? "scale(1.05)" : "scale(1)"
//                     }}
//                   />
//                   <div 
//                     className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10"
//                   />
//                   <div 
//                     className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"
//                   />
//                   <AnimatePresence mode="wait">
//                     {isActive && (
//                       <motion.div
//                         key={`content-${index}`}
//                         initial="hidden"
//                         animate="visible"
//                         exit="exit"
//                         variants={staggerChildren}
//                         className="absolute sm: top-8 lg:left-0 right-10 p-10 sm: flex-col lg:flex-row flex items-start lg:top-[70px] z-20"
//                       >
//                         <motion.div 
//                           className="relative group"
//                         >
//                           <PreloadImage 
//                             src={`${poster_url}${movie.posterPath}`}
//                             placeholder={movieSpotgif}
//                             lazy={false}
//                             className="lg:w-80 sm: w-32 h-auto lg:rounded-3xl sm: rounded-xl mr-8 posterimg"
//                             imgClassName="lg:w-80 sm: w-28 h-auto lg:rounded-3xl sm: rounded-xl mr-8 posterimg transition-transform duration-300 group-hover:scale-105"
//                             alt={movie.title}
//                           />
//                           <div className="absolute inset-0 rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-black/20" />
//                         </motion.div>

//                         <div className="flex-1">
//                           <motion.h2
//                             variants={fadeInUp}
//                             className="lg:text-6xl lg:mt-0 sm: text-2xl font-bold text-white lg:mb-5 sm: mb-2 sm: mt-3 title"
//                           >
//                             {movie.title} <span className="text-bold lg:text-3xl text-lg">({movie.releaseDate.slice(0,4)})</span>
//                           </motion.h2>
                          
//                           <motion.p 
//                             variants={fadeInUp}
//                             className="lg:text-xl font-medium sm: text-md text-white/80 lg:mb-5 sm: mb-3 lg:line-clamp-3 sm: line-clamp-2 overview leading-relaxed"
//                           >
//                             {movie?.overview}
//                           </motion.p>
                          
//                           <motion.div 
//                             variants={fadeInUp}
//                             className="flex gap-2 lg:mb-5 sm: mb-4 flex-wrap"
//                           >
//                             {movie.language.map((lang) => (
//                               <span
//                                 key={lang}
//                                 className="px-3 py-1 bg-white/10 rounded-full text-white/90 lg:text-base sm: text-sm backdrop-blur-sm"
//                               >
//                                 {lang}
//                               </span>
//                             ))}
//                           </motion.div>

//                           <motion.div 
//                             variants={fadeInUp}
//                             className="lg:mb-5 sm: mb-4 flex gap-2"
//                           >
//                             <RatingCircle rating={movie?.averageRating} maxRating={10} />
//                           </motion.div>

//                           <motion.div 
//                             variants={fadeInUp}
//                             className="lg:mb-5 sm: mb-4 flex gap-2"
//                           >
//                             <span className="px-4 py-2 lg:text-base sm: text-sm rounded-lg font-medium flex items-center gap-2 transition-colors duration-300 backdrop-blur-sm bg-white/10 border border-white/20 text-white">
//                               {movie?.adult ? (
//                                 <>
//                                   <span>🔞</span>
//                                   <span>Adult</span>
//                                 </>
//                               ) : (
//                                 <>
//                                   <span>🧒</span>
//                                   <span>All Ages</span>
//                                 </>
//                               )}  
//                             </span>
//                           </motion.div>
                          
//                           <motion.div
//                             variants={fadeInUp}
//                             className="flex items-center gap-3"
//                           >
//                             <motion.button
//                               className="group relative inline-flex items-center gap-2 lg:px-8 lg:py-4 px-6 py-3 
//                                         bg-rose-600 hover:bg-rose-700 text-white rounded-lg
//                                         transition-all duration-300 ease-out
//                                         overflow-hidden"
//                               whileHover={{ scale: 1.02 }}
//                               whileTap={{ scale: 0.98 }}
//                               onClick={() => navigate(`/slider/detail/${movie.id}`)}
//                             >
//                               <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                               <FontAwesomeIcon icon={faPlay} className="lg:text-lg text-sm relative z-10" />
//                               <span className="font-semibold lg:text-lg text-sm relative z-10">Watch Now</span>
//                             </motion.button>

//                             <motion.button 
//                               className="lg:p-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full
//                                         backdrop-blur-md transition-all duration-300
//                                         border border-white/20"
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                             >
//                               <FontAwesomeIcon icon={faBookmark} className="lg:text-xl text-sm" />
//                             </motion.button>

//                             <motion.button 
//                               className="lg:p-4 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full
//                                         backdrop-blur-md transition-all duration-300
//                                         border border-white/20"
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                             >
//                               <FontAwesomeIcon icon={faInfoCircle} className="lg:text-xl text-sm" />
//                             </motion.button>
//                           </motion.div>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>  
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       }

//       {/* Pagination Indicator */}
//       {!loader && data?.length > 0 && (
//         <div className="flex justify-center gap-2 absolute bottom-6 left-0 right-0 z-20">
//           {data.map((_, idx) => (
//             <button
//               key={idx}
//               className={`h-2 rounded-full transition-all duration-300 ${
//                 idx === activeIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
//               }`}
//               onClick={() => swiperInstance?.slideTo(idx)}
//               aria-label={`Go to slide ${idx + 1}`}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Mainslider;

// second design

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { poster_url, poster_url_desktop } from '../utils/constants';
import { motion } from "framer-motion";
import movieSpotgif from "../img/movieSpotgif.gif";
import RatingCircle from './RatingCircle';
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
  console.log(data)
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
    
  return (
    <div className="relative w-full h-screen">
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
                  className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10"
                  style={{ backdropFilter: 'brightness(0.6)'  }}
                />
                
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeInUp}
                  className="absolute inset-0 flex items-center px-4 lg:px-24 lg:pt-10"
                >
                  <div className="container mx-auto flex flex-col lg:flex-row items-start gap-8">
                  <motion.div className="relative group" variants={fadeInUp}>
                  <PreloadImage 
                    src={`${poster_url}${movie.posterPath}`}
                    placeholder={movieSpotgif}
                    lazy={false}
                    className="lg:w-80 sm: w-28 h-auto lg:rounded-3xl sm: rounded-xl mr-8 posterimg"
                    imgClassName="lg:w-80 sm: w-28 h-auto lg:rounded-3xl sm: rounded-2xl mr-8 
                    posterimg transition-all duration-300 ease-in-out 
                    group-hover:blur-sm group-hover:brightness-50"
                    alt={movie.title}
                  />
                
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-center items-center 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                   text-white px-4 lg:px-6">
    
                    <motion.h3 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-xl lg:text-2xl font-semibold text-center"
                    >
                      {movie.title}
                    </motion.h3>
                
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="text-gray-300 text-sm"
                    >
                      ({movie.releaseDate.slice(0, 4)})
                    </motion.p>
                
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                      className="mt-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-sm border border-white/20"
                    >
                      ⭐ {movie.averageRating}/10
                    </motion.div>
                
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 }}
                      onClick={() => navigate(`/slider/detail/${movie.id}`)}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg 
                                 font-medium transition duration-300 ease-in-out"
                    >
                      View Details
                    </motion.button>
                  </div>
                </motion.div>

                    <div className="flex-1 space-y-4 lg:space-y-6">
                      <motion.h2
                        variants={fadeInUp}
                        className="text-3xl lg:text-6xl font-bold text-white tracking-tight"
                      >
                        {movie.title} <span className="text-gray-200 text-lg">({movie.releaseDate.slice(0,4)})</span>
                      </motion.h2>

                      {window.innerWidth > 399 && <motion.p 
                        variants={fadeInUp}
                        className="text-gray-200 line-clamp-3 lg:line-clamp-4 max-w-3xl text-base"
                      >
                        {movie?.overview}
                      </motion.p>}

                      <motion.div 
                        variants={fadeInUp}
                        className="flex flex-wrap gap-2"
                      >
                        {movie.language.map((lang) => (
                          <span
                            key={lang}
                            className="px-4 py-2 text-sm lg:text-base text-white font-medium rounded-lg 
                            bg-white/10 backdrop-blur-sm border border-white/20 
                            transition-colors duration-300 hover:bg-white/20"
                          >
                            {lang}
                          </span>
                        ))}
                      </motion.div>

                      <motion.div 
                        variants={fadeInUp}
                        className="flex items-center gap-6"
                      >
                        <RatingCircle rating={movie?.averageRating} maxRating={10} />
                        <span className="px-4 py-2 text-sm lg:text-base rounded-lg font-medium 
                          bg-white/10 backdrop-blur-sm border border-white/20 text-white
                          flex items-center gap-2">
                          {movie?.adult ? '🔞 Adults Only' : '🧒 Family Friendly'}
                        </span>
                      </motion.div>

                      <motion.div 
                        variants={fadeInUp}
                        className="flex gap-4 pt-2"
                      >
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-1 
                          rounded-lg font-semibold flex items-center gap-2"
                          onClick={() => navigate(`/slider/detail/${movie.id}`)}
                        >
                          <FontAwesomeIcon icon={faPlay} />
                          Watch Now
                        </button>
                        <button
                          className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 
                          rounded-lg font-semibold flex items-center gap-2 
                          backdrop-blur-sm border border-white/20 
                          transition-all duration-300"
                          onClick={() => navigate(`/slider/detail/${movie.id}`)}
                        >
                          <FontAwesomeIcon icon={faClock} />
                          More Info
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
        <div className="flex justify-center gap-2 absolute lg:bottom-6 bottom-20 left-0 right-0 z-20">
           {data.map((_, idx) => (
             <button
              key={idx}
               className={`h-2 rounded-full transition-all duration-300 ${
                 idx === activeIndex ? 'bg-white w-6' : 'bg-white/50 w-2'
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