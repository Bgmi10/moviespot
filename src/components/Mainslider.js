import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { main_slider } from '../utils/constans';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'animate.css/animate.min.css';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

export const Mainslider = () => {
  const [animating, setAnimating] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
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
    <div className="slider-container relative sm:p-8 lg:p-20 lg:py-2 ">
      <Slider {...settings}>
        {main_slider.map((i, index) => (
          <div key={index} className="relative">
            <img
              src={i.background_path}
              className={`lg:w-full lg:h-96 object-cover rounded-lg sm:h-40  ${animating ? 'animate__animated animate__fadeIn' : ''}`}
              alt=""
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex px-10 py-10 rounded-lg">
              <img
                src={i.poster_path}
                className={`shadow-lg mb-4 rounded-lg ${animating ? 'animate__animated animate__fadeInDown' : ''}`}
                alt=""
              />
              <div className="px-5 ">
                <h1 className={`text-white lg:text-2xl font-bold sm:text-xl ${animating ? 'animate__animated animate__fadeInDown ' : ''}`}>
                  {i.title}
                </h1>
                <p className={`text-gray-300 text-md font-light py-3 sm:text-sm  ${animating ? 'animate__animated animate__fadeInUp' : ''}`}>
                  {i.overview}
                </p>
                <span className={`border rounded-md border-l-blue-600 font-serif border-r-rose-600 border-t-purple-600 border-b-red-600 p-2 text-white bg-black  items-center ${animating ? 'animate__animated animate__fadeInDown animate__delay-1s' : ''}`}>
                  Play Now
                  <FontAwesomeIcon icon={faPlayCircle} className="ml-2" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
