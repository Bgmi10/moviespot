import React from 'react'
import footerimg from '../img/crop footer.jpeg'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

 const Footer = () => {

  const theme = useSelector(store  => store.theme.toggletheme)
  return (
    <div className='mt-4 mb-0'>
        <img src={footerimg} className='absolute  opacity-30' /> 
       
  
          <div className='relative' >
            <div className='flex px-5 py-5'>
            <FontAwesomeIcon icon={faPlay}  className='text-rose-600  py-[2px] text-xl'/>
          <h1 className='text-rose-600 px-1 text-md'>Movie<span className={theme ? 'text-white' : 'text-black'}>Spot</span></h1>
          </div>
          </div>
          </div>
      
  
  )
}

export default Footer