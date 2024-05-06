import React from 'react';


import { Link } from 'react-router-dom';
const Moviecard = () => {
  return (
    <div className='mr-4'>
    <Link to={`/tamilmoviedetails/${movie.id}`}>
      <img src={movie.poster_path} alt='' className='w-32 h-48 object-cover rounded-md cursor-pointer'></img>
    </Link>
    <p className='text-white mt-2 '>{movie.title}</p>
  </div>
  )
}

export default Moviecard
