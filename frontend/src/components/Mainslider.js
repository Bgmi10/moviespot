import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import './cutom-slide.css'
import 'slick-carousel/slick/slick-theme.css';
import 'animate.css/animate.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { showflixapi } from '../utils/Showflixapi';
import moviespot_gif  from '../img/movieSpotgif.gif'




export const Mainslider = ({data}) => {
  const [animating, setAnimating] = useState(false);

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
     autoplay: true,

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
  const handleclick = (id) => {
    //window.location.href = `/searchdetail/${id}`
    console.log(id)

  }

  return (
    
      <Slider {...settings}  >
        {showflixapi?.map((i ) => (
            <div key={i.objectId}  >
            <div className="min-h-full sm: h-[600px] " >
              
               <img
                src={i.backdrop}  
                className='  w-full h-full   object-cover  object-center inset-28'
                alt=""
              />
              <div className="absolute inset-0 bg-black   bg-opacity-60  flex sm: px-4 sm: py-[148px] lg:px-[125px] lg:py-36  transition-all duration-100 0 " style={{  
    backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 50%)'
              }}> 
                <div className='lg:flex'>
               
                 <img
                  src={ !i.poster ? moviespot_gif : i.poster}
                  className={`mb-2 rounded-xl  duration-1000 lg:h-80  sm: h-40 ml-5  transition-transform ${animating ? 'transform scale-50 opacity-0' : 'transform opacity-100'}`}
                  alt=""
                />
                <div className="px-5 ">
                <h1 className={`text-white lg:text-5xl font-bold sm: text-3xl transition-transform duration-1000 ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                     {  i.name || i.title || i.movieName}
                     </h1>


                
                  <p className={`text-gray-100 sm: text-[10px] py-4   lg:text-[15px] transition-transform duration-1000 font-extralight ${animating ? 'transform -translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'}`}>
                    {i.overview || i.storyline}
                  </p>
                  <div className='mt-3' >
                  <span className={` border-2 rounded-md  lg:p-[8px] sm: p-[4px] text-white transition-transform duration-75 items-center sm: w-24  ${animating ? ' transform -translate-y-full opacity-0 ' :  'transform translate-y-0 opacity-100'}`}>
                    Play Now
                    <FontAwesomeIcon icon={faPlayCircle} className="ml-2 text-rose-600" />
                  </span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          
        ))}
      </Slider>
    
  );
};