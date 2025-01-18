import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { poster_url, poster_url_desktop } from '../utils/constans';
import RatingCircle from './RatingCircle';
import Loader from './admin/Loader';  
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';

export const Mainslider = ({ data, loader }) => {
  const navigate = useNavigate();
  
  if (loader) {
    return <Loader loading={loader} />;
  }

  if (!data) {
    return <div className="flex items-center justify-center h-screen">No movies available</div>;
  }

  return (
    <div className="relative w-full h-screen overflow-hidden cursor-grab">
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
            <div className="relative w-full h-full">
              <img
                src={`${poster_url_desktop}${movie?.backdropPath}`}
                alt={movie?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 backdrop-brightness-50 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute top-32 lg:left-20 right-10 p-10 sm: flex-col lg:flex-row flex items-start">
                <div className="relative group">
                  <img
                    src={`${poster_url}${movie?.posterPath}`}
                    alt={movie?.title}
                    className="lg:w-72 sm: w-40 h-auto rounded-2xl mr-8"
                  />
                </div>
                <div className="flex-1 opacity-0 animate-fadeIn">
                  <h2 className="lg:text-6xl lg:mt-0 sm: text-4xl font-bold text-white lg:mb-5 sm: mb-4 sm: mt-3 animate-slideUp">
                    {movie.title}
                  </h2>
                  <p className="lg:text-xl sm: text-md text-gray-200 lg:mb-6 sm: mb-3 line-clamp-2 animate-slideUp delay-100">
                    {movie?.overview}
                  </p>
                  <div className="flex gap-2 lg:mb-6 sm: mb-4 animate-slideUp delay-200">
                  {movie.language.map((lang) => (
                        <span
                          key={lang}
                          className="border-2 text-white rounded-lg lg:px-4 lg:py-2 sm: p-1 lg:text-xl 
                          font-semibold sm: text-lg"
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
                      className={`px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition-colors duration-300
                        ${movie?.adult ? "bg-red-500" : "bg-blue-500"} text-white`}
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