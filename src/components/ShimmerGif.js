import React from 'react'
import gif from '../img/movieSpotgif.gif'


const ShimmerGif = () => {
  return (
    <div className='mr-4'>
    <img src={gif} alt="" className='w-32 h-48 object-cover rounded-md cursor-pointer'></img>
  </div>
  )
}

export default ShimmerGif
