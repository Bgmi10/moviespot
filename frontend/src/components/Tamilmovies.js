import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {settings} from '../utils/Helper'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LottieAnimation } from './lottie';
import * as animationData from './anima.json';





const Moviecard = ({title, data }) => {

  const theme = useSelector(store => store.theme.toggletheme)


  return (
  
     <div  className='lg:p-2'>
     <h2 className={theme ? "text-2xl font-medium text-gray-300 mb-4 px-2 mt-6 " : "text-2xl font-medium text-gray-800 mb-4 px-2 mt-2 relative"}>{title}</h2>
      {!data ? <LottieAnimation  gif={animationData}/> : <Slider {...settings}  >
         {
          
         data?.map((item,index)=> ( 
          
            <div key={index} >
              <a href={ data.length >= 13  ? `/moviedetail/nowplaying/${item.id}` : `/moviedetail/vijayhits/${item.id}`}>
               
             
              <img src={ item.poster_path } className='     border-none outline-none  rounded-xl p-[4px] cursor-pointer transition-transform transform hover:scale-105'>
              </img>
              <p className='text-gray-300 px-7 text-md'>{item.title1}</p>
              </a>
            </div>
            
          ))
         }
      </Slider>}

    </div>
  );
};

export default Moviecard;