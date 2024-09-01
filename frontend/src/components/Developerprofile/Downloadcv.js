import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import pdf from './cv.pdf'

export const Downloadcv = () => {
  const controls = useAnimation();
  const [hasScrolled, setHasScrolled] = useState(false);

  const hadlepdfdownload = () => {

     window.open(pdf , '_blank')
  }

  const handleScroll = () => {
    setHasScrolled(true);
    controls.start({
      rotateY: [0, -15, 0], // Rotate on Y-axis to create door opening effect
      transition: { duration: 1, ease: 'easeInOut' },
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
   <> 
    <div   >
      <motion.div
        animate={{
          rotateY: [10, 20, 10], // Oscillate rotation
        
        }}
        transition={{
          duration: 5, // Duration of the oscillation cycle
          repeat: Infinity, // Repeat indefinitely
          ease: 'easeInOut', // Smooth easing
        }}
        style={{
          position: 'relative',
          width: '160px',
          height: '40px',
          backgroundColor: '#1f2937', // Darker slate color
          color: '#e5e7eb', // Lighter text for contrast
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.5)',
          border: '1px solid #4b5563',
          backgroundImage: 'linear-gradient(145deg, #374151, #111827)', // Premium gradient
          transformStyle: 'preserve-3d', // Enable 3D transform
          perspective: 1000, // Perspective for 3D effect
        
        }}
        
      >
        <button style={{ fontSize: '20px', fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }} onClick={hadlepdfdownload} >
          Download CV
        </button>
   
       
      </motion.div>
    </div>
  </>
  );
};
