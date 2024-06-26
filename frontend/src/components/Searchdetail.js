import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { poster_url } from '../utils/constans'
import { Recommendation } from './Recommendation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { LottieAnimation } from './lottie'
import * as preloader  from './anima.json' 
import TextRunner from './Textrunner'
import { Crewcast } from './Crewcast'

const Searchdetail = () => {
 

  const [data, setdata] = useState('')
  const {id} = useParams()
  const theme = useSelector(store => store.theme.toggletheme)
  const movietoggle = useSelector(store => store.movietoggle.togglemovie)
  const type = !movietoggle ? 'movie' : 'tv'
  

// problem is changing the tv and movie category dynamic
  useEffect(()=>{
    const fetch_search_data = async () =>{

     try{ 
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}`) 

      const datas = await res.json()

      setdata(datas)
    }

    catch(error){
       console.log(error)
    }

  }

    fetch_search_data()

   },[type])

   

   //max-w-screen-lg
  return (
  
    <div>
      
      <div  className="relative flex flex-col items-center  ">
      {data ? (
        <div className="relative max-w-screen-md m-4 p-4 shadow-lg rounded-lg text-white ">
          <div
            style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/w1066_and_h600_bestv2`}${data?.backdrop_path})` }}
            className="w-full h-80 bg-cover rounded-lg mb-2 relative "
          >
           
            {/* Overlay with Poster Image */}
            <div className="absolute top-0 left-0 w-full h-full  rounded-lg   bg-gradient-to-b from-transparent to-black  p-2">
              <img src={poster_url + data?.poster_path} alt="" className="w-38 h-60 rounded-lg  " />
            </div>

          </div>

          <h1 className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-500 to-yellow-600 lg:text-3xl font-bold sm:text-lg transition-transform duration-1000 mb-4`}>
                     {  data?.name || data?.title}
                     </h1>

          {/* Overview */}
          <p className={theme ? "text-gray-400 mb-4 font-light" :  "text-gray-500 mb-4 font-light"}>{data?.overview}</p>
            <div>
               <TextRunner  text="please use Vpn to download this movie"  duration={10}/>
             </div>
         <div className={theme ? 'text-gray-300 ' : 'text-gray-700 '}>
          <a
            // href={`https://tamilyogi.zone/${data.title}-${data?.release_date.slice(0,4)}-hd-720p-tamil-movie-watch-online/`}
            //https://tamilyogi.zone/anyone-but-you-2023-tamil-dubbed-movie-hd-720p-watch-online/
            className={"mt-6 border-r-pink-600 border  border-t-pink-600 border-b-purple-600 border-l-purple-600  px-4 py-2 rounded-md  flex w-32   " }
          >
            Download <FontAwesomeIcon icon={faArrowDown}  className={theme ? 'animate-bounce px-2 py-1  text-teal-400' : 'animate-bounce px-2 py-1  text-rose-600'}/>

          </a>
          </div>
          
          </div>
       
      ) : (
     <LottieAnimation gif={preloader}/>
      )}
      </div>
     <div>
       
       <Recommendation Recommendations = "Recommendations"  url = {`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=1`}/>
      
       <Recommendation  url={`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=2`}/>
      </div> 

      <div>
        <Crewcast data= {data} />
      </div>
      
    </div>
    
  )
}


export default Searchdetail
























