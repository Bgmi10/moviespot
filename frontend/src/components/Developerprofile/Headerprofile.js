import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Timer from './Timer'; 
import pdf from './cv.pdf';

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
   

  
  const hadlepdfdownload = () => {

    window.open(pdf , '_blank')
 }

  return (
    <div className='lg:flex lg:justify-between p-9'>
    <Timer endTime={endTime} status={status} />
    <div className='flex justify-end mr-10 gap-3 items-center'>
      
        <motion.div whileHover={{
            scale: 1.2,
            rotate: 10,
            color: '#0e76a8',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            transition: { type: 'spring', stiffness: 600, damping: 10 },
          }}
          whileTap={{ scale: 0.9 }}>
        <img src='https://cdn-icons-png.flaticon.com/128/1091/1091007.png'style={{ fontSize: '20px', fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }} className='h-10 w-10 cursor-pointer' alt='resume' onClick={hadlepdfdownload}  />
      </motion.div>

      <div className='relative flex flex-col items-center'>
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 10,
            color: '#6e5494',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            transition: { type: 'spring', stiffness: 600, damping: 10 },
            
          }}
          whileTap={{ scale: 0.9 }}
         >
          <GitHubIcon className='text-white cursor-pointer' fontSize='large' onClick={() => { window.location.href = 'https://github.com/Bgmi10'; }} />
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
            transition: { type: 'spring', stiffness: 600, damping: 10 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <LinkedInIcon className='text-blue-500 cursor-pointer' style={{ fontSize: '40px' }} onClick={() => { window.location.href = 'https://www.linkedin.com/in/subash-profile/'; }} />
        </motion.div>
       
      </div>
      <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 10,
            color: '#0e76a8',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            transition: { type: 'spring', stiffness: 600, damping: 10 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <img src='https://www.f-cdn.com/assets/main/en/assets/badges/preferred-freelancer/preferred-freelancer-v3.svg' className='h-10 w-10 cursor-pointer' onClick={() => { window.location.href = 'https://www.freelancer.in/u/subssh9'; }} />
        </motion.div>
     

    </div>
    </div>
  );
};
