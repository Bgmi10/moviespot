import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import {settings} from '../utils/Helper'
import {poster_url} from '../utils/constans'
import moviespotgif from '../img/movieSpotgif.gif'
import { useSelector } from 'react-redux'


export const Recommendation = ({url , Recommendations}) => {
const [data,setdata] = useState('')
const theme = useSelector(store => store.theme.toggletheme)


    useEffect(()=>{
        const fetch_recommend_data = async () =>{
         try{   const res  = await fetch(url)

            const datas= await res.json()
            setdata(datas)
           
        }
    
          catch(error){
              console.log(error)
         }
      }
        fetch_recommend_data()
    },[])

 
 
  return (
  <div className='lg:p-7'>
   {!data ? <p className='text-gray-400 ml-[120px] font-bold'>recommendations not available</p>  : <div className='lg:ml-[10px] '>
         <h2 className={theme ? "text-2xl font-mono  text-gray-300 mb-4 ml-8  mt-2 " : "text-2xl font-mono  text-gray-700 mb-4 ml-8  mt-2 "}>{Recommendations}</h2>
        <Slider {...settings} className='ml-5  '>
         {
          data?.results?.map((item)=>(
            <a href={`/searchdetail/${item.id}`}  key={item.id}>
            <div>
              <img src={item.poster_path === null  ? moviespotgif : poster_url + item.poster_path  } alt=''  className='p-2 m-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform'/>
              <p className={theme ? 'text-gray-400 ml-6 text-md font-medium' : 'text-gray-600 ml-6 text-md font-medium'} >{item.title || item.name}</p>

            </div>
            </a>
          ))
         }
        </Slider>
    </div>}
  
  </div>
  )
}
