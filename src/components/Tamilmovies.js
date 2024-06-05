import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {settings} from '../utils/Helper'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';




const Moviecard = ({title, data ,playgif}) => {

  const theme = useSelector(store => store.theme.toggletheme)


  return (
  
     <div  className='lg:p-10 sm:p-0tma'>
     <h2 className={theme ? "text-2xl font-medium text-gray-300 mb-4 px-4 mt-2 relative" : "text-2xl font-medium text-gray-800 mb-4 px-4 mt-2 relative"}>{title}</h2>
      <Slider {...settings}  >
         {
         data?.map((item,index)=> (
          
            <div key={index} >
              <Link to={ data.length >= 13  ? `/moviedetail/nowplaying/${item.id}` : `/moviedetail/vijayhits/${item.id}`}>
               
              <img src={ playgif } className={playgif ? `h-5 w-6  ml-[22px] absolute mt-[9px]   rounded-l-sm hover:scale-105  `  : `h-0 w-0 `}></img>
              <img src={ item.poster_path } className='rounded-2xl p-[10px]  ml-3  cursor-pointer  border-none outline-none hover:scale-105 transition-transform'>
              </img>
              <p className='text-gray-500 px-7 text-sm'>{item.title1}</p>
              </Link>
            </div>
            
          ))
         }
      </Slider>

    </div>
  );
};

export default Moviecard;