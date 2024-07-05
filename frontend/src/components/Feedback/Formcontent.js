import React, { useEffect, useState } from 'react';
import { doc, collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";



export const Formcontent = ({ starvalue, dynamic_hash_heading, targetRatingHashtags  , movieid}) => {
  // Adjusted state to hold an object with button values and selection statuses
  const [selectedItems, setSelectedItems] = useState({});

  const [hashtag , sethashtag] = useState([])

  const [userfeedbackmessage , setuserfeedbackmessage] = useState('')

  console.log(movieid)

  const handleChange = (id, i) => {
    // Toggle the selection status for the specific item and store its value
    setSelectedItems(prev => ({
      ...prev,
      [id]: {
       
        isSelected: !prev[id]?.isSelected || false,
      
      }
    }));
   

    sethashtag(prev => [...prev , i] )

    
  };

  
  const removeUndefined = targetRatingHashtags.filter(i => i !== undefined)


  const handleformsubmit = async() =>{ 

    try{

      const movieDocRef = doc(db , 'movies' , movieid)

      const feedbackCollectionRef = collection(movieDocRef , 'feedbacks')

      const final_data = {
        movieid : movieid,
        userfeedbackhashtag :  hashtag ,
    
        rating : starvalue,
    
        userfeedbackmessag : userfeedbackmessage
       
      }

      await addDoc(feedbackCollectionRef , final_data)
    }

    catch (error){

      console.log(error)

    }

  }

  return (
    <div>
      {starvalue === 0 ? (
        <div className='mt-3'>
          <p className='text-xl font-serif text-gray-600 mt-10 text-center'>Your ratings matter!</p>
          <p className='text-center font-light text-sm text-gray-400'>They help others decide what to watch next.</p>
        </div>
      ) : (
        <div className='mt-6 '>
          <h1 className='p-2'>{dynamic_hash_heading}</h1>
          <p className='text-gray-400 font-sans text-sm p-2 '>Express yourself with hashtags!</p>
          <div className="flex flex-wrap justify-center gap-2">
            {removeUndefined.map((i, index) => (
              <button
                className={
                  selectedItems[index]?.isSelected ? 'p-2 text-white m-1 border rounded-full bg-rose-600' : 'p-2 text-rose-600 m-1 border rounded-full'
                }
                key={index}
                onClick={() => handleChange(index, i)}
              >
                {i}
              </button>
            ))}
          </div>
        </div>
      )}

<div className='mt-10  justify-center flex  mb-3'><button  disabled = {starvalue === 0} className={ starvalue === 0 ? `bg-gray-400  p-3 border-t border-b shadow-md w-80 rounded-md` :   `transition-transform bg-rose-600  p-3 border-t border-b shadow-md w-80 rounded-md`} onClick={handleformsubmit}> Sumbit your feedback </button></div>
    </div>
  );
};


// here the logic for storing the movie feedback in firestore DB 