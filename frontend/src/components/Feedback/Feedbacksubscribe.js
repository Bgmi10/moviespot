import React, { useEffect, useState } from 'react'
import {doc,  collection, query, getDocs } from "firebase/firestore";
import {db} from '../../utils/firebase'
import { useSelector } from 'react-redux';

export const Feedbacksubscribe = ({movieId}) => {

    const [data , setData]  = useState([])
    console.log(data)
    const theme = useSelector(store => store.theme.toggletheme);
  
    const fetch_data = async () => {
        try {
            const movieRef = doc(db, "movies" , String(movieId));
            const feedbacksCollectionRef = collection(movieRef, "feedbacks");
            const q = query(feedbacksCollectionRef);
            const querySnapshot = await getDocs(q);
    
            // Correctly map over the docs property of querySnapshot
            const feedbacks = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(), // This spreads the data of the document
            }));
    
            setData(feedbacks);
        } catch (error) {
            console.error("Error fetching feedbacks: ", error);
        }
    };
    

    useEffect(() =>{
      if(movieId){
        fetch_data()
      }
    },[movieId])
  return (
    <>
    <div className='mt-10'>
         {data && <span className={theme ? 'text-2xl font-bold text-gray-300 sm: px-3 ' : 'text-2xl font-bold text-gray-700 sm: px-3'}>
                Ratings and reviews 
          </span>   } 
    </div>
      {data?.length === 0 ? <p className='text-gray-400'>loading...</p> : <div>
              {
                data?.map((i ) => (
                  <div key={i.id} className='border h-auto mt-10  w-52 p-3 m-3 justify-center'> 
                  <div className='flex '>
                    <img src='https://in.bmscdn.com/in/synopsis-new/noimguser.jpg'  className='h-8 w-8'/>
                    <span className={ theme ? 'text-gray-500 ml-3' : 'text-gray-700 ml-3'}>{i?.username || 'user'}</span>
                    </div>
                    {i.userfeedbackhashtag.map((item , index) => (
                         <span className='text-white font-normal p-2 m-2' key={index}>{item}</span>
                    ))}
                  </div>
                ))
              }
      </div>}
    </>
  )
}
