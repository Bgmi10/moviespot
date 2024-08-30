import React, {  useState } from 'react';
import { db } from "../../utils/firebase";
import { doc, collection, addDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux'; 
import { useAuth0 } from "@auth0/auth0-react";
import { updation } from '../../utils/feedbackFormsubmissionslice';





export const Formcontent = ({ starvalue, dynamic_hash_heading, targetRatingHashtags  , movieid , theme}) => {
  // Adjusted state to hold an object with button values and selection statuses
  const [selectedItems, setSelectedItems] = useState({});
  const [ userfeedbackmessage , SetUserFeedbackMessage] = useState('')
  const [hashtag , sethashtag] = useState([])

  const { user } = useAuth0();
 

  const [id , SetId] = useState()
 
 const dispatch = useDispatch()

  const handleChange = (id, i) => {
   

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
        username : user?.name || '',
        userprofilepic : user?.picture || '',
        userfeedbackhashtag :  hashtag ,
        rating : starvalue,
        userfeedbackmessage : userfeedbackmessage,
        created_at : new Date()
       
      }

     const docRef =  await addDoc(feedbackCollectionRef , final_data)

      SetId(docRef?._key?.path?.segments[1])

      dispatch(updation( id === movieid))
      
      //
    }

    catch (error){

      console.log(error)

    }

   const t =  setTimeout(() => {
      return  window.location.href = `/searchdetail/${movieid}`
     }, 5000);

     return () => clearTimeout(t)

  }

  return (
    <>
   { <div>
      {starvalue === 0 ? (
        <div className='mt-3'>
          <p className='text-xl font-serif text-gray-600 mt-10 text-center'>Your ratings matter!</p>
          <p className='text-center font-light text-sm text-gray-400'>They help others decide what to watch next.</p>
        </div>
      ) : (
        <div className='mt-3  '>
          <h1 className={theme ? 'p-2 text-gray-200' :' text-black p-2'}>{dynamic_hash_heading}</h1>
          <p className='text-gray-400 font-sans text-sm p-2 '>Express yourself with hashtags!</p>
          <div className="  justify-center gap-2 grid grid-cols-2">
  {removeUndefined.map((i, index) => (
    <span
      className={
        selectedItems[index]?.isSelected ? 'p-1 m-1 text-center text-white  border rounded-full bg-rose-600 ' : 'text-rose-600 p-1 m-1 text-center border rounded-full'
      }
      key={index}
      onClick={() => handleChange(index, i)}
    >
      {i}
    </span>
  ))}
</div>

        </div>
      )}
      <div>

      </div>

<div className='  justify-center flex  mb-3 mt-10 '><button  disabled = {starvalue === 0} className={ starvalue === 0 ? `bg-gray-400  p-3   shadow-md w-80 rounded-md` :   `transition-transform bg-rose-600  p-3 shadow-md w-80 rounded-md`} onClick={handleformsubmit}> Sumbit your feedback </button></div>
    </div>}
    </>
  );
};


// here the logic for storing the movie feedback in firestore DB 


// herr the issue was user click on hashtag it is updating the value in arr but when user reclick the event it adding another tag , case is when user click it event re it should pop from array 