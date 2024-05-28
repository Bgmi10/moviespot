import React from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'



const TamilmovieDetails = ({data}) => {
  const { id } = useParams();


  const movieDetails = data.filter((i)=> i.id === id)




  return (
    <div className="relative flex flex-col items-center ">
      {movieDetails ? (
        <div className="relative max-w-screen-md m-4 p-4 shadow-lg rounded-lg text-white">
          <div
            style={{ backgroundImage: `url(${movieDetails?.[0]?.background_path})` }}
            className="w-full h-64 bg-cover rounded-lg mb-2 relative"
          >
            {/* Overlay with Poster Image */}
            <div className="absolute top-0 left-0  w-full h-full bg-cover rounded-lg bg-gradient-to-l from-transparent to-black ">
              <img src={movieDetails?.[0]?.poster_path} alt="" className="w-38 h-60  rounded-lg " />
            </div>

    
          </div>

          <h1 className="text-3xl font-medium mb-2 text-gray-200">{movieDetails?.[0]?.title}</h1>

          {/* Overview */}
          <p className="text-gray-400 mb-4 font-light">{movieDetails?.[0]?.overview}</p>

          
          <a
            href={`https://tamilyogi.beer/${movieDetails?.[0]?.title}-hd-720p-tamil-movie-watch-online/`}
            //https://tamilyogi.beer/leo-2023-hd-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/salaar-part-1-ceasefire-2023-hd-720p-tamil-movie-watch-online/c
            // /https://tamilyogi.beer/beast-2022-hdrip-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/mersal-tamil-full-movie-watch-online/
            //https://tamilyogi.beer/kaththi-2014-bluray-720p-hd-tamil-movie-watch-online-a/
            //https://tamilyogi.beer/thuppakki-2012-bluray-720p-tamil-movie-watch-online/
            //https://tamilyogi.beer/nanban-2012-hd-720p-tamil-movie-bluray-watch-online/
            //https://tamilyogi.beer/a1-accused-no-1-2019-hd-tamil-full-movie-watch-online/

            className="mt-4 border-r-pink-600 border  border-t-orange-600 border-b-blue-600 border-l-purple-600  px-4 py-2 rounded-md  flex w-32  text-gray-300"
          >
            Download <FontAwesomeIcon icon={faArrowDown}  className='animate-bounce px-2 py-1'/>
          </a>
        </div>
      ) : (
        <p className="text-white">Movie details not found.</p>
      )}
    </div>
  );
};

export default TamilmovieDetails;
