import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { poster_url } from '../utils/constans'
import preeloader from '../img/Animation - 1716723337124.gif'


const Searchdetail = () => {
 

  const [data, setdata] = useState('')

  const {id} = useParams()

  useEffect(()=>{
    const fetch_search_data = async() =>{
     try{ const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=a79a50cc9c617bb7abb717d180c0e357`) 
      const datas = await res.json()
      console.log(datas)
     setdata(datas)
    }
    catch(error){
       console.log(error)
    }
    }
    fetch_search_data()

   },[])
  return (
  
    <div className="relative flex flex-col items-center ">
      {data ? (
        <div className="relative max-w-screen-lg m-4 p-4 shadow-lg rounded-lg text-white">
          <div
            style={{ backgroundImage: `url(${poster_url}${data?.backdrop_path})` }}
            className="w-full h-64 bg-cover rounded-lg mb-2 relative   "
          >
            {/* Overlay with Poster Image */}
            <div className="absolute top-0 left-0 w-full h-full bg-cover rounded-lg">
              <img src={poster_url + data?.poster_path} alt="" className="w-38 h-40 rounded-lg" />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black p-4">
              {/* Play Button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 24"
                  stroke="white"
                  className="w-12 h-12 text-green-500"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l7 9-7 9V3z" />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-gray-200">{data?.title}</h1>

          {/* Overview */}
          <p className="text-gray-400 mb-4">{data?.overview}</p>

          
          <a
            href={`https://tamilyogi.beer/${data.title}-${data?.release_date.slice(0,4)}-hd-720p-tamil-movie-watch-online/`}
            //https://tamilyogi.beer/leo-2023-hd-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/salaar-part-1-ceasefire-2023-hd-720p-tamil-movie-watch-online/c
            // /https://tamilyogi.beer/beast-2022-hdrip-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/mersal-tamil-full-movie-watch-online/
            //https://tamilyogi.beer/kaththi-2014-bluray-720p-hd-tamil-movie-watch-online-a/
            //https://tamilyogi.beer/thuppakki-2012-bluray-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/nanban-2012-hd-720p-tamil-movie-bluray-watch-online/

            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 inline-block"
          >
            Download
          </a>
        </div>
      ) : (
       <img src={preeloader} />
      )}
    </div>
    
  )
}


export default Searchdetail