import React, { useEffect, useState } from 'react'
import {LottieAnimation} from './lottie';
import *  as  animi from './anima.json'
import {settings} from '../utils/Helper'
import {poster_url} from '../utils/constans'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import moviesspotgif from '../img/movieSpotgif.gif'

 

export const Popular = ({title , apiurl, sort }) => {

  const theme = useSelector(store => store.theme.toggletheme)

    const [data, setdata] = useState('')

    const fetch_data = async () =>{
      try{  
        const res = await fetch(`${apiurl}${process.env.REACT_APP_API_KEY}&${sort}`)
        
        const data = await res.json()
      
        setdata(data)
    
        

    }

catch(error){
      console.log(error)
}
}


    useEffect(()=>{
           fetch_data()
    },[])


  return (
    <div className='lg:p-2  mt-2 '>
         <div className='flex justify-between'>
             <h2 className={theme ? "text-2xl font-medium text-gray-300 mb-4 px-2 mt-6 " : "text-2xl font-medium text-gray-800 mb-4 px-2 mt-6"}>{title}</h2>
             <a  href={`/popular-detail?apiurl=${encodeURIComponent(apiurl)}&sort=${encodeURIComponent(sort)}`} >
         <h1 className={'text-gray-400 cursor-pointer  text-md font-medium  mt-4 mr-2 py-3'  }  >More.. <FontAwesomeIcon icon={faArrowRight} /></h1>
         </a>
         </div>
      
      
         
         {!data.results  ?
         <LottieAnimation  gif= {animi}/> : 
         <Slider {...settings} >
           {
                data?.results?.map((item) =>(
                <a href={`/searchdetail/${item.id}`} key={item.id} >
                 <div > 
            

                 <img src={!item.poster_path ? moviesspotgif : poster_url + item.poster_path} className='block w-full rounded-xl p-[4px] cursor-pointer transition-transform transform hover:scale-105' alt={item.title || item.name}  />

                         
                <p className='text-gray-300 px-[26px] text-md '>{item.title || item.name} </p>
                </div>
                </a>
            )
          )
           }
          
         </Slider>}
    </div>
  
  )
}



