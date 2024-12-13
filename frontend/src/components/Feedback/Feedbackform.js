import {  faArrowRight, faClose, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {  useState } from 'react'
import { Formcontent } from './Formcontent'
import { hashtags } from '../../utils/Feedbackhashtags'
import Slider from '@mui/material/Slider';
import {  useSelector } from 'react-redux'
import * as gif from './feedBackcompletedgif.json'
import { LottieAnimation } from '../lottie'
import * as emojigif from './emoji2.json'

export const Feedbackform = ({data , toggleform , movieid , theme}) => {
  
    const [starvalue , setstarvalue] = useState(0)

    const feedbackformsubmission = useSelector(store => store.feedbackformsubmission)
  
    const handlechange = (e) =>{
        setstarvalue(e.target.value)
    } 
     
    const targetRatingHashtags = hashtags.flatMap(ratingObj => ratingObj[starvalue ]);
    const dynamic_hash_heading = hashtags.flatMap(ratingObj => ratingObj[starvalue ] ? ratingObj.title : null);

  return (
   <>
     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 backdrop-blur-md">
          <div className="relative flex justify-center items-center w-96 h-auto  lg:w-[95%] overflow-hidden shadow-lg rounded-lg m-6 transition transform duration-700 ease-in-out scale-95 animate-fadeIn">
    
          { feedbackformsubmission ?
           <div> <LottieAnimation gif={gif}   />
            <p className='text-white'>Your Feedback Is Our Beacon ! </p> 
            </div> : 
          <div className={  'w-96 h-auto  rounded-md transition-transform border' }>
           <div className={theme ? 'flex justify-evenly shadow-gray-800  shadow-md rounded-md' : 'flex justify-evenly  shadow-md rounded-md' }>
            
              <span className={theme ? 'text-white p-2  font-medium text-center m-3 ml-20' : 'text-black p-2  font-medium text-center m-3'}> How was the movie ? <p className='text-rose-600'>{data?.title || data?.[0]?.movieName}</p> </span>

              <FontAwesomeIcon icon={faClose} className={'text-gray-400 text-2xl mt-7 ml-10 cursor-pointer'} onClick={() => toggleform(false)} />

            </div>            

            <div>

                <h1 className={theme ?  'font-medium text-white p-2 mt-6 text-center' : 'text-black p-2 mt-6'}> How would you rate the movie ? </h1>
                {starvalue === 0 && <div className='mb-[-70px] mt-[-70px]'><LottieAnimation gif={emojigif}  /></div> }

            </div>
               
            <div > 
                
                 <p className='font-extralight text-sm text-center text-gray-400'> slide to rate <FontAwesomeIcon icon={faArrowRight} className='text-gray-500 text-sm' /> </p>
                 
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

          <h1 className=' font-bold text-gray-600  text-2xl ml-4'>{starvalue} </h1>  <FontAwesomeIcon icon= {faStar}  className='text-yellow-300 text-2xl '/>
      </div>

    </div>
     < Formcontent starvalue={starvalue}  dynamic_hash_heading = { dynamic_hash_heading} targetRatingHashtags={targetRatingHashtags} movieid={movieid} theme={theme}/>

    </div>}
    </div>
  </div>
</>
  )
}
