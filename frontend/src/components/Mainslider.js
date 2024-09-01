import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import moviespot_gif from '../img/movieSpotgif.gif';
import { showflixapi } from '../utils/Showflixapi';
import './cutom-slide.css'; 

export const Mainslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  const totalSlides = showflixapi.length;

  const nextSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 500); // Adjusted duration for faster transition
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Adjusted interval time for faster autoplay
    return () => clearInterval(interval);
  }, []);

  const handleclick = (id) => {
    // window.location.href = `/searchdetail/${id}`
  }

  return (
    <div className="slider-container relative ">
      {showflixapi.map((i, index) => (
        <div
          key={i.objectId}
          className={`slide cursor-pointer absolute inset-0 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
          onClick={() => handleclick(i.objectId)}
        >
          <img
            src={i.backdrop}
            className="sm: w-full sm: h-full lg:w-auto lg:h-auto object-cover object-center"
            alt=""
          />
          <div
            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col sm:flex-row px-4 py-[40px] sm:py-[148px] lg:px-[125px] lg:py-36"
            style={{
              backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 50%)',
            }}
          >
            <div className="lg:flex sm: py-32 lg:py-0">
              <img
                src={!i.poster ? moviespot_gif : i.poster}
                className={`mb-2 rounded-xl duration-500 lg:h-80 sm: h-auto w-24 sm:w-auto ml-5 transition-transform ${animating ? 'transform scale-50 opacity-0' : 'transform scale-100 opacity-100'}`}
                alt=""
              />
              <div className="px-5">
                <h1 className={`text-white lg:text-5xl font-bold sm: text-3xl transition-transform duration-500 ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                  {i.name || i.title || i.movieName}
                </h1>
                <p className={`text-gray-100  sm: text-[10px] sm: py-4 lg:text-[15px] transition-transform duration-500 font-extralight ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                  {i.overview || i.storyline}
                </p>
                <div className="mt-3  " >
                  <span className={`border-2 rounded-md lg:p-[8px] sm: p-[5px] text-white transition-transform duration-500 items-center  sm: w-24 ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}  style={{
                      
                      filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.9))',
                    }}>
                    Play Now
                    <FontAwesomeIcon icon={faPlay} className="ml-1 sm:ml-2 text-rose-600" />
                  </span>
                 
                </div>
                {/* <div className='mt-8'>
                    <span  className={`border-2 rounded-md lg:p-[8px] sm: p-[5px] text-white transition-transform duration-500 items-center  sm: w-24 ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>Download <img src='https://showflix.xyz/static/media/down.4feb75a3.gif'  className='h-7 w-7 rounded-full '/></span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Dot Indicators */}
      <ul className="slick-dots">
        {showflixapi.map((_, index) => (
          <li key={index} className={index === currentSlide ? 'slick-active' : ''}>
            <button onClick={() => setCurrentSlide(index)}></button>
          </li>
        ))}
      </ul>
    </div>
  );
};
