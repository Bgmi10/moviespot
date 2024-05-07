import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {tamilmovies} from '../utils/constans'
import gif from '../img/movieSpotgif.gif'




const Moviecard = () => {


  const settings = {
    infinite: false,
    slidesToShow: 8,
    slidesToScroll: 2,
    speed:500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          speed:500,
        },
      },
    ],  
   };

  //  const Shimmer = ()=>{
  //   return(
  //     <div>
  //       <Slider  {...settings} className='p-0'>
  //       <img src={gif} className='rounded-2xl p-[3px] lg:p-2 ml-3'></img>
  //       <img src={gif} className='rounded-2xl p-[3px] lg:p-2 ml-3'></img>
  //       <img src={gif} className='rounded-2xl p-[3px] lg:p-2 ml-3'></img>
  //       <img src={gif} className='rounded-2xl p-[3px] lg:p-2 ml-3'></img>
  //       </Slider>
  //     </div>
  //   )
  //  }
  return (
    <div >
     {<div className="mb-6">
      <h2 className="text-2xl font-bold text-white mb-4 ml-3 mt-2 ">Tamil Movies HD</h2>
      <Slider {...settings} className='lg:p-5'>
         {
          tamilmovies?.map((item,index)=> (
            <div key={index}>
              <img src={item.poster_path} className='rounded-2xl p-[3px]  ml-3  '>
              </img>
              <p className='text-gray-500 ml-3'>{item.title}</p>
            </div>
          ))
         }
      </Slider>
      </div>}
    </div>
  );
};

export default Moviecard;