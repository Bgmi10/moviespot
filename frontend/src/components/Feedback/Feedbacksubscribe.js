import React, { useEffect, useState } from 'react';
import { doc, collection, query, getDocs } from "firebase/firestore";
import { db } from '../../utils/firebase';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

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
    <div className="container lg:mx-0 sm: mx-auto sm: px-4  py-9">
      {data.length > 0 && (
        <h2 className={`lg:text-3xl md:text-3xl font-bold mb-6 ${theme ? 'text-white' : 'text-black'}`}>
          Ratings & Reviews
        </h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg: m-5">
        {data?.map((i) => (
          <motion.div
            key={i.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`border-2 rounded-lg p-4 ${theme ? 'text-gray-300' : 'bg-white text-gray-700'} shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out`}
          >
            <div className='flex items-center justify-between mb-4'>
              <div className='flex items-center'>
                {i.userprofilepic ? (
                  <img
                    src={i.userprofilepic || "/placeholder.svg"}
                    alt='user profile'
                    className='h-10 w-10 rounded-full object-cover'
                  />
                ) : (
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${theme ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <FontAwesomeIcon icon={faUser} className={theme ? 'text-gray-400' : 'text-gray-600'} />
                  </div>
                )}
                <span className={`text-lg font-semibold ml-3 ${theme ? 'text-gray-300' : 'text-gray-700'}`}>
                  {i?.username || 'User'}
                </span>
              </div>
              <div className='flex items-center'>
                <FaStar className='text-yellow-500 mr-1' />
                <span className={`font-semibold ${theme ? 'text-white' : 'text-gray-700'}`}>{i.rating} / 5</span>
              </div>
            </div>
            <div className='mb-4'>
              {i.userfeedbackhashtag.map((item, index) => (
                <span
                  key={index}
                  className={`inline-block bg-rose-600 text-white text-xs font-medium px-2 py-1 rounded-full mr-2 mb-2`}
                >
                  {item}
                </span>
              ))}
            </div>
            <p className={`mb-4 ${theme ? 'text-gray-400' : 'text-gray-600'}`}>{i?.userfeedbackmessage || ''}</p>
            <div className='text-end'>  
              <span className={`text-sm ${theme ? 'text-gray-500' : 'text-gray-400'}`}>{timeAgo(i?.created_at)}</span>
            </div>
          </motion.div>
        ))}
      </div>
      {data.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`text-center sm: text-sm lg:text-lg ${theme ? 'text-gray-400' : 'text-gray-600'}`}
        >
          No reviews yet. Be the first to leave a review!
        </motion.p>
      )}
    </div>
  );
};

