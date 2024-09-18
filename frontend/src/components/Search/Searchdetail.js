import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Recommendation } from '../Recommendation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faClose, faStar } from '@fortawesome/free-solid-svg-icons'
import {  useSelector } from 'react-redux'
import ShareIcon from '@mui/icons-material/Share';
import { LottieAnimation } from '../lottie'
import SlowMotionVideoIcon from '@mui/icons-material/SlowMotionVideo';
import * as preloader  from '../anima.json' 
import TextRunner from '../Textrunner'
import how_to_Donload_vid from '../../img/howodownload.mp4'
import { Crewcast } from '../Crewcast'
import ReactPlayer from 'react-player'
import { Feedbackform } from '../Feedback/Feedbackform'
import { showflixapi } from '../../utils/Showflixapi'



const Searchdetail = () => {
 
  const [feedbackform , setfeedbackform] = useState(false)
  const [data, setdata] = useState('')
  const {id} = useParams()
  const theme = useSelector(store => store.theme.toggletheme)
  const movietoggle = useSelector(store => store.movietoggle.togglemovie)
  const [isshow , setisshow] = useState(false)
  const type = !movietoggle ? 'movie' : 'tv'
  console.log(data)
  
  
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

    
    const data1 = showflixapi.filter((i) => i.objectId === id)
    if(data1.length > 0){
     setdata(data1)
    }
    else{
      fetch_search_data()
    }

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
    const getImageSource = () => {
      if (data?.backdrop_path) {
        return `https://www.themoviedb.org/t/p/original/${data.backdrop_path}`;
      } else if (data?.[0]?.backdrop) {
        return data[0].backdrop;
      }
    };
    const posterimg = () => {
      if (data?.backdrop_path) {
        return `https://www.themoviedb.org/t/p/original/${data.poster_path}`;
      } else if (data?.[0]?.poster) {
        return data?.[0].poster;
      }
    };
    
    

  return (
  
    <div>
      
      <div  className=" flex flex-col items-center " >

        {feedbackform &&  <div>

             <Feedbackform data={data} toggleform={setfeedbackform} movieid={id} theme={theme}/>

          </div>}


      {data && (
        <div className="relative  inset-0 ease-in-out  shadow-lg rounded-lg text-white " >
         
            <img src={getImageSource()}  className="sm: w-full sm: h-[800px] lg:w-auto lg:h-auto object-cover  object-center"/>
            {/* Overlay with Poster Image */}
            <div
            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col  px-4  lg:py-[148px] sm: py-[120px] "
            style={{
              backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 50%)',
            }}
          >
            <div className="lg:flex  lg:py-0 ">
              <img
                src={posterimg()}
                className={`mb-2 rounded-xl duration-500 lg:h-80 sm:h-auto w-24 sm:w-auto ml-5 transition-transform `}
                style={{
                  zIndex: 10,
                  
                }}
                alt=""
               
              />
                 <div className="px-5">
                <h1 className={`text-white lg:text-5xl font-bold sm: text-3xl transition-transform duration-500`}>
                  {data?.name || data?.title || data?.[0]?.movieName }
                </h1>
                <p className={`text-gray-100  sm: text-[10px] sm: py-4 lg:text-[15px] transition-transform duration-500 font-extralight`}>
                  {data?.overview || data?.[0]?.storyline}
                </p>
        <div className="mt-3   " >

                <div className={theme ? 'text-gray-300 lg:flex   ' : 'text-gray-700 lg:flex  p-2 '}>
          <a
             href={`https://1moviesda.net/${categoryname}-${toggle_type_release_data}-movie-download/`}
            
            className={"mt-6 border-r-pink-600 border  border-t-pink-600 border-b-purple-600 border-l-purple-600  px-4 py-2 rounded-md  flex    lg:ml-0 sm: w-52 lg:w-auto " }
          >
            Download link-1  <FontAwesomeIcon icon={faArrowDown}  className={'animate-bounce px-2 py-1   ml-1  text-rose-600'}/>

          </a>
          <a
             href={`https://rubyvid.com/d/${data?.[0]?.streamruby}`}
            className={"mt-6 border-r-pink-600 border  border-t-pink-600 border-b-purple-600 border-l-purple-600  px-4 py-2 rounded-md  flex lg:ml-4 sm: w-52 lg:w-auto" }
          >
            Direct Link  <FontAwesomeIcon icon={faArrowDown}  className={'animate-bounce px-2 py-1 ml-1  text-rose-600'}/>
          
          </a>
         
          <button
            className={"mt-6  bg-gray-500    px-4 py-2 rounded-md  flex   lg:ml-4 text-black " }
            onClick={handle_how_to_download}
          >
            
          <SlowMotionVideoIcon />  How to download ?
          </button>
          <button
            className={"mt-6  bg-rose-600    px-4 py-2 rounded-md  flex   lg:ml-4 text-black " }
            onClick={handleshowfeedbackform}
          >
            
          < FontAwesomeIcon icon={faStar} className='text-yellow-300 mt-1 m-1'/>   Rate  Now
          </button>
          <button
            className={"mt-6   bg-blue-400   px-4 py-2 rounded-md  flex   lg:ml-4 text-black " }
            onClick={handleshareclick}
          >
            Share <ShareIcon className='mt-[2px]' />
          
          </button>
          
          </div>
                 
                </div>
                <div>
          {
            isshow && 
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 backdrop-blur-sm ">
               <FontAwesomeIcon icon={faClose}  onClick={() => setisshow(false)} className='text-4xl cursor-pointer text-rose-600 bg-black rounded-full p-3 mr-10 '/>
          <div className="relativ e flex justify-center items-center w-96 h-auto  lg:w-[95%] overflow-hidden shadow-lg rounded-lg m-6 transition transform duration-700 ease-in-out scale-95 opacity-0 animate-fadeIn ">
         
           
            <div className='backdrop-blur-sm mt-3 outline-none'>
            
                 <ReactPlayer url={how_to_Donload_vid }  loop={true} controls={true}  playing={true} width={"350px"} height={'200px'} style={{borderRadius : "20px"}}/>
                 </div></div>
            </div>
          }
            </div>
              </div>
            
            </div>
          </div>

          
            {/* <div>
               <TextRunner  text="please use Vpn to download this movie"  duration={10}/>
             </div> */}
     
         
          </div>
         
        

      ) }
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
























