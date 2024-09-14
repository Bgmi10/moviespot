import { collection, getDoc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../../utils/firebase'

export const Adminmsgchat = () => {


  const [data , setData] = useState([])


  useEffect(() => {
     const fetch_data = async () => {
     try{ 
      const usersCollection = collection(db, 'messages'); // Assuming 'users' is the collection name
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(userList);
    }
    catch(err){
      console.log(err)
    }
     }
     fetch_data()
  },[])
  return (
    <div>
        kasdl
    </div>
  )
}
