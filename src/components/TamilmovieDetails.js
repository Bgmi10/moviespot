import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import {Recommendation} from './Recommendation'
import { useSelector } from 'react-redux';


const TamilmovieDetails = ({data}) => {
  const { Id } = useParams();
  const id  = parseInt(Id)
  const theme = useSelector(store => store.theme.toggletheme)

 const movieDetails = data.filter((item) => item.id === id)

  return (
    <div>
    <div className="relative flex flex-col items-center ">
      {movieDetails ? (
        <div className="relative  max-w-screen-md m-4 p-4 shadow-lg rounded-lg ">
          <div
            style={{ backgroundImage: `url(${movieDetails?.[0]?.background_path})` }}
            className="w-full h-80
             bg-cover rounded-lg mb-2 relative"
          >
            {/* Overlay with Poster Image */}
            <div className="absolute top-0 left-0  w-full h-full bg-cover rounded-lg bg-gradient-to-b from-transparent to-black ">
              <img src={movieDetails?.[0]?.poster_path} alt="" className="w-38 h-60  rounded-lg " />
            </div>

    
          </div>

          <h1 className={theme ? "text-3xl font-medium mb-2 text-gray-200" : "text-3xl font-medium mb-2 text-gray-600"}>{movieDetails?.[0]?.title}</h1>

         
          <p className={theme ? " text-gray-400 mb-4 font-light" : " text-gray-500 mb-4 font-light"}>{movieDetails?.[0]?.overview}</p>

          <div className={theme ? 'text-gray-300 ' : 'text-gray-700'}>
          <a
            href={`https://tamilyogi.beer/${movieDetails?.[0]?.title}-hd-720p-tamil-movie-watch-online/`}
            className="mt-4 border-r-pink-600 border border-t-pink-600 border-b-purple-600 border-l-purple-600  px-4 py-2 rounded-md  flex w-32  "
          >
            Download <FontAwesomeIcon icon={faArrowDown}  className={ theme ?'animate-bounce px-2 py-1 text-teal-400 ' : 'animate-bounce px-2 py-1 text-rose-600 '}/>
          </a>
          </div>
        </div>
      ) : (
        <p className="text-white">Movie details not found.</p>
      )}

      
    </div>
    <div >
        <Recommendation id={id} />
      </div>
    </div>
  );
};

export default TamilmovieDetails;
