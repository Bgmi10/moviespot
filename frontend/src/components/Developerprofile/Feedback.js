import React from 'react';
import { motion } from 'framer-motion';

export const Feedback = () => {

  const cardVariants = {
    initial: (i) => ({
      y: i * 10, // Small initial offset to stagger cards
      opacity: 0,
    }),
    animate: (i) => ({
      y: i * -30 - 300, // Reduced vertical movement for smoother transition
      opacity: 1,
      scale: 1,
      transition: {
        duration: 15, // Slower animation
        ease: [0.4, 0, 0.2, 1], // Smooth easing for readability
        repeat: Infinity,
        repeatType: 'reverse', // Reverse direction instead of sudden reset
      },
    }),
  };

  
const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  


var mockdata = [
    {
        userimg : 'https://yt4.ggpht.com/ytc/AIdro_lN1r14JyVE1HV827fOA4jwcUpML9JATe2vub3wBZwgdO1_u1mEpcWHSejRd9oj5lcaaA=s64-c-k-c0x00ffffff-no-rj',
        username : 'chrein',
        usermsg : 'Working with subash was super cool❣️ ',
        stars : 4

    },
    {
        userimg : 'https://yt4.ggpht.com/XA7E0cVUxmGUkxuXGa0DO6UhE1DMuWN6UJ3VX0L3EhT_Kob_khuWdsUyBcTAR8r3g71xM0EvQw=s64-c-k-c0x00ffffff-no-rj',
        username : 'leo-24',
        usermsg : 'Highly recommended this guy to manage end to end UI',
        stars  :3

    },
    {
        userimg : 'https://yt4.ggpht.com/TBKoaJvmEiEypkw4gcEfe-uhEKP3G3kXItrDlscVbHJ7qBITPQCjcosXhkXjgzzADByVIPRdfp4=s64-c-k-c0x00ffffff-no-rj',
        username : 'raje',
        usermsg : 'On time project submission',
        stars : 4

    },{
        userimg : 'https://yt4.ggpht.com/plXk6LHGu_M3wvIiX3i54scQqsUUn6NjsMyXAeKyprt5FzSqZ1VipH_YhhZC3KtAFdFGldGHqw=s64-c-k-c0x00ffffff-no-rj',
        username : 'rake',
        usermsg : '100 X developer 💨',
        stars : 4

    },
    {
        userimg : 'https://yt4.ggpht.com/Z7_PtvSQZeNuSZibVoo-6-VOM2cjqA8eoSPdLzcIIil2ecy3eD7YvUKpOrIJF0MgrmwfF-sY=s32-c-k-c0x00ffffff-no-rj',
        username : 'Shrikanth sharma',
        usermsg : 'Replaced the ugly UI within an hour',
        stars : 5
    },
    {
        userimg : 'https://yt4.ggpht.com/A3RrWRy7WUkwl17xC7PVQUIHwJpFn6ZSRtRgJKP2GG7RyKJ1sLTRRsQukJJpZOKXM79DId1n64Q=s64-c-k-c0x00ffffff-no-rj',
        username : 'Nikhil',
        usermsg : 'Reducing the lcp payload on UI. reduced bounce rate report',
        stars : 4

    },{
        userimg : 'https://yt4.ggpht.com/nJ7z2jCd44so_bSOS8-sqYUR0cr05ZhrqHOe4lmMcCHMC96n6oj3LCLF01ypJ8fjkM1GLbfW5w=s32-c-k-c0x00ffffff-no-rj',
        username : 'Harmit',
        usermsg : 'Developed the whole page in a single night.  it was a amazing work with you :)',
        stars : 5

    },
     {
        userimg : 'https://yt4.ggpht.com/ytc/AIdro_l4XyS0lL3Q-TSA_hMIvrtgRaMUv3z_m7LQEhY-voPrR4U=s64-c-k-c0x00ffffff-no-rj',
        username : 'karan sigh',
        usermsg : 'i would highly recommend this person. will see on future projects',
        stars : 3

    },
    {
        userimg : 'https://yt4.ggpht.com/BBPEyRIuuqWHhPDrlt__nk1szuL1dB70d87e_J1ajEJY2txqebtavK4RYZ8vm3gmH3Vw-3Fp=s32-c-k-c0x00ffffff-no-rj',
        username : 'Kush raghul',
        usermsg : 'periodic knock ❤',
        stars : 5

    },
   
]
  return (
    <>
    <div className='justify-center flex mt-20'>

                <span className='text-bold text-gray-600'></span>

                <motion.h2
                 variants={headingVariants}
                 initial="hidden"
                 animate="visible"
                 transition={{ duration: 1, ease: 'easeInOut' }}
                 className="text-4xl font-extrabold text-center text-white mb-12"
                >
                 Clients Acknowledgement
                </motion.h2>

             </div>
    <div className='relative h-screen overflow-hidden   mb-20'>
             
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-10"></div>

       
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10"></div>

       
        <motion.div
            className='flex flex-wrap justify-center '
            initial={{ y: 10 }}
            animate={{ y: -1000 }} 
            transition={{ 
                duration: 40, 
                repeat: Infinity, 
                ease: 'linear',
                
            }}
        >
            {mockdata.map((i, index) => (
                <div key={index} className='border rounded-lg m-5 p-4 w-80 h-auto border-gray-500'>
                    <div className='flex'>
                        <img src={i.userimg} alt="Profile" className='rounded-full w-10 h-10 ' />
                        <span className='font-sans ml-3 text-white'>{i.username}</span>
                        {/* <div className='ml-auto'>
                            {i.verified && <VerifiedIcon color='primary' fontSize='small' />}
                        </div> */}
                    </div>
                    <div className='m-3 text-gray-400'>
                        <p>{i.usermsg   }</p>
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
    </>
);
};