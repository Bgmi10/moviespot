import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const formatTime = (milliseconds) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Timer = ({ endTime, status }) => {
  const [timeLeft, setTimeLeft] = useState(endTime - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(endTime - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);
   
  const sm = window.innerWidth < 786  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`flex items-center gap-2 ${status === 'online' ? 'text-green-500' : 'text-red-500'}`}
      style={{ fontSize: '10px', fontFamily: 'Arial, sans-serif' }}
    >
      {!sm && <span
        className="text-gray-400"
        style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}
      >
        { status === 'online' ? 'Online - Time left until offline:' : 'Offline - Time until next workday:'}
      </span>}

     {!sm && <motion.span
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
        style={{
          fontWeight: 'bold',
          fontSize: '12px',
          color: status === 'online' ? '#10B981' : '#EF4444',
          backgroundColor: '#1F2937',
          padding: '4px 8px',
          borderRadius: '8px',
          letterSpacing: '1px',
        }}
      >
        { !sm && formatTime(timeLeft)}
      </motion.span>}
    </motion.div>
  );
};

export default Timer;
