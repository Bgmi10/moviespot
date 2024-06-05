import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { main_slider } from '../utils/constans';
import 'animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const Mainslider = () => {
  const [animating, setAnimating] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    dots: true,
    beforeChange: () => setAnimating(true),
    afterChange: () => setAnimating(false),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="slider-container relative sm: p-4 lg:p-16 lg:py-2">
      <Slider {...settings}>
        {main_slider.map((i) => (
          <Link to={`/searchdetail/${i.id}`} key={i.id}>
            <div className="relative">
              <img
                src={i.background_path}
                className={`lg:w-full lg:h-96 object-cover rounded-lg sm:h-40 transition-opacity duration-1000 ${animating ? 'opacity-0' : 'opacity-100'}`}
                alt=""
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex sm: px-4 sm: py-4 lg:px-10 lg:py-10 rounded-lg transition-all duration-100 0 ">
                <img
                  src={i.poster_path}
                  className={`shadow-lg mb-4 rounded-lg  duration-1000   transition-transform ${animating ? 'transform scale-90 opacity-0' : 'transform scale-100 opacity-100'}`}
                  alt=""
                />
                <div className="px-5">
                  <h1 className={`text-white lg:text-2xl font-bold sm:text-sm transition-transform duration-1000 ${animating ? 'transform translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                    {i.title}
                  </h1>
                  <p className={`text-gray-300 text-md font-light py-3 lg:text-sm transition-transform duration-1000 ${animating ? 'transform translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                    {i.overview}
                  </p>
                  <div className=''>
                  <span className={`   border rounded-md border-l-blue-600 font-serif border-r-rose-600 border-t-purple-600 border-b-red-600 lg:p-2 text-white bg-black items-center  ${animating ? ' transform translate-y-10 opacity-0' :  'animate__animated animate__fadeIn'}`}>
                    Play Now
                    <FontAwesomeIcon icon={faPlayCircle} className="ml-2" />
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};