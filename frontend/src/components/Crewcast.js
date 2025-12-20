import React, { useEffect, useState } from 'react'
import { profile_url } from '../utils/constants'
import Slider from 'react-slick'
import moviespot_gif  from '../img/ms1.gif'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { Feedbacksubscribe } from './Feedback/Feedbacksubscribe';

export const Crewcast = ({ id, type }) => {

   const [castdata , setcastdata] = useState(null);
   const theme = useSelector(store => store.theme.toggletheme);

   const fetch_cast_data = async () =>{
    const res = await fetch(`https://api.themoviedb.org/3/${type === "movies" ? "movie" : "tv"}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
    const json = await res.json();
    setcastdata(json);
   }
   useEffect(() =>{ 
      if (id && type) fetch_cast_data();
    },[id, type]);

  const settings = {
     infinite: true, 
     slidesToShow: 7,
     slidesToScroll: 4,
     autoplay: true, 
     autoplaySpeed: 2000,  
     arrows: false,
     responsive: [
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 3,
           slidesToScroll: 2,
           arrows: false
         },
       },
     ],  
  };
   
  return (
    <div>
        {castdata && <h1 className={theme ? 'lg:text-3xl outline-none text-xl font-bold text-white sm: px-4' : 'text-black text-2xl font-bold ml-4'}>Cast & Crew </h1>}
      <Slider className='sm: ml-8 outline-none m-6' {...settings}>
        {
          castdata?.cast?.map((i) =>( 
              <div key={i.id} className='relative w-fit px-2'>
                <div className='w-full relative'>
                  <img src={i.profile_path === null ? moviespot_gif : profile_url + i.profile_path} className='rounded-2xl w-full' alt='cast'/>
                  
                </div>
                <div className='rounded-b-2xl backdrop-blur-md px-2 py-2 w-full bg-gradient-to-t  from-black/50 to-transparent'>
                    <h1 className='text-white font-bold text-sm lg:text-xl'>{i.name}</h1>
                    <span className={theme ? 'text-gray-300 text-xs lg:text-lg z-20' : 'text-gray-700 font-light text-xs lg:text-lg '}>{i.character ? i.character : 'unknown'}</span>
                  </div>
              </div>    
          ))  
        }
      </Slider>
        <Feedbacksubscribe movieId={id}/> 
    </div>
  )
}
