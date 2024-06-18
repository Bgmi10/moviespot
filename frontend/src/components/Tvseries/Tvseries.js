import React from 'react'
import { Mainslider } from '../Mainslider'
import Usefetchmainslider from './Usefetchmainslider'


const Tvseries = () => {
  const category = 'tv'

  const data = Usefetchmainslider({category})
  const filtermovies = data?.data?.results.slice(10,15)
  return (
    <div className='text-white'>
     <Mainslider data={filtermovies} />
    </div>
  )
}


export  default Tvseries