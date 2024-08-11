import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaCss3Alt, FaHtml5, FaFire } from 'react-icons/fa';
import JavascriptIcon from '@mui/icons-material/Javascript';

// Sample skill data with levels
const skills = [
  { icon: <JavascriptIcon fontSize="large" style={{ color: '#f7df1e' }} />, label: 'JavaScript', level: 80 },
  { icon: <FaReact fontSize="large" style={{ color: '#61dafb' }} />, label: 'React', level: 80 },
  { icon: <FaNodeJs fontSize="large" style={{ color: '#8cc84b' }} />, label: 'Node.js', level: 40 },
  { icon: <FaDatabase fontSize="large" style={{ color: '#4db33d' }} />, label: 'MongoDB', level: 40 },
  { icon: <FaCss3Alt fontSize="large" style={{ color: '#2965f1' }} />, label: 'TailwindCSS', level: 80 },
  { icon: <FaHtml5 fontSize="large" style={{ color: '#e34c26' }} />, label: 'HTML5', level: 70 },
  { icon: <FaFire fontSize="large" style={{ color: '#f39c12' }} />, label: 'Firebase', level: 40 },
];

// Animation Variants
const hexagonVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: 0 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: [0, 15, -15, 0],
    backgroundColor: '#2d3748', // Slightly lighter shade on hover
    transition: {
      duration: 0.6,
      ease: 'easeInOut',
      backgroundColor: { duration: 0.3 },
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

export const Skillls = () => {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
        className="flex justify-center items-center flex-wrap gap-8 p-10"
        style={{ color: '#e2e8f0' }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={hexagonVariants}
            whileHover="hover"
            className="relative w-28 h-32"
            style={{
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              backgroundColor: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              textAlign: 'center',
              padding: '10px',
              cursor: 'pointer',
              boxShadow: '0px 10px 15px rgba(0, 0, 0, 0.4)',
              border: '2px solid #38bdf8', // Default border color
              transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <motion.div
              style={{ fontSize: '30px' }}
              whileHover={{ scale: 1.3, rotate: [0, 15, -15, 0] }}
            >
              {skill.icon}
            </motion.div>
            <span style={{ marginTop: '10px', fontSize: '14px', fontWeight: 'bold' }}>
              {skill.label}
            </span>
            <span style={{ fontSize: '12px', color: '#f1f5f9' }}>{skill.level}%</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
