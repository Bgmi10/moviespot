import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown , faClose  } from '@fortawesome/free-solid-svg-icons'
import {Recommendation} from './Recommendation'
import { useSelector } from 'react-redux';
import { Share, SlowMotionVideo } from '@mui/icons-material';

const TamilmovieDetails = ({data}) => {
  const { Id } = useParams()
  const id  = parseInt(Id)
  const theme = useSelector(store => store.theme.toggletheme)
  const [isshow , setisshow] = useState(false)

 const movieDetails = data.filter((item) => item.id === id)
 const movietoggle = useSelector(store => store.movietoggle.togglemovie)
 const categoryname = !movietoggle  ? data?.title?.split(' ').join('-') : data?.name?.split(' ').join('-')
 const toggle_type_release_data = !movietoggle ? data?.release_date?.slice(0,4) : data?.last_air_date?.slice(0,4)
 
 const handle_how_to_download = () =>{
  setisshow(true)
}


const handleshareclick = async () =>{
  const url  = `https://movieapp-cd283.web.app/searchdetail/${id}`
  const whatsappUrl = `https://api.whatsapp.com/send?text=${url}`
  window.open(whatsappUrl , '_blank')
  
 }

  return (
    <div className=''>
    <div className="relative flex flex-col items-center ">
    {movieDetails && (
        <div className="relative  inset-0 ease-in-out  shadow-lg rounded-lg text-white " >
         
            <img src={'https://www.themoviedb.org/t/p/original/' + movieDetails?.[0].background_path}  className="sm: w-full sm: h-[800px] lg:w-auto lg:h-auto object-cover object-center "/>
            {/* Overlay with Poster Image */}
            <div
            className="absolute inset-0 bg-black bg-opacity-60 flex flex-col  px-4  lg:py-[148px] sm: py-[120px] "
            style={{
              backgroundImage: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 20%, rgba(0, 0, 0, 0) 50%)',
            }}
          >
            <div className="lg:flex  lg:py-0 ">
              <img
                src={'https://www.themoviedb.org/t/p/original/' +  movieDetails?.[0].poster_path}
                className={`mb-2 rounded-xl duration-500 lg:h-80 sm:h-auto w-24 sm:w-auto ml-5 transition-transform `}
                style={{
                  zIndex: 10,
                  
                }}
                alt=""
               
              />
                 <div className="px-5">
                <h1 className={`text-white lg:text-5xl font-bold sm: text-3xl transition-transform duration-500`}>
                  {movieDetails?.[0].name || movieDetails?.[0].title || movieDetails?.[0].movieName}
                </h1>
                <p className={`text-gray-100  sm: text-[10px] sm: py-4 lg:text-[15px] transition-transform duration-500 font-extralight`}>
                  {movieDetails?.[0].overview ||movieDetails?.[0].storyline}
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
             href={`https://1moviesda.net/${categoryname}-movie-download/`}
          
            // https://1moviesda.net/thuppakki-movie-download/
            className={"mt-6 border-r-pink-600 border  border-t-pink-600 border-b-purple-600 border-l-purple-600  px-4 py-2 rounded-md  flex lg:ml-4 sm: w-52 lg:w-auto" }
          >
            Download link-2 <FontAwesomeIcon icon={faArrowDown}  className={'animate-bounce px-2 py-1 ml-1  text-rose-600'}/>
          
          </a>
         
          <button
            className={"mt-6  bg-gray-500    px-4 py-2 rounded-md  flex   lg:ml-4 text-black " }
            onClick={handle_how_to_download}
          >
            
          <SlowMotionVideo />  How to download ?
          </button>
          
          <button
            className={"mt-6   bg-blue-400   px-4 py-2 rounded-md  flex   lg:ml-4 text-black " }
            onClick={handleshareclick}
          >
            Share <Share className='mt-[2px]' />
          
          </button>
          
          </div>
                 
                </div>
                <div>
          {
            isshow && 
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 backdrop-blur-sm ">
               <FontAwesomeIcon icon={faClose}  onClick={() => setisshow(false)} className='text-4xl cursor-pointer text-rose-600 bg-black rounded-full p-3 mr-10 '/>
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
         
        

      )}

      
    </div>
    <div >
    <Recommendation Recommendations = "Recommendations"  url = {`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=1`}/>
    <Recommendation  url={`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&page=2`}/>
      </div>
    </div>
  );
};

export default TamilmovieDetails;
