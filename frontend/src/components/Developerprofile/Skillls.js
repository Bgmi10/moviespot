import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaCss3Alt, FaHtml5, FaFire } from 'react-icons/fa';
import JavascriptIcon from '@mui/icons-material/Javascript';

// Skill icons and labels
const skills = [
  { icon: <JavascriptIcon fontSize="large" style={{ color: '#f7df1e' }} />, label: 'JavaScript', level: 80 },
  { icon: <FaReact fontSize="extralarge" style={{ color: '#61dafb' }} />, label: 'React', level: 80 },
  { icon: <FaNodeJs fontSize="large" style={{ color: '#8cc84b' }} />, label: 'Node.js', level: 40 },
  { icon: <FaDatabase fontSize="large" style={{ color: '#4db33d' }} />, label: 'MongoDB', level: 40 },
  { icon: <FaCss3Alt fontSize="large" style={{ color: '#2965f1' }} />, label: 'TailwindCSS', level: 80 },
  { icon: <FaHtml5 fontSize="large" style={{ color: '#e34c26' }} />, label: 'HTML5', level: 70 },
  { icon: <FaFire fontSize="large" style={{ color: '#f39c12' }} />, label: 'Firebase', level: 40 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hover: {

    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

// Circular shadow animation CSS
const circularShadowAnimation = `
@keyframes circularShadow {
  0% {
    box-shadow: 0 0 0px rgba;
  }
  25% {
    box-shadow: 0px 0px 0px rgba(255,  0.1);
  }
  50% {
    box-shadow: 1px 0px 0px rgba(255, 0.1);
  }
  75% {
    box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.1);
  }
  100% {
    box-shadow: 0 0 0px rgba(255, 255, 255, 0.3);
  }
}
`;

const iconAnimations = {
  React: {
    animate: {
      rotate: [0, 360],
      transition: { duration: 2, repeat: Infinity },
    },
  },
  Firebase: {
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 30, -30, 0],
      transition: { duration: 1, repeat: Infinity },
    },
  },
};

export const Skillls = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="min-h-screen flex justify-center items-center bg-slate-900 relative"
    >
      {/* Inject the circular shadow animation CSS */}
      <style>{circularShadowAnimation}</style>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 p-10">
        {skills.map((skill, index) => {
          const { icon, label } = skill;
          const animation = iconAnimations[label];

          return (
            <motion.div
              key={index}
              className="relative w-40 h-48 flex flex-col items-center justify-center bg-gradient-to-t from-slate-900 to-slate-900 rounded-lg p-4"
              style={{
                position: 'relative',
                // boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.3)',
                // border: '1px solid rgba(255, 255, 255, 0.1)',
                animation: 'circularShadow 4s linear infinite',
              }}
              variants={cardVariants}
             
            >
              <motion.div
                className="text-white "
                style={{ zIndex: 10 }}
                {...(animation ? animation : {})} // Apply icon-specific animation if available
              >
                {icon}
              </motion.div>
             
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
