import React, {  useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../../img/profile.jpeg';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Typeeffct } from './Typeeffct';
import { Whyhire } from './Whyhire';
import { Headerprofile } from './Headerprofile';
import { Contactform } from './Contactform';
import { Project } from './Project';
import { Freelanceprojects, opensourceprojects, projects } from './Utils/constants';
import { Githubprofile } from './Gtihub/Githubprofile';
import { Feedback } from './Feedback';
import ChatBox from './Chatbox/Chatbox';


export const Developerprofile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false); 

  const handleHireClick = () => {
   
    setShowForm(true); 
  };
  return (
    <>
      <Headerprofile />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
          flexDirection: 'column',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <AnimatePresence>
       
          {!showForm && (
            
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -200 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -200 }}
              transition={{ duration: 1, type: 'spring', stiffness: 80 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{
                position: 'relative',
                width: '200px',
                height: '200px',
                boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.2)',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <motion.img
                src={profile}
                alt="Developer Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  transition: 'opacity 0.5s ease-in-out',
                }}
                onClick={handleHireClick}
              />
             
             
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
                  pointerEvents: 'none',
                  transition: 'opacity 0.5s ease-in-out',
                }}
                
              >
                
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  
                  style={{
                    color: '#fff',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer', 
                  }}
                >
                  <RocketLaunchIcon style={{ color: 'red' }} /> Hire Me
                </motion.p>
                
              </motion.div>
              
            </motion.div>
            
          )}
          
        </AnimatePresence>
        

        <div
          style={{
            position: 'relative',
            zIndex: 10,
            marginTop: '20px',
          }}
          onClick={handleHireClick}
        >
        
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, type: 'spring' }}
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#333',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <motion.p whileHover={{ scale: 1.1 }} style={{ position: 'relative', zIndex: 1 }}>
             <button disabled> Subash Chandra Bose </button>
            </motion.p>
            <motion.p whileHover={{ scale: 1.1 }} style={{ fontSize: '16px', color: '#666', position: 'relative', zIndex: 1 }} >
             <button disabled> SDE-I </button>
            </motion.p>

            <button disabled><Typeeffct /></button>
          </motion.div>
        </div>

       
        <AnimatePresence>
                <Contactform showForm={showForm} setShowform={setShowForm}/>
        </AnimatePresence>
        
     
       </div>
       
       <ChatBox />


        <Project  projects={projects} title={'Projects'}/>
        <Project  projects={opensourceprojects} title={'Open source'}/>
        <Project projects={Freelanceprojects} title={'Freelance'} />
       
       <Feedback />
       <Whyhire />
    </>
  );
};
