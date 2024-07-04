import { faArrowCircleRight, faArrowRight, faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Formcontent } from './Formcontent'
import { hashtags } from '../../utils/Feedbackhashtags'

export const Feedbackform = ({data , toggleform}) => {

    const [starvalue , setstarvalue] = useState(0)

    const handlechange = (e) =>{
        setstarvalue(e.target.value)
    } 

   
    const targetRatingHashtags = hashtags.flatMap(ratingObj => ratingObj[starvalue ]);
    const dynamic_hash_heading = hashtags.flatMap(ratingObj => ratingObj[starvalue ] ? ratingObj.title : null);
    

  return (
   <>
   <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 backdrop-blur-sm    ">
          <div className="relative flex justify-center items-center w-96 h-auto  lg:w-[95%] overflow-hidden shadow-lg rounded-lg m-6 transition transform duration-700 ease-in-out scale-95 opacity-0 animate-fadeIn ">
    
       <div className='border w-96 h-auto  rounded-sm bg-white transition-transform'>
           <div className='flex justify-evenly shadow-md border-b '>
            
              <h1 className='text-black p-2  font-medium text-center m-3'> How was the movie ? <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-500 to-yellow-600  transition-transform duration-1000 '>{data?.title}</span> </h1>

              <FontAwesomeIcon icon={faClose} className='text-black  p-2  text-end text-2xl mt-3 cursor-pointer  font-mono ' onClick={() => toggleform(false)} />

            </div>            

            <div>

                <h1 className='font-medium  p-2 mt-6'> How would you rate the movie ? </h1>

            </div>
               
            <div className='mt-6'>

                 <p className='font-extralight text-sm text-center '> slide to rate <FontAwesomeIcon icon={faArrowRight} className='text-gray-500 text-sm' /> </p>
                 
                 <div className='flex'>
                 
                 

                 <input type='range' value={starvalue}   onChange={handlechange} max={5} className='w-80 ' />

                 <p className='ml-2 font-bold text-gray-600 '>{starvalue} / 5</p>

                 </div>

            </div>

           < Formcontent starvalue={starvalue}  dynamic_hash_heading = { dynamic_hash_heading} targetRatingHashtags={targetRatingHashtags}/>


            <div className='mt-10  justify-center flex  mb-3'><button className={ starvalue === 0 ? `bg-gray-400  p-3 border-t border-b shadow-md w-80 rounded-md` :   `transition-transform bg-rose-600  p-3 border-t border-b shadow-md w-80 rounded-md`} > Sumbit your feedback </button></div>
       </div>
       </div>
     </div>
   </>
  )
}
