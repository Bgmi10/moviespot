import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import {settings} from '../utils/Helper'
import {poster_url} from '../utils/constans'
import moviespotgif from '../img/movieSpotgif.gif'

export const Recommendation = ({id}) => {
const [data,setdata] = useState('')


    useEffect(()=>{
        const fetch_recommend_data = async () =>{
         try{   const res  = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations`,{
             method:"GET",
             headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNzlhNTBjYzljNjE3YmI3YWJiNzE3ZDE4MGMwZTM1NyIsInN1YiI6IjY1YTE3OWEyMjE2MjFiMDEzMjU5NzAxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8kSxkmzsk-de6T_drytirygqdNamu0CSJokC4xYMpsw'
              }
            })

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
  <div>
   {!data ? <p className='text-gray-400 ml-[120px] font-bold'>recommendations not available</p>  : <div className='lg:ml-[105px] '>
         <h2 className="text-2xl font-mono  text-gray-300 mb-4 ml-8  mt-2 ">Recommendations</h2>
        <Slider {...settings} className='ml-5'>
         {
          data?.results?.map((item)=>(
            <a href={`/searchdetail/${item.id}`} >
            <div key={item.id}>
              <img src={data  ? poster_url + item.poster_path : moviespotgif} alt=''  className='p-2 m-2 rounded-2xl cursor-pointer'/>
              <p className='text-gray-400 ml-6 text-md font-medium'>{item.title}</p>

            </div>
            </a>
          ))
         }
        </Slider>
    </div>}
  </div>
  )
}
