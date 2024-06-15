import { faPlay, faSearch, faTv } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import React from 'react'

export const Bottomnavbar = () => {
  return (
    <div className='flex justify-between px-5 '>
      <Link to={'/'}>
        <FontAwesomeIcon icon={faPlay}  className='text-white text-2xl'/>
      </Link>
        <Link to ='/tv-series'>
        <FontAwesomeIcon icon={faTv}  className='text-white text-2xl'/>
        </Link>
        <FontAwesomeIcon icon={faSearch}  className='text-white text-2xl'/>
    </div>
  )
}
