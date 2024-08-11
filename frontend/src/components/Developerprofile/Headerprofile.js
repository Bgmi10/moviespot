import React from 'react';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Headerprofile = () => {
  return (
    <div className='justify-end flex mr-10 gap-6'>
      {/* GitHub Icon with Tooltip */}
      <div className='relative flex flex-col items-center'>
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 15,
            color: '#6e5494', // Change color on hover (GitHub purple)
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 10,
          }}
        >
          <GitHubIcon className='text-white cursor-pointer' fontSize='large'  onClick={() => {window.location.href = 'https://github.com/Bgmi10'}}/>
        </motion.div>
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='absolute bottom-10 bg-black text-white text-xs rounded py-1 px-2 opacity-0'
        >
          GitHub Profile
        </motion.div>
      </div>

      {/* LinkedIn Icon with Tooltip */}
      <div className='relative flex flex-col items-center'>
        <motion.div
          whileHover={{
            scale: 1.2,
            rotate: 15,
            color: '#0e76a8', // Change color on hover (LinkedIn blue)
          }}
          whileTap={{ scale: 0.9 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 10,
          }}
        >
         
           <LinkedInIcon className='text-blue-500 cursor-pointer  mt-[-2px]' style={{fontSize : "38px"}}  onClick={() => {window.location.href = 'https://www.linkedin.com/in/subash-profile/'}}/>
        </motion.div>
        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='absolute bottom-10 bg-black text-white text-xs rounded py-1 px-2 opacity-0'
        >
          LinkedIn Profile
        </motion.div>
      </div>
    </div>
  );
};


