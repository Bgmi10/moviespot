import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import {poster_url} from '../utils/constants'
import moviespotgif from '../img/movieSpotgif.gif'
import { useSelector } from 'react-redux'


export const Recommendation = ({url , Recommendations}) => {
const [data,setdata] = useState(null);
const theme = useSelector(store => store.theme.toggletheme);

const fetch_recommend_data = async () =>{
  try{   

     const res  = await fetch(url) 
     const datas= await res.json()
     setdata(datas)
 }

  catch(error){
       console.log(error)
     }
  }

    useEffect(()=>{
        fetch_recommend_data()
    },[])

 
  return (
  <div >
   {!data ? <p className='text-gray-400 ml-[120px] font-bold'>Loading...</p>  : <div>
         <h2 className={theme ? "text-3xl font-bold  text-gray-300  ml-4  mt-10 " : "text-2xl font-bold  text-gray-700 mb-4 ml-4 mt-2 "}>{Recommendations}</h2>
        <Slider>
         {
          data?.results?.map((item)=>(
            <a href={`/searchdetail/${item.id}`}  key={item.id}>
            <div className='mt-10'>
              <img src={item.poster_path === null  ? moviespotgif : poster_url + item.poster_path  } alt=''  className='p-1 m-2 rounded-2xl cursor-pointer hover:scale-105 transition-transform'/>
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
