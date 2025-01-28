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
import "./mainslider.css";

export const Mainslider = ({ data, loader }) => {
  const navigate = useNavigate();
    
  return (
    <div className={`relative w-full h-screen cursor-grab`}>
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
        {data?.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={`${poster_url_desktop}${movie?.backdropPath}`}
                alt={movie?.title}
                className="w-full h-full object-cover"
                loading="eager"
                
              />
               <div 
                 className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                 style={{ backdropFilter: 'brightness(0.7)' }}
              />
              {(
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className={`absolute sm: top-20 lg:left-24 right-10 p-10 sm: flex-col lg:flex-row flex items-start lg:top-[70px]`}
                >
                  <motion.div 
                    className="relative group"
                  >
                    <motion.img
                      src={`${poster_url}${movie?.posterPath}`}
                      alt={movie?.title}
                      className="lg:w-80 sm: w-40 h-auto lg:rounded-3xl sm: rounded-xl mr-8 posterimg"
                      loading="eager"
                    />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h2
                      className="lg:text-6xl lg:mt-0 sm: text-3xl font-bold text-white lg:mb-5 sm: mb-2 sm: mt-3 title"
                    >
                      {movie.title} <span className="text-bold text-3xl">({movie.releaseDate.slice(0,4)})</span>
                    </motion.h2>
                    <motion.p 
                      className="lg:text-xl sm: text-md text-gray-200 lg:mb-5 sm: mb-3 line-clamp-3 overview"
                    >
                      {movie?.overview}
                    </motion.p>
                    <motion.div 
                      className="flex gap-2 lg:mb-5 sm: mb-4 flex-wrap"
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
                      className="lg:mb-5 sm: mb-4 flex gap-2"
                    >
                      <RatingCircle rating={movie?.averageRating} maxRating={10} />
                    </motion.div>

                    <motion.div 
                      className="lg:mb-5 sm: mb-4 flex gap-2"
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
                      className="bg-rose-600 text-white px-6 py-3 sm: p-1 lg:text-xl  sm: text-md rounded-lg font-bold flex items-center 
                        hover:bg-rose-700 z-50 cursor-pointer"
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

//second design

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faClock } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { poster_url, poster_url_desktop } from '../utils/constants';
// import { motion } from "framer-motion";
// import RatingCircle from './RatingCircle';
// import Loader from './admin/Loader';
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/autoplay';
// import 'swiper/css/pagination';
// import ScrollToTop from './ScrollToTop';
// import "./mainslider.css";

// export const Mainslider = ({ data, loader }) => {
//   const navigate = useNavigate();

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.6 }
//     }
//   };
    
//   return (
//     <div className="relative w-full h-screen">
//       <ScrollToTop />
//       {loader ? (
//         <Loader loading={loader} />
//       ) : (
//         <Swiper
//           modules={[Autoplay, Pagination, EffectFade]}
//           spaceBetween={0}
//           slidesPerView={1}
//           effect="fade"
//           autoplay={{
//             delay: 3000,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           className="w-full h-full select-none"
//         >
//           {data?.map((movie) => (
//             <SwiperSlide key={movie.id} className="relative cursor-grab">
//               <div className="relative w-full h-full overflow-hidden">
//                 <img
//                   src={`${poster_url_desktop}${movie?.backdropPath}`}
//                   alt={movie?.title}
//                   className="w-full h-full object-cover transform scale-105"
//                   loading="eager"
//                 />
//                 <div 
//                   className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
//                   style={{ backdropFilter: 'brightness(0.7)' }}
//                 />
                
//                 <motion.div
//                   initial="hidden"
//                   animate="visible"
//                   variants={fadeInUp}
//                   className="absolute inset-0 flex items-center px-4 lg:px-24 pt-20 lg:pt-0"
//                 >
//                   <div className="container mx-auto flex flex-col lg:flex-row items-start gap-8">
//                     <motion.div 
//                       className="relative group shrink-0"
//                       variants={fadeInUp}
//                     >
//                       <img
//                         src={`${poster_url}${movie?.posterPath}`}
//                         alt={movie?.title}
//                         className="w-40 lg:w-80 rounded-3xl shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
//                         loading="eager"
//                       />
//                       <div className="absolute inset-0 rounded-3xl transition-opacity duration-300 group-hover:bg-black/30" />
//                     </motion.div>

//                     <div className="flex-1 space-y-4 lg:space-y-6">
//                       <motion.h2
//                         variants={fadeInUp}
//                         className="text-3xl lg:text-6xl font-bold text-white tracking-tight"
//                       >
//                         {movie.title}
//                       </motion.h2>

//                       <motion.p 
//                         variants={fadeInUp}
//                         className="text-md lg:text-xl text-gray-200 line-clamp-3 lg:line-clamp-4 max-w-3xl"
//                       >
//                         {movie?.overview}
//                       </motion.p>

//                       <motion.div 
//                         variants={fadeInUp}
//                         className="flex flex-wrap gap-2"
//                       >
//                         {movie.language.map((lang) => (
//                           <span
//                             key={lang}
//                             className="px-4 py-2 text-sm lg:text-base text-white font-medium rounded-lg 
//                                      bg-white/10 backdrop-blur-sm border border-white/20 
//                                      transition-colors duration-300 hover:bg-white/20"
//                           >
//                             {lang}
//                           </span>
//                         ))}
//                       </motion.div>

//                       <motion.div 
//                         variants={fadeInUp}
//                         className="flex items-center gap-6"
//                       >
//                         <RatingCircle rating={movie?.averageRating} maxRating={10} />
//                         <span className="px-4 py-2 text-sm lg:text-base rounded-lg font-medium 
//                                      bg-white/10 backdrop-blur-sm border border-white/20 text-white
//                                      flex items-center gap-2">
//                           {movie?.adult ? '🔞 Adults Only' : '🧒 Family Friendly'}
//                         </span>
//                       </motion.div>

//                       <motion.div 
//                         variants={fadeInUp}
//                         className="flex gap-4 pt-2"
//                       >
//                         <button
//                           className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 
//                                    rounded-lg font-semibold flex items-center gap-2 
//                                    transition-all duration-300 transform hover:scale-105"
//                           onClick={() => navigate(`/slider/detail/${movie.id}`)}
//                         >
//                           <FontAwesomeIcon icon={faPlay} />
//                           Watch Now
//                         </button>
//                         <button
//                           className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 
//                                    rounded-lg font-semibold flex items-center gap-2 
//                                    backdrop-blur-sm border border-white/20 
//                                    transition-all duration-300"
//                           onClick={() => navigate(`/slider/detail/${movie.id}`)}
//                         >
//                           <FontAwesomeIcon icon={faClock} />
//                           More Info
//                         </button>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </motion.div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </div>
//   );
// };

// export default Mainslider;