import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { togglecategory } from '../../utils/Movieslice'

const Searchcatagory = () => {

    const dispatch = useDispatch()
    

    const handlechange = (e) =>{
        const toggle_value = e.target.value === 'movie' ? false : true
        dispatch(togglecategory(toggle_value))
    }
  return (
   <>
     <div className=''>
       <h1 className='justify-center flex text-gray-400 m-4'>Category
       <select className='ml-4 outline-none rounded-md ' onChange={handlechange} > 
        <option  value='movie'>
            Movie
        </option>
        <option value='tv' >
            Tv
        </option>
       </select>
       </h1>
       
     </div>
   </>
  )
}

export  default Searchcatagory