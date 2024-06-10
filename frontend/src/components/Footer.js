import React from 'react'
import footerimg from '../img/crop footer.jpeg'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

 const Footer = () => {

  const theme = useSelector(store  => store.theme.toggletheme)
  return (
    <div className='mt-4 mb-0'>
        <img src={footerimg} className='absolute  opacity-25' /> 
       
          </div>
      
  
  )
}

export default Footer