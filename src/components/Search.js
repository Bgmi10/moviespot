import React from 'react'
import { poster_url } from '../utils/constans'


export const Search = ({movies}) => {

 
  return (
    <div>
      {
        movies?.results?.map((item )=>(
          <a href ={`/searchdetail/${item.id}`}>
          <div key={item.id} className='flex p-2 shadow-md  sm: ml-16 md:ml-36 lg:ml-96 '>
            <img src={ `${poster_url}${item.poster_path}` } alt='img' className='h-16 w-16 rounded-md px-1 cursor-pointer ' />
            <p className=' text-gray-400 font-serif px-4 cursor-pointer'>{item.title}</p>
            <p className='text-gray-500 '>({item.original_language})</p>  
          </div>
          </a>  
        ))
        
      }
    </div>
  )
}
