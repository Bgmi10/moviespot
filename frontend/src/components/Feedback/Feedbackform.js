import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faClose, faStar } from '@fortawesome/free-solid-svg-icons';
import { Formcontent } from './Formcontent';
import { hashtags } from '../../utils/Feedbackhashtags';
import Slider from '@mui/material/Slider';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

export const Feedbackform = ({ data, toggleform, movieid, theme }) => {
  const [starvalue, setstarvalue] = useState(0);
  const feedbackformsubmission = useSelector(store => store.feedbackformsubmission);

  const handlechange = (e) => {
    setstarvalue(e.target.value);
  };

  const targetRatingHashtags = hashtags.flatMap(ratingObj => ratingObj[starvalue]);
  const dynamic_hash_heading = hashtags.flatMap(ratingObj => ratingObj[starvalue] ? ratingObj.title : null);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 backdrop-blur-md"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-md p-6 bg-white dark:bg-black rounded-lg shadow-xl"
        >
          {feedbackformsubmission ? (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Thank You!</h2>
              <p className="text-gray-600 dark:text-gray-300">Your feedback is our beacon!</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                  How was the movie?
                </h2>
                <button
                  onClick={() => toggleform(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faClose} className="text-2xl z-50" />
                </button>
              </div>
              <h3 className="text-xl font-semibold text-rose-600 mb-6">
                {data?.[0]?.title}
              </h3>
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                    Slide to rate <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2 text-gray-800 dark:text-white">{starvalue}</span>
                    <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-2xl" />
                  </div>
                </div>
                <Slider
                  value={starvalue}
                  onChange={handlechange}
                  step={1}
                  marks
                  min={0}
                  max={5}
                  valueLabelDisplay="auto"
                />
              </div>
              <Formcontent
                starvalue={starvalue}
                dynamic_hash_heading={dynamic_hash_heading}
                targetRatingHashtags={targetRatingHashtags}
                movieid={movieid}
                theme={theme}
              />
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

