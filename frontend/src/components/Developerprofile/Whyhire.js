import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const faqs = [
  {
    question: "What makes you a standout developer?",
    answer: "I combine strong problem-solving skills with an eye for detail and a passion for learning new technologies. My ability to adapt and implement modern frameworks effectively ensures that projects are both innovative and high-quality."
  },
  {
    question: "Are you a Gssoc`24 Contributor?",
    answer: "Yep , im contributing to gssoc projects since 2023 "
  },
  {
    question: "Can you provide examples of your recent work?",
    answer: "Absolutely! You can check out my portfolio section where I showcase various projects including web applications, interactive designs, and more. Each project demonstrates my skills in both front-end and back-end development."
  },
  {
    question: "How do you approach problem-solving?",
    answer: "I approach problem-solving methodically. I start by understanding the problem thoroughly, breaking it down into manageable parts, and then systematically addressing each part. This approach ensures that I tackle the root cause and find efficient solutions."
  },
  {
    question: "What technologies are you proficient in?",
    answer: "I am proficient in a range of technologies including React, Node.js, Javascript, Tailwindcss, Material-UI, Framer-motion, Firebase, Mongo-db, Redux, Socket.io, Express.js,    and various front-end and back-end tools. I am also comfortable with version control systems like Git and deployment processes."
  }
];

export const Whyhire = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={{ padding: '20px', minHeight: '100vh', backgroundColor: '#0f172a', marginBottom: '100px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', fontFamily: 'Arial, sans-serif', color: '#e2e8f0' }}>
        Why Hire Me?
      </h1>
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{ marginBottom: '20px' }}
        >
          <motion.div
            style={{
              cursor: 'pointer',
              padding: '15px',
              borderRadius: '10px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
              border: '1px solid #334155',
              color: '#e2e8f0',
              fontWeight: 'bold',
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              paddingRight: '40px',
            }}
            whileHover={{  backgroundColor: '#1f2937' }}
            // whileTap={{ scale: 0.98 }}
            onClick={() => handleToggle(index)}
          >
            {faq.question}
            <motion.div
              style={{ transition: 'transform 0.3s ease' }}
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
            >
              {activeIndex === index ? <ExpandLessIcon style={{ color: 'red' }} /> : <ExpandMoreIcon style={{ color: '#e2e8f0' }} />}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: activeIndex === index ? 'auto' : 0, opacity: activeIndex === index ? 1 : 0, y: activeIndex === index ? 0 : -10 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              overflow: 'hidden',
              marginTop: '10px',
              padding: '0 15px',
              color: '#d1d5db',
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              position: 'relative',
              transition: 'background-color 0.3s ease',
              margin : '2px'
            }}
          >
            {faq.answer.split(' ').map((word, idx) => (
              <span
                key={idx}
                style={{ 
                  backgroundColor: word.toLowerCase().includes('innovative' , 'and') ? '#ef4444' : 'transparent', 
                  color: word.toLowerCase().includes('innovative') ? '#ffffff' : '#d1d5db',
                  display: 'inline-block',
                  fontWeight: word.toLowerCase().includes('innovative') ? 'bold' : 'normal',
                  transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
                className='m-1'
              >
                {word}{' '}
              </span>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
