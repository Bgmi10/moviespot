import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Timer from './Timer'; // Ensure this is the correct path to your Timer component

const calculateStatusAndEndTime = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // Set the work hours
  const WORK_START = 9; // 9 AM
  const WORK_END = 17; // 5 PM

  if (currentHour >= WORK_START && currentHour < WORK_END) {
    // During work hours (9 AM - 5 PM)
    const endOfWorkday = new Date();
    endOfWorkday.setHours(WORK_END, 0, 0, 0);
    return { status: 'online', endTime: endOfWorkday.getTime() };
  } else {
    // Outside of work hours
    const startOfNextWorkday = new Date();

    if (currentHour >= WORK_END) {
      // After work hours, set start to the next day at 9 AM
      startOfNextWorkday.setDate(startOfNextWorkday.getDate() + 1);
    }

    startOfNextWorkday.setHours(WORK_START, 0, 0, 0);
    return { status: 'offline', endTime: startOfNextWorkday.getTime() };
  }
};


export const Headerprofile = () => {
  const [{ status, endTime }, setStatusAndEndTime] = useState(calculateStatusAndEndTime());


  useEffect(() => {
    const interval = setInterval(() => {
      setStatusAndEndTime(calculateStatusAndEndTime());
    }, 60000); // Update status every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='lg:flex lg:justify-between'>
    <Timer endTime={endTime} status={status} />
    <div className='flex justify-end mr-10 gap-3 items-center'>
      {/* Profile Picture with Animation */}
      
      <motion.div
        whileHover={{
          scale: 1.15,
          rotate: 5,
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
          transition: { type: 'spring', stiffness: 400, damping: 10 },
        }}
        style={{ position: 'relative' }}
      >
        <img
          src='https://img.freepik.com/premium-photo/cute-bald-hair-man-concept-without-beard_1057389-71897.jpg?size=626&ext=jpg&ga=GA1.1.1168591914.1718009553&semt=ais_hybrid'
          className='w-12 h-12 rounded-full border-4 border-gray-800'
          alt="Profile"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: status === 'online' ? '#34D399' : '#F87171', // Status indicator color
            border: '2px solid #000',
          }}
        />
      </motion.div>

      {/* GitHub Icon with Tooltip */}
      <div className='relative flex flex-col items-center'>
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 10,
            color: '#6e5494',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            transition: { type: 'spring', stiffness: 300, damping: 10 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <GitHubIcon className='text-white cursor-pointer' fontSize='large' onClick={() => { window.location.href = 'https://github.com/Bgmi10'; }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='absolute bottom-12 bg-gray-900 text-white text-xs rounded py-1 px-2'
        >
          GitHub Profile
        </motion.div>
      </div>

      {/* LinkedIn Icon with Tooltip */}
      <div className='relative flex flex-col items-center'>
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 10,
            color: '#0e76a8',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            transition: { type: 'spring', stiffness: 300, damping: 10 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <LinkedInIcon className='text-blue-500 cursor-pointer' style={{ fontSize: '40px' }} onClick={() => { window.location.href = 'https://www.linkedin.com/in/subash-profile/'; }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='absolute bottom-12 bg-gray-900 text-white text-xs rounded py-1 px-2'
        >
          LinkedIn Profile
        </motion.div>
      </div>

      {/* Timer Component */}
     
    </div>
    </div>
  );
};
