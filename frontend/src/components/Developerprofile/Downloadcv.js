import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const Downloadcv = () => {
  const controls = useAnimation();
  const [hasScrolled, setHasScrolled] = useState(false);

  const hadlepdfdownload = () => {

    const pdfurl = './cv.pdf'
     window.open(pdfurl , '_blank')
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
    <div style={{ position: 'absolute', marginLeft: '700px' }}>
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
          width: '220px',
          height: '70px',
          backgroundColor: '#1f2937', // Darker slate color
          color: '#e5e7eb', // Lighter text for contrast
          borderRadius: '12px',
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
        <span style={{ fontSize: '20px', fontWeight: 'bold', textShadow: '1px 1px 4px rgba(0, 0, 0, 0.8)' }} onClick={hadlepdfdownload}>
          Download CV
        </span>

        {/* Chains */}
        <div style={{ position: 'absolute', top: '-130px', left: '95px', height: '20px', width: '20px' }}>
          <motion.div
            style={{
              width: '1px', // Fixed width for the chain
              height: '150px',
              backgroundColor: '#d1d5db', // Lighter chain color
              transformOrigin: 'top',
              rotate: 30,
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.7)', // Enhanced shadow
              background: 'linear-gradient(145deg, #9ca3af, #6b7280)', // Gradient for chain
            }}
          />
          {/* Left Holder Dot */}
          <motion.div
            style={{
              position: 'absolute',
              left: '-4px',
              top: '0',
              width: '16px',
              height: '16px',
              backgroundColor: '#6b7280', // Dot color to match the design
              borderRadius: '50%',
              boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
        <div style={{ position: 'absolute', top: '-130px', right: '95px', height: '20px', width: '20px' }}>
          <motion.div
            style={{
              width: '1px', // Fixed width for the chain
              height: '150px',
              backgroundColor: '#d1d5db',
              transformOrigin: 'top',
              rotate: -30,
              boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.7)',
              background: 'linear-gradient(145deg, #9ca3af, #6b7280)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
