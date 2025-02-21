import React, { useState } from 'react';
import { poster_url } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { db } from '../../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';

export const MovieSearchCard = ({ data, loader, query, searchType, language }) => {
  const [firebaseLoader, setFirebaseLoader] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async() => {
    try {
     setFirebaseLoader(true);
     await addDoc(collection(db, "user-requests"), {
      id: Math.floor(Math.random() * 1000),
      query: query,
      type: searchType,
      language: language
     });
     setIsFormSubmit(true);
    } catch (e) {
      console.log(e);
    } finally {
      setFirebaseLoader(false);
    }
  }
  const removedLastWord = searchType.slice(0, searchType.length - 1);
  return (
    <div className="p-5">
     { isFormSubmit && 
       <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
         <FontAwesomeIcon icon={faClose} className='text-white absolute top-[200px] cursor-pointer' onClick={() => setIsFormSubmit(false)} />
       <div className="w-fit bg-gradient-to-t p-6 border-2 rounded-lg">
         <span className="block text-white text-lg">
           {`Thank you for requesting ${removedLastWord === "movie" ? removedLastWord : searchType} "${query}"`}
         </span>
         <span className="block text-white mt-2">
           We will add it soon.
         </span>
         <div className='flex flex-col w-fit gap-4'>
           <span>Mean while that time watch movies & series. </span>
           <button className='text-white bg-rose-600 p-2 rounded-lg' onClick={() => navigate("/")}>Go Home</button>
        </div>
       </div>
     </div>
    }
    {loader ? (
      <div className="flex justify-center items-center h-64">
        <span>Loading...</span>
      </div>
    ) : (
      <> 
      {data?.length === 0 &&<>
       <div className="mt-20 flex justify-center"> <span className="lg:text-3xl font-bold flex gap-2">No {searchType} found for
       <span className="text-rose-600">"{query}"</span></span> </div>
       <div className='flex justify-center mt-8'>
        <button className='p-3 px-10 font-bold py-2 rounded-lg bg-rose-600' onClick={handleSubmit}>{firebaseLoader ? <FontAwesomeIcon icon={faSpinner} spin /> : "Request movie"}</button>
        </div> 
       </>
       }
      <div className="grid sm: grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        { data?.map((movie) => (
          <Link to={`/search/detail/${movie.id}`} key={movie.id}>
            <div className="flex flex-col items-center hover:scale-105 transition-transform">
              <div className="w-full aspect-[2/3] relative overflow-hidden rounded-lg">
                <img
                  src={movie.posterPath ? `${poster_url}${movie.posterPath}` : "PLACEHOLDER_IMAGE"}
                  alt={`${movie.title} poster`}
                  className="duration-300 rounded-2xl"
                />
              </div>
              <div className="mt-2 w-full p-1 flex flex-col">
                <span className="text-white text-sm sm:text-base lg:text-xl font-bold truncate">{movie.title}</span>
                <span>({movie.releaseDate.slice(0, 4)})</span>
                <div className='flex flex-wrap gap-1 mt-1'>
                 {movie.language.map((item, index) =>  
                  <motion.h1
                  className="lg:text-[11px] bg- sm: text-[8px] px-1 rounded-xl text-rose-600 font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  key={index}
                  >{item}</motion.h1> 
                 )} 
               </div>
              </div>
             
            </div>
          </Link>
        ))}
      </div>
      </>
    )}
  </div>
  )
}
