import React from 'react';
import { motion } from 'framer-motion';
import JavascriptIcon from '@mui/icons-material/Javascript'; // Change to relevant icons for other technologies
import { FaReact, FaNodeJs, FaDatabase } from 'react-icons/fa'; // Example: Using react-icons for variety

const techs = [
  { icon: <JavascriptIcon fontSize="large" />, label: 'JavaScript' },
  { icon: <FaReact fontSize="large" />, label: 'React' },
  { icon: <FaNodeJs fontSize="large" />, label: 'Node.js' },
  { icon: <FaDatabase fontSize="large" />, label: 'Database' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const Typeeffct = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1, ease: 'easeInOut' }}
      style={{
        fontSize: '16px',
        color: '#e2e8f0',
        fontWeight: '500',
        marginTop: '10px',
        textAlign: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {techs.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5, type: 'spring' }}
            style={{
              display: 'flex',
              alignItems: 'center',
              margin: '5px 0',
            }}
          >
            <motion.div
              style={{ marginRight: '8px', fontSize: '24px', color: '#38bdf8' }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              {tech.icon}
            </motion.div>
            <span>{tech.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
