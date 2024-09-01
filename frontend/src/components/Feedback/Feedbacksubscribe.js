import React, { useEffect, useState } from 'react';
import { doc, collection, query, getDocs } from "firebase/firestore";
import { db } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';

export const Feedbacksubscribe = ({ movieId }) => {
  const [data, setData] = useState([]);
  const theme = useSelector(store => store.theme.toggletheme);

  const fetch_data = async () => {
    try {
      const movieRef = doc(db, "movies", String(movieId));
      const feedbacksCollectionRef = collection(movieRef, "feedbacks");
      const q = query(feedbacksCollectionRef);
      const querySnapshot = await getDocs(q);

      const feedbacks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(feedbacks);
    } catch (error) {
      console.error("Error fetching feedbacks: ", error);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetch_data();
    }
  }, [movieId]);

  const timeAgo = (timestamp) => {
    const now = new Date();
    const feedbackDate = new Date(timestamp?.seconds * 1000 + timestamp?.nanoseconds / 1e6);
    const differenceInSeconds = (now - feedbackDate) / 1000;

    if (differenceInSeconds < 60) {
      return `${Math.floor(differenceInSeconds)} seconds ago`;
    } else if (differenceInSeconds < 3600) {
      return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    } else if (differenceInSeconds < 2592000) {
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    } else {
      return `${Math.floor(differenceInSeconds / 2592000)} months ago`;
    }
  };

  return (
    <>
      <div className='mt-10'>
        {data && (
          <span className={` ${theme ? ' sm: text-3xl lg:text-3xl font-bold  text-gray-300 sm: px-3 m-1  mt-10  ' : 'text-3xl font-bold  text-gray-700 sm: px-4 m-1  mt-10'} `}>
            Ratings and Reviews
          </span>
        )}
      </div>
      {data?.length === 0 ? (
        <div className='justify-center flex '>
        <p className={theme ? 'text-gray-400 font-medium text-xl mb-14 mt-5' : 'text-gray-600 text-xl font-medium mb-14 mt-5'}>No reviews</p>
        </div>
      ) : (
        <div className='flex justify-center  flex-wrap'>
          {data?.map((i) => (
            <div
              key={i.id}
              className={`border ${theme ? 'border-gray-700 bg-slate-800 w-[370px] text-gray-300' : 'border-gray-300 bg-white text-gray-700'} rounded-lg mt-10 h-auto w-2/4 p-3 m-3 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}
            >
              <div className='flex items-center justify-between mb-3 '>
                <div className='flex justify-start '>
                <img
                  src={i.userprofilepic || 'https://in.bmscdn.com/in/synopsis-new/noimguser.jpg'}
                  alt='user profile'
                  className='h-8 w-8 rounded-full'
                />
                <span className={`text-lg font-semibold ${theme ? 'text-gray-300 ml-2' : 'ml-2 text-gray-700'}`}>
                  {i?.username || 'User'}
                </span>
                </div>
                <div className='flex items-center'>
                  <FaStar className='text-yellow-500 mr-1' />
                  <span className={`font-semibold ${theme ? 'text-white' : 'text-gray-700'}`}>{i.rating} / 5</span>
                </div>
              </div>
              <div className='mt-3'>
                {i.userfeedbackhashtag.map((item, index) => (
                  <span
                    key={index}
                    className={`inline-block ${theme ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-700'} text-sm font-medium px-3 py-1 rounded-full mr-2 mb-2`}
                  >
                    #{item}
                  </span>
                ))}
              </div>
              <div>
                <p className={theme ? 'text-gray-400' : 'text-gray-600'}>{i?.userfeedbackmessage || ''}</p>
              </div>
              <div className='justify-end flex'>
                <span className={theme ? 'text-gray-500' : 'text-gray-400 text-sm'}>{timeAgo(i?.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
