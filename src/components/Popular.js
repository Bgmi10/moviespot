import React, { useEffect, useState } from 'react'
import {settings} from '../utils/Helper'
import {poster_url} from '../utils/constans'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moviespot from '../img/movieSpotgif.gif'
import { Link } from 'react-router-dom';

export const Popular = ({title}) => {

    const [data, setdata] = useState('')
    useEffect(()=>{
        const fetch_data = async () =>{
          try{  
            const res = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ta&page=1&api_key=${process.env.REACT_APP_API_KEY}`,)

            const data = await res.json()
            console.log(data)
            setdata(data)

        }
   
    catch(error){
          console.log(error)
    }
}
        fetch_data()
    },[])



  return (
    <div className='py-3'>
         <div className=''>
         <h2 className="text-2xl font-medium text-gray-300 mb-4 px-4 mt-2">{title}</h2>
         </div>
         
          <Slider {...settings} >
           {
      
            data?.results?.map((item) =>(
                <Link to={`/searchdetail/${item.id}`}>
                <div key={item.id}>
                  {
                    item.poster_path ? <div><img src={ poster_url + item.poster_path } className='rounded-2xl p-[10px]  ml-3  cursor-pointer hover:scale-105' alt=''></img>
                  </div>: 
                  <img src={moviespot } className='rounded-2xl p-[10px]  ml-3  cursor-pointer hover:scale-105'></img>}
                    <h1 className='text-gray-500 px-6 '>{item.title}</h1>
                </div>
                </Link>
            ))
            
           }
         </Slider>
    </div>
  )
}



