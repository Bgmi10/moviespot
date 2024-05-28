import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { poster_url } from '../utils/constans'
import preeloader from '../img/Animation - 1716723337124.gif'
import { Recommendation } from './Recommendation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'


const Searchdetail = () => {
 

  const [data, setdata] = useState('')

  const {id} = useParams()

  useEffect(()=>{
    const fetch_search_data = async() =>{
     try{ const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`) 
      const datas = await res.json()
     
     setdata(datas)
    }
    catch(error){
       console.log(error)
    }
    }
    fetch_search_data()

   },[])
  return (
  
    <div>
      <div  className="relative flex flex-col items-center ">
      {data ? (
        <div className="relative max-w-screen-md m-4 p-4 shadow-lg rounded-lg text-white ">
          <div
            style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/w1066_and_h600_bestv2`}${data?.backdrop_path})` }}
            className="w-full h-80 bg-cover rounded-lg mb-2 relative  "
          >
           
            {/* Overlay with Poster Image */}
            <div className="absolute top-0 left-0 w-full h-full  rounded-lg   bg-gradient-to-l from-transparent to-black  p-2">
              <img src={poster_url + data?.poster_path} alt="" className="w-38 h-60 rounded-lg  " />
            </div>

          </div>

          <h1 className="text-3xl font-medium mb-2 text-gray-200">{data?.title}</h1>

          {/* Overview */}
          <p className="text-gray-400 mb-4 font-light">{data?.overview}</p>

         
          <a
            href={`https://tamilyogi.beer/${data.title}-${data?.release_date.slice(0,4)}-hd-720p-tamil-movie-watch-online/`}
            //https://tamilyogi.beer/leo-2023-hd-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/salaar-part-1-ceasefire-2023-hd-720p-tamil-movie-watch-online/c
            // /https://tamilyogi.beer/beast-2022-hdrip-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/mersal-tamil-full-movie-watch-online/
            //https://tamilyogi.beer/kaththi-2014-bluray-720p-hd-tamil-movie-watch-online-a/
            //https://tamilyogi.beer/thuppakki-2012-bluray-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/nanban-2012-hd-720p-tamil-movie-bluray-watch-online/

            className="mt-4 border-r-pink-600 border  border-t-orange-600 border-b-blue-600 border-l-purple-600  px-4 py-2 rounded-md  flex w-32  text-gray-300"
          >
            Download <FontAwesomeIcon icon={faArrowDown}  className='animate-bounce px-2 py-1  '/>

          </a>
          
          
          </div>
       
      ) : (
       <img src={preeloader} />
      )}
      </div>
     <div>
       <Recommendation  id={id}/>
      </div> 
    </div>
    
  )
}


export default Searchdetail








