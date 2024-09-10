import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import profile from '../../img/profile.jpeg';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Typeeffct } from './Typeeffct';
import { Whyhire } from './Whyhire';
import { Headerprofile } from './Headerprofile';
import { Contactform } from './Contactform';
import { Skillls } from './Skillls';
import { Project } from './Project';
import { Freelanceprojects, opensourceprojects, projects } from './Utils/constants';
import { Githubprofile } from './Gtihub/Githubprofile';
import { Feedback } from './Feedback';
import { FaMinus } from 'react-icons/fa';

export const Developerprofile = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showForm, setShowForm] = useState(false); 
  const [messageReady, setMessageReady] = useState(false);
  const [showchat , setShowchat] = useState(true)


  const handleHireClick = () => {
   
    setShowForm(true); 
  };

  const handlemsgclick = () => {
    const whatsappapi = 'https://api.whatsapp.com/send';
    const phonenumber = '7845442450';
    const send = `${whatsappapi}?phone=${phonenumber}`;
    window.location.href = send;
  }
  
  useEffect(() => {
    // Simulate delay for thinking indic  ator before message shows
    const timer = setTimeout(() => {
      setMessageReady(true);
    }, 3000); // Show message after 3 seconds

    return () => clearTimeout(timer);
  }, []);

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
             <button disabled> Developer </button>
            </motion.p>

            <button disabled><Typeeffct /></button>
          </motion.div>
        </div>

       
        <AnimatePresence>
                <Contactform showForm={showForm} setShowform={setShowForm}/>
        </AnimatePresence>
        
     
       </div>
       
      {showchat ?   <div className="fixed bottom-5 right-5 z-10" style={{
              zIndex: 10,
              filter: `drop-shadow(0 0 7px rgba(245, 255, 255, 0.9))`
            }} >
        <div className="relative w-[300px] h-[400px] rounded-lg shadow-xl overflow-hidden">
          {/* Chat Background */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage:
                "url('https://i.pinimg.com/736x/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
            }}
          />

          {/* Chat Bubbles */}
          <div className="absolute inset-0 z-10 flex flex-col ">
            <AnimatePresence>
              {/* Received message bubble */}
              <motion.div
                className="bg-gray-200 text-gray-800 rounded-tl-xl rounded-tr-xl rounded-br-xl p-3 shadow-lg flex items-center gap-2  mb-2"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  duration: 0.5,
                  delay: 0.5,
                }}
              >
                {/* Profile Image with Status Indicator */}
                <div className="relative">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D5603AQGOYh0eJH9-0A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1706411204773?e=1731542400&v=beta&t=R--5mdmmG0Lx1mqS9Cnk4QefgsQhAAzYtHnOeOmX2Ss"
                    className="h-8 w-8 rounded-full "
                    alt="Profile"
                  />
                  <motion.div
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white"
                  />
                </div>

                <div>
                  <span className="font-semibold text-gray-900">Subash</span>
                  <p className="text-sm text-gray-600">online</p>
                </div>
              </motion.div>

              {/* Sent message bubble */}
              <motion.div
                className="bg-[#DCF8C6]  text-gray-800 rounded-tl-none rounded-tr-xl rounded-bl-xl p-2 m-4 shadow-lg w-fit "
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 80,
                  duration: 0.5,
                  delay: 1,
                }}
              >
                 {!messageReady ?  (
           <motion.div
           className="flex justify-center space-x-2 mb-3"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.5 }}
         >
           <motion.span
             className="h-2 w-2 bg-gray-500 rounded-full"
             animate={{ y: [-5, 0, -5] }}
             transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
           />
           <motion.span
             className="h-2 w-2 bg-gray-500 rounded-full"
             animate={{ y: [-5, 0, -5] }}
             transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }}
           />
           <motion.span
             className="h-2 w-2 bg-gray-500 rounded-full"
             animate={{ y: [-5, 0, -5] }}
             transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.4 }}
           />
         </motion.div>
         
          ) :  <motion.p
          className="text-sm  "
          initial={{ opacity: 0 }}           // Start invisible
          animate={{ opacity: 1 }}           // Fade in
          exit={{ opacity: 0 }}              // Fade out
          transition={{ duration: 0.8, ease: "easeInOut" }}  // Smooth transition with easing
        >
          Hey, welcome to my website! Click the button below to chat.
        </motion.p>}

               
              </motion.div>

              {/* Action to start chat */}
              <motion.div
                className="flex justify-center mt-14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                <button
                  className="bg-[#25D366] text-white py-2 px-6 rounded-full rounded-tl-none shadow-md "
                  onClick={handlemsgclick }
                >
                  Start Chat
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* WhatsApp Icon */}
        <div className="absolute bottom-[355px] right-[12px] z-20">
         <FaMinus  onClick={() => setShowchat(false)} className='cursor-pointer '/>
        </div>
      </div> :  <motion.img
            src="https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png"
            className="w-10 h-10 fixed right-0 z-10 mr-5 mb-[-2px] cursor-pointer "
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80, duration: 0.5 }}
            onClick={() => setShowchat(true)}
            style={{
              zIndex: 10,
              filter: `drop-shadow(0 0 7px rgba(245, 255, 255, 0.9))`
            }}
          />}

        <Skillls />

        <Project  projects={projects} title={'Projects'}/>
        <Project  projects={opensourceprojects} title={'Open source'}/>
        <Project projects={Freelanceprojects} title={'Freelance'} />
       
       <Githubprofile />
       <Feedback />
       <Whyhire />
    </>
  );
};
