import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import moviespot_gif from '../img/movieSpotgif.gif';
import { showflixapi } from '../utils/Showflixapi';
import './cutom-slide.css'; 
import { main_slider } from '../utils/constans';
import { Link } from 'react-router-dom';

export const Mainslider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false); 
  const [startPosition, setStartPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dominantColor, setDominantColor] = useState('rgba(245, 255, 255, 0.9)');
  const totalSlides = showflixapi.length;
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 500); // Adjusted duration for faster transition
  };
  
  
    const prevSlide = () => {
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Adjusted interval time for faster autoplay
    return () => clearInterval(interval);
  }, []);

  const handleclick = (id) => {
    window.location.href = `/searchdetail/${id}`
  }
 
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPosition(e.clientX); // Track initial mouse down position
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const currentPosition = e.clientX;
    const difference = startPosition - currentPosition;

    if (difference > 50) {
      nextSlide(); // Slide to the next slide if dragged left
      setIsDragging(false);
    } else if (difference < -50) {
      prevSlide(); // Slide to the previous slide if dragged right
      setIsDragging(false);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false); // End the drag operation
  };
  const handleTouchStart = (e) => {
    setStartPosition(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentPosition = e.touches[0].clientX;
    const difference = startPosition - currentPosition;

    if (difference > 50) {
      nextSlide();
      setIsDragging(false);
    } else if (difference < -50) {
      prevSlide();
      setIsDragging(false);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  return (
    <div className="slider-container relative "  ref={sliderRef}
    onMouseDown={handleMouseDown}
    onMouseMove={handleMouseMove}
    onMouseUp={handleMouseUp}
    onMouseLeave={handleMouseUp} // Handle if the mouse leaves the slider area
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}>
      
      {main_slider.map((i, index) => (
        <Link to={`/searchdetail/${i.id}`}key={i.id}>
        <div
        className={`slide cursor-pointer absolute inset-0 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: index === currentSlide ? 1 : 0 }}
          
        >
          <img
            src={i.backdrop_path || i.backdrop }
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
                src={ i.poster_path || i.poster}
                className={`mb-2 rounded-xl duration-500 lg:h-80 sm: h-auto w-24 sm:w-auto ml-5 transition-transform ${animating ? 'transform scale-50 opacity-0' : 'transform scale-100 opacity-100'}`}
                style={{
                  zIndex: 10,
                  filter: `drop-shadow(0 0 7px ${dominantColor})`
                }}
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
                  <span className={`border-2 rounded-md lg:p-[8px] sm: p-[5px] text-white transition-transform duration-500 items-center  sm: w-24 ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`} >
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
        </Link>
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
