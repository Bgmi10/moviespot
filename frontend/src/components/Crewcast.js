import React, { useEffect, useState } from 'react'
import { profile_url } from '../utils/constans'
import Slider from 'react-slick'
import moviespot_gif  from '../img/ms1.gif'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { Feedbacksubscribe } from './Feedback/Feedbacksubscribe';


export const Crewcast = ({ id }) => {
   const [castdata , setcastdata] = useState(null);
   const theme = useSelector(store => store.theme.toggletheme);

   useEffect(() =>{
      const fetch_cast_data = async () =>{
          const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
          const json = await res.json();
          setcastdata(json);
      }
      if(id)fetch_cast_data();
   },[id])

  const settings = {
     infinite: true, 
     slidesToShow: 4,
     slidesToScroll: 1,
     
     autoplay: true, 
     autoplaySpeed: 2000,  
     arrows: false,
     responsive: [
       {
         breakpoint: 768,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
           arrows: false
         },
       },
     ],  
  };
   
  return (
    <div>
        {castdata && <h1 className={theme ? 'lg:text-3xl outline-none sm: text-2xl font-bold text-white sm: px-4 mt-10' : 'text-black text-2xl font-bold ml-4 mt-10'}>Cast & Crew </h1>}
      <Slider className='sm: ml-8 outline-none m-6' {...settings}>
        {
          castdata?.cast?.map((i) =>( 
              <div key={i.id} className='relative w-fit px-2'>
                <div className='w-full relative'>
                  <img src={i.profile_path === null ? moviespot_gif : profile_url + i.profile_path} className='rounded-2xl w-full'/>
                  <div className='absolute mt-[-70px] rounded-b-2xl backdrop-blur-md px-2 py-2 w-full bg-gradient-to-t  from-black/50 to-transparent'>
                    <h1 className='text-white font-bold text-xl'>{i.name}</h1>
                    <span className={theme ? 'text-gray-300 text-lg z-20' : 'text-gray-700 font-light text-lg'}>{i.character ? i.character : 'unknown'}</span>
                  </div>
                </div>
              </div>    
          ))
        }
      </Slider>
      <div>
        <Feedbacksubscribe movieId={id}/>
      </div>
    </div>
  )
}
