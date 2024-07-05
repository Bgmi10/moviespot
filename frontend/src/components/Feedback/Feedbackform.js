import { faArrowCircleRight, faArrowRight, faClose, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Formcontent } from './Formcontent'
import { hashtags } from '../../utils/Feedbackhashtags'
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux'
import * as gif from './feedBackcompletedgif.json'
import { LottieAnimation } from '../lottie'
import { updation } from '../../utils/feedbackFormsubmissionslice'



export const Feedbackform = ({data , toggleform , movieid }) => {


    const [starvalue , setstarvalue] = useState(0)

    const feedbackformsubmission = useSelector(store => store.feedbackformsubmission)
    const [removethegif , SetRemoveTheGif] = useState(feedbackformsubmission)
    console.log(feedbackformsubmission)
    const dispatch = useDispatch()

    // setTimeout(() => {
    //   dispatch(updation(false))
    // }, 4000);

    const handlechange = (e) =>{
        setstarvalue(e.target.value)
    } 
     
    const targetRatingHashtags = hashtags.flatMap(ratingObj => ratingObj[starvalue ]);
    const dynamic_hash_heading = hashtags.flatMap(ratingObj => ratingObj[starvalue ] ? ratingObj.title : null);

    
    

  return (
   <>
     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 backdrop-blur-sm ">
          <div className="relative flex justify-center items-center w-96 h-auto  lg:w-[95%] overflow-hidden shadow-lg rounded-lg m-6 transition transform duration-700 ease-in-out scale-95 opacity-0 animate-fadeIn ">
    
          { feedbackformsubmission ?  <LottieAnimation gif={gif} /> : <div className='border w-96 h-auto  rounded-sm bg-white transition-transform'>
           <div className='flex justify-evenly shadow-md border-b '>
            
              <h1 className='text-black p-2  font-medium text-center m-3'> How was the movie ? <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-500 to-yellow-600  transition-transform duration-1000 '>{data?.title}</span> </h1>

              <FontAwesomeIcon icon={faClose} className='text-black  p-2  text-end text-2xl mt-3 cursor-pointer  font-mono ' onClick={() => toggleform(false)} />

            </div>            

            <div>

                <h1 className='font-medium  p-2 mt-6'> How would you rate the movie ? </h1>

            </div>
               
            <div className='mt-6'>

                 <p className='font-extralight text-sm text-center '> slide to rate <FontAwesomeIcon icon={faArrowRight} className='text-gray-500 text-sm' /> </p>
                 
                 <div className='flex items-center ml-4 w-[350px]'>

               <Slider
                   defaultValue={30}
                   value={starvalue}
                   valueLabelDisplay="auto"
                   shiftStep={30}
                   step={1}
                   marks
                   max={5}
                   onChange={handlechange}
                   size='medium'
                   color="secondary"
               />

    <h1 className=' font-bold text-gray-600  text-2xl ml-4'>{starvalue} </h1>  <FontAwesomeIcon icon={faStar}  className='text-yellow-300 text-2xl '/>
</div>

                 

            </div>

           < Formcontent starvalue={starvalue}  dynamic_hash_heading = { dynamic_hash_heading} targetRatingHashtags={targetRatingHashtags} movieid={movieid}/>


            
       </div>}
       </div>
     </div>
   </>
  )
}
