import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { poster_url } from '../../utils/constans'
import { Recommendation } from '../Recommendation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faStar } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import ShareIcon from '@mui/icons-material/Share';
import { LottieAnimation } from '../lottie'
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import * as preloader  from '../anima.json' 
import TextRunner from '../Textrunner'
import how_to_Donload_vid from '../../img/howodownload.mp4'
import { Crewcast } from '../Crewcast'
import ReactPlayer from 'react-player'
import { Feedbackform } from '../Feedback/Feedbackform'


const Searchdetail = () => {
 
  const [feedbackform , setfeedbackform] = useState(false)
  const [data, setdata] = useState('')
  const {id} = useParams()
  const theme = useSelector(store => store.theme.toggletheme)
  const movietoggle = useSelector(store => store.movietoggle.togglemovie)
  const [isshow , setisshow] = useState(false)
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

   const categoryname = !movietoggle  ? data?.title?.split(' ').join('-') : data?.name?.split(' ').join('-')
   const toggle_type_release_data = !movietoggle ? data?.release_date?.slice(0,4) : data?.last_air_date?.slice(0,4)

 
  

   const handleshareclick = async () =>{
    const url  = `https://movieapp-cd283.web.app/searchdetail/${id}`
    const whatsappUrl = `https://api.whatsapp.com/send?text=${url}`
    window.open(whatsappUrl , '_blank')
    
   }


    const handle_how_to_download = () =>{
         setisshow(true)
    }

   

    const handleshowfeedbackform = () =>{
      setfeedbackform(true)
    }

  return (
  
    <div className='mt-[-100px]'>
      
      <div  className=" flex flex-col items-center " >

        {feedbackform &&  <div>

             <Feedbackform data={data} toggleform={setfeedbackform} movieid={id} theme={theme}/>

          </div>}


      {data ? (
        <div className="relative max-w-screen-md m-4 p-4 shadow-lg rounded-lg text-white " >
          <div
            style={{ backgroundImage: `url(${`https://image.tmdb.org/t/p/w1066_and_h600_bestv2`}${data?.backdrop_path})` }}
            className="w-full h-80 bg-cover rounded-lg mb-2 relative "
          >
           
            {/* Overlay with Poster Image */}
            <div className="absolute top-0 left-0 w-full h-full  rounded-lg   bg-gradient-to-b from-transparent to-black  p-2">
              <img src={poster_url + data?.poster_path} alt="" className="w-38 h-60 rounded-lg  " />
            </div>

          </div>

          <h1 className={`text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-500 to-yellow-600 lg:text-3xl font-bold sm: text-3xl transition-transform duration-1000 mb-4`}>
                     {  data?.name || data?.title}
                     </h1>

          {/* Overview */}
          <p className={theme ? "text-gray-400 mb-4 font-light" :  "text-gray-500 mb-4 font-light"}>{data?.overview}</p>
            <div>
               <TextRunner  text="please use Vpn to download this movie"  duration={10}/>
             </div>
         <div className={theme ? 'text-gray-300 lg:flex   ' : 'text-gray-700 lg:flex  p-2 '}>
          <a
             href={`https://1moviesda.net/${categoryname}-${toggle_type_release_data}-movie-download/`}
            
            className={"mt-6 border-r-pink-600 border  border-t-pink-600 border-b-purple-600 border-l-purple-600  px-4 py-2 rounded-md  flex  sm: ml-4  sm: w-48 lg:ml-0 " }
          >
            Download link-1 <FontAwesomeIcon icon={faArrowDown}  className={theme ? 'animate-bounce px-2 py-1  text-teal-400' : 'animate-bounce px-2 py-1  text-rose-600'}/>

          </a>
          <a
             href={`https://1moviesda.net/${categoryname}-movie-download/`}
          
            // https://1moviesda.net/thuppakki-movie-download/
            className={"mt-6 border-r-pink-600 border  border-t-pink-600 border-b-purple-600 border-l-purple-600  px-4 py-2 rounded-md  flex   ml-4 sm: w-48 " }
          >
            Download link-2 <FontAwesomeIcon icon={faArrowDown}  className={theme ? 'animate-bounce px-2 py-1  text-teal-400' : 'animate-bounce px-2 py-1  text-rose-600'}/>
          
          </a>
         
          <button
            className={"mt-6  bg-gray-500    px-4 py-2 rounded-md  flex   ml-4 text-black " }
            onClick={handle_how_to_download}
          >
            
          <SlowMotionVideoIcon />  How to download ?
          </button>
          <button
            className={"mt-6  bg-rose-600    px-4 py-2 rounded-md  flex   ml-4 text-black " }
            onClick={handleshowfeedbackform}
          >
            
          < FontAwesomeIcon icon={faStar} className='text-yellow-300 mt-1 m-1'/>   Rate  Now
          </button>
          <button
            className={"mt-6   bg-blue-400   px-4 py-2 rounded-md  flex   ml-4 text-black " }
            onClick={handleshareclick}
          >
            Share <ShareIcon className='mt-[2px]' />
          
          </button>
          
          </div>
          <div>
          {
            isshow && <div className='backdrop-blur-sm mt-3'>
                 <ReactPlayer url={how_to_Donload_vid }  loop={true} controls={true}  playing={true} width={"350px"} height={'200px'} style={{borderRadius : "20px"}}/>
            </div>
          }
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
























