import React, { useEffect, useState } from 'react'
import {doc,  collection, query, getDocs } from "firebase/firestore";
import {db} from '../../utils/firebase'

export const Feedbacksubscribe = ({movieId}) => {

    const [data , setData]  = useState([])
    console.log(data)

    


    const fetch_data = async () => {
        try {
            const movieRef = doc(db, "movies", movieId);
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
        fetch_data()
    },[])
  return (
    <div>

    </div>
  )
}
