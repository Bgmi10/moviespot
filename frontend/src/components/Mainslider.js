import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import './cutom-slide.css'
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { poster_url, poster_url_desktop } from '../utils/constans';



export const Mainslider = ({data}) => {
  const [animating, setAnimating] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    //autoplaySpeed: 5000,
    fade: true,
    dots: true, 
    beforeChange: () => setAnimating(true),
    afterChange: () => setAnimating(false),
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          autoplaySpeed: 3000,
          autoplay : true
        },
      },
    ],
  };

  return (
    <div className="slider-container ">
      <Slider {...settings} >
        {data?.map((i ) => (
          <a href={`/searchdetail/${i.id}`} key={i.id}>
            <div className="">
              <img
                src={poster_url_desktop + i.backdrop_path}
                className={` w-full transition-opacity duration-1000 ${animating ? 'opacity-0' : 'opacity-100'}`}
                alt=""
              />
              <div className="absolute inset-0 bg-black   bg-opacity-70 bg-gradient-to-tb from-black flex sm: px-4 sm: py-3 lg:px-36 lg:py-10  transition-all duration-100 0 ">
                <div className='lg:flex'>
                <img
                  src={ poster_url + i.poster_path}
                  className={`mb-2 rounded-lg  duration-1000 lg:h-80  sm: h-20 ml-5  transition-transform ${animating ? 'transform scale-90 opacity-0' : 'transform scale-100 opacity-100'}`}
                  alt=""
                />
                <div className="px-5 ">
                <h1 className={`text-white lg:text-5xl font-bold sm: text-2xl transition-transform duration-1000 ${animating ? 'transform translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                     {  i.name || i.title}
                     </h1>


                
                  <p className={`text-gray-100 sm: text-[4px] py-4  lg:text-[14px] transition-transform duration-1000 font-extralight ${animating ? 'transform translate-y-10 opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                    {i.overview}
                  </p>
                  <div className='mt-3'>
                  <span className={` border-2 rounded-md  lg:p-[8px] sm: p-[4px] text-white   items-center  ${animating ? ' transform translate-y-10 opacity-0' :  'animate__animated animate__fadeIn'}`}>
                    Play Now
                    <FontAwesomeIcon icon={faPlayCircle} className="ml-2 text-blue-500" />
                  </span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </Slider>
    </div>
  );
};