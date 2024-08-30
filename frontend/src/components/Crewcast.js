import React, { useEffect, useState } from 'react'
import { profile_url } from '../utils/constans'
import Slider from 'react-slick'
import moviespot_gif  from '../img/moviespotsize_276x350.gif'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { Feedbacksubscribe } from './Feedback/Feedbacksubscribe';


export const Crewcast = ({data}) => {
    
   const [castdata , setcastdata] = useState(null)
   const theme = useSelector(store => store.theme.toggletheme);

   const id = data?.id
  
 
   

     useEffect(() =>{
        const fetch_cast_data = async () =>{
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`)
            const json = await res.json()
            setcastdata(json)
        }
        if(id){
        fetch_cast_data()}
     },[id])

     const settings = {
        infinite: true,  // Enable infinite loop
        slidesToShow: 5,
        slidesToScroll: 1,  // Change to 1 to scroll one slide at a time
        
        autoplay: true,  // Enable autoplay
        autoplaySpeed: 2000,  // Adjust autoplay speed in milliseconds
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
    <div >
         {castdata && <h1 className={ theme ? ' text-3xl font-bold  text-gray-300 sm: px-4  mt-10' :'text-gray-700  text-2xl font-bold   ml-4 mt-10'}>Cast & Crew </h1>}
          <Slider  className=' lg:ml-0 sm: ml-8 p-7' {...settings} >
        {
            castdata?.cast?.map((i) =>(
                <div key={i.id} className='mt-6'>
                    <img src={i.profile_path === null ? moviespot_gif : profile_url + i.profile_path}  className=' p-2  '/>
                    <div className='ml-3'>
                    <h1 className='text-gray-300 font-medium  text-xl text-transparent bg-clip-text  bg-gradient-to-r from-blue-400 via-yellow-500 to-yellow-600 '>{i.name} </h1>
                      <span className={theme ? 'text-gray-500  font-light text-lg' : 'text-gray-700 font-light text-lg'}>{i.character}</span>
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

// component is responsible to fetch the cast detail like img , name , character