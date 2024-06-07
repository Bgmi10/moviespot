import React, { useEffect, useState } from 'react'
import {settings} from '../utils/Helper'
import {poster_url} from '../utils/constans'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {moviespot_gif} from '../utils/constans'
import gif from '../img/movieSpotgif.gif'
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Populardetail from './Populardetail';

export const Popular = ({title , apiurl, sort}) => {

  const theme = useSelector(store => store.theme.toggletheme)

    const [data, setdata] = useState('')

 
    useEffect(()=>{
        const fetch_data = async () =>{
          try{  
            const res = await fetch(`${apiurl}${process.env.REACT_APP_API_KEY}${sort}`)
            
            const data = await res.json()
           
         
            setdata(data)

        }
   
    catch(error){
          console.log(error)
    }
}
        fetch_data()
    },[])


 
    

 
  return (
    <div className='py-4 sm:p-0 lg:p-10  '>
         <div className='flex justify-between'>
             <h2 className={theme ? "text-2xl font-medium text-gray-300 mb-4 px-4 mt-2" : "text-2xl font-medium text-gray-800 mb-4 px-4 mt-2"}>{title}</h2>
             <Link  to={`/popular-detail?apiurl=${encodeURIComponent(apiurl)}&sort=${encodeURIComponent(sort)}`} >
         <h1 className='text-gray-300 cursor-pointer' >view More</h1>
         </Link>
         </div>
      
      
         
         {data.length === 0  ?< img/> : <Slider {...settings} >
           {
                data?.results?.map((item) =>(
                <Link to={`/searchdetail/${item.id}`} key={item.id}>
                <div>
                <img src={ poster_url + item.poster_path } className='rounded-2xl p-[10px] ml-3   cursor-pointer  border-none outline-none hover:scale-105 transition-transform' alt={item.title}></img>
                <p className='text-gray-500 px-[26px] text-sm '>{item.title}</p>
                </div>
                </Link>
            )
          )
           }
          
         </Slider>}
    </div>
  
  )
}



