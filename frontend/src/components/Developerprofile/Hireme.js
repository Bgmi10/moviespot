import React from 'react';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { motion } from 'framer-motion';

export const Hireme = ({ isHovered, onClick }) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '20px',
        opacity: isHovered ? 1 : 0,
        pointerEvents: 'none', // Prevents interaction when opacity is 0
        transition: 'opacity 0.5s ease-in-out',
      }}
      // Adding an animation effect when the overlay appears
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          color: '#fff',
          fontSize: '24px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer', // Show pointer cursor for clickable area
        }}
        onClick={onClick} // Trigger onClick passed as a prop
      >
        <RocketLaunchIcon style={{ color: 'red' }} /> Hire Me
      </motion.p>
    </motion.div>
  );
};
