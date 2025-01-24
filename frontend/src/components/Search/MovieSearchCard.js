import React, { useEffect, useState } from 'react';
import { poster_url } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";


export const MovieSearchCard = ({ data, loader, error, query }) => {

  return (
    <div className="p-5">
    {loader ? (
      <div className="flex justify-center items-center h-64">
        <span>Loading...</span>
      </div>
    ) : (
      <> 
      {data?.length === 0 && <div className="mt-20 flex justify-center"> <span className="lg:text-3xl font-bold flex gap-2">No search found for
       <span className="text-rose-600">"{query}"</span></span> </div> }
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
