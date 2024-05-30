import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gif from '../img/movieSpotgif.gif'
import {settings} from '../utils/Helper'
import { Link } from 'react-router-dom';




const Moviecard = ({title, data ,playgif}) => {


  return (
    <div>
     <div className="">
     <h2 className="text-2xl font-medium text-gray-300 mb-4 px-4 mt-2 ">{title}</h2>
      <Slider {...settings} >
         {
         data?.map((item,index)=> (
          
            <div key={index} >
              <Link to={ data.length >= 13  ? `/moviedetail/nowplaying/${item.id}` : `/moviedetail/vijayhits/${item.id}`}>
               
              <img src={ playgif } className={playgif ? `h-5 w-6  ml-[22px] absolute mt-[9px]   rounded-l-sm hover:scale-105  `  : `h-0 w-0 `}></img>
              <img src={item ? item.poster_path : gif} className='rounded-2xl p-[10px]  ml-3  cursor-pointer  border-none outline-none hover:scale-105'>
              </img>
              <p className='text-gray-500 px-6'>{item.title}</p>
              </Link>
            </div>
            
          ))
         }
      </Slider>
      </div>
    </div>
  );
};

export default Moviecard;