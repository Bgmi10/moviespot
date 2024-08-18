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
import { showflixapi } from '../utils/Showflixapi';
import moviespot_gif  from '../img/movieSpotgif.gif'




export const Mainslider = ({data}) => {
  const [animating, setAnimating] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,

    fade: true,
    // dots: true, 
    beforeChange: () => setAnimating(true),
    afterChange: () => setAnimating(false),
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,

          autoplay : true
        },
      },
    ],

  };

  const sm = window.innerWidth >= 786

  return (
    <div >
      <Slider {...settings}  >
        {showflixapi?.map((i ) => (
          <a href={`/searchdetail/${i.objectId}`} key={i.objectId}>
            <div className="min-h-full ">
              {/* <img
                src={!sm ? poster_url+ i.backdrop_path : poster_url_desktop + i.backdrop_path}
                className='  w-full h-full  object-cover  object-center inset-0'
                alt=""
              /> */}
               <img
                src={i.backdrop}
                className='  w-full h-full   object-cover  object-center inset-0'
                alt=""
              />
              <div className="absolute inset-0 bg-black   bg-opacity-60  flex sm: px-4 sm: py-3 lg:px-[115px] lg:py-36  transition-all duration-100 0 " style={{
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 50%)'
}}> 
                <div className='lg:flex'>
                {/* <img
                  src={ poster_url  + i.poster_path}
                  className={`mb-2 rounded-lg  duration-1000 lg:h-80  sm: h-20 ml-5  transition-transform ${animating ? 'transform scale-50 opacity-0' : 'transform opacity-100'}`}
                  alt=""
                /> */}
                 <img
                  src={ !i.poster ? moviespot_gif : i.poster}
                  className={`mb-2 rounded-lg  duration-1000 lg:h-80  sm: h-20 ml-5  transition-transform ${animating ? 'transform scale-50 opacity-0' : 'transform opacity-100'}`}
                  alt=""
                />
                <div className="px-5 ">
                <h1 className={`text-white lg:text-5xl font-bold sm: text-2xl transition-transform duration-150 ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                     {  i.name || i.title || i.movieName}
                     </h1>


                
                  <p className={`text-gray-100 sm: text-[8px] py-4 w-1/2  lg:text-[11px] transition-transform duration-500 font-extralight ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                    {i.overview || i.storyline}
                  </p>
                  <div className='mt-3'>
                  <span className={` border-2 rounded-md  lg:p-[8px] sm: p-[4px] text-white transition-transform duration-100  items-center  ${animating ? ' transform -translate-y-full opacity-0' :  'transform translate-y-0 opacity-100'}`}>
                    Play Now
                    <FontAwesomeIcon icon={faPlayCircle} className="ml-2 text-rose-600" />
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