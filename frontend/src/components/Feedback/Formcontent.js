import React, { useState } from 'react';
import { db } from "../../utils/firebase";
import { doc, collection, addDoc } from "firebase/firestore";
import { useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { updation } from '../../utils/feedbackFormsubmissionslice';
import { motion } from 'framer-motion';

export const Formcontent = ({ starvalue, dynamic_hash_heading, targetRatingHashtags, movieid, theme }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [userfeedbackmessage, setUserFeedbackMessage] = useState('');
  const [hashtag, setHashtag] = useState([]);

  const { user } = useAuth0();
  const dispatch = useDispatch();

  const handleChange = (id, i) => {
    setSelectedItems(prev => ({
      ...prev,
      [id]: {
        isSelected: !prev[id]?.isSelected || false,
      }
    }));
    setHashtag(prev => [...prev, i]);
  };

  const removeUndefined = targetRatingHashtags.filter(i => i !== undefined);

  const handleformsubmit = async () => {
    try {
      const movieDocRef = doc(db, 'movies', movieid);
      const feedbackCollectionRef = collection(movieDocRef, 'feedbacks');

      const final_data = {
        username: user?.name || '',
        userprofilepic: user?.picture || '',
        userfeedbackhashtag: hashtag,
        rating: starvalue,
        userfeedbackmessage: userfeedbackmessage,
        created_at: new Date()
      };

      const docRef = await addDoc(feedbackCollectionRef, final_data);
      dispatch(updation(docRef.id === movieid));

      setTimeout(() => {
        window.location.href = `/slider/detail/${movieid}`;
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6">
      {starvalue === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-700 dark:text-gray-200">Your ratings matter!</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">They help others decide what to watch next.</p>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{dynamic_hash_heading}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Express yourself with hashtags!</p>
          <div className="grid grid-cols-2 gap-2">
            {removeUndefined.map((i, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                  selectedItems[index]?.isSelected
                    ? 'bg-rose-600 text-white'
                    : 'text-white border bg-transparent'
                }`}
                onClick={() => handleChange(index, i)}
              >
                {i}
              </motion.button>
            ))}
          </div>
        </div>
      )}
      <textarea
        className="w-full p-3 border rounded-md outline-none bg-transparent dark:text-white"
        placeholder="Add your thoughts..."
        rows="3"
        value={userfeedbackmessage}
        onChange={(e) => setUserFeedbackMessage(e.target.value)}
      ></textarea>
      <motion.button
        whileHover={{ scale: 1.02 }}
        className={`w-full py-3 rounded-md font-bold text-white transition-colors ${
          starvalue === 0 ? 'border cursor-not-allowed' : 'bg-rose-600 hover:bg-rose-700'
        }`}
        onClick={handleformsubmit}
        disabled={starvalue === 0}
      >
        Submit your feedback
      </motion.button>
    </div>
  );
};

