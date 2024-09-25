import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const Feedback = () => {
  const headingVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const marqueeVariants = {
    animate: {
      x: [ 0, -1000], // Adjust to the length of your content
      transition: {
        duration: 50, // Speed of scroll
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };
  const rigthmarqueeVariants = {
    animate: {
      x: [-1000,0], // Adjust to the length of your content
      transition: {
        duration: 50, // Speed of scroll
        ease: 'linear',
        repeat: Infinity,
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.05,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.25)',
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  const extendedMockdata = [...mockdata, ...mockdata];
  const extendedData2 = [...data2, ...data2];


  return (
    <>
      <div className='flex justify-center mt-20'>
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="text-4xl font-extrabold text-center text-white mb-20"
        >
          Clients Acknowledgement
        </motion.h2>
      </div>

      <div className="relative overflow-hidden h-96">
        
      <motion.div
          className="absolute top-52 left-0 flex  space-x-6"
          variants={rigthmarqueeVariants}
          initial="initial"
          animate="animate"
        >
          {extendedMockdata.map((item, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-4 w-80 bg-gray-800 shadow-lg m-2"
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <div className="flex items-center">
                <img
                  src={item.userimg}
                  alt="Profile"
                  className="rounded-full w-10 h-10"
                />
                <div className="ml-4">
                  <span className="text-white font-bold">{item.username}</span>
                </div>
              </div>
              <div className="mt-3 text-gray-300">
                <p className='text-xs '>{item.usermsg}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Second Marquee */}
        <motion.div
          className="absolute top-0 left-0 flex space-x-6"
          variants={marqueeVariants}
          initial="initial"
          animate="animate"
        >
          {extendedData2.map((item, index) => (
            <motion.div
              key={index}
              className="border rounded-lg p-4 w-80 bg-gray-800 shadow-lg m-2"
              whileHover="hover"
              variants={cardHoverVariants}
            >
              <div className="flex items-center">
                <img
                  src={item.userimg}
                  alt="Profile"
                  className="rounded-full w-10 h-10"
                />
                <div className="ml-4">
                  <span className="text-white font-bold">{item.username}</span>
                </div>
              </div>
              <div className="mt-3 text-gray-300 ">
                <p className='text-xs'>{item.usermsg}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

// Mock data arrays
var mockdata = [
  {
    userimg: 'https://yt4.ggpht.com/ytc/AIdro_lN1r14JyVE1HV827fOA4jwcUpML9JATe2vub3wBZwgdO1_u1mEpcWHSejRd9oj5lcaaA=s64-c-k-c0x00ffffff-no-rj',
    username: 'chrein',
    usermsg: 'Collaborating with Subash was an excellent experience. His work ethic and dedication are impressive! ',
    stars: 4,
  },
  {
    userimg: 'https://yt4.ggpht.com/XA7E0cVUxmGUkxuXGa0DO6UhE1DMuWN6UJ3VX0L3EhT_Kob_khuWdsUyBcTAR8r3g71xM0EvQw=s64-c-k-c0x00ffffff-no-rj',
    username: 'James',
    usermsg: 'I highly recommend Subash for managing end-to-end UI development. His expertise and professionalism stand out.',
    stars: 3,
  },
  {
    userimg: 'https://yt4.ggpht.com/TBKoaJvmEiEypkw4gcEfe-uhEKP3G3kXItrDlscVbHJ7qBITPQCjcosXhkXjgzzADByVIPRdfp4=s64-c-k-c0x00ffffff-no-rj',
    username: 'raje',
    usermsg: 'Delivered the project on time with great attention to detail. Very satisfied with the outcome',
    stars: 4,
  },
  {
    userimg: 'https://yt4.ggpht.com/plXk6LHGu_M3wvIiX3i54scQqsUUn6NjsMyXAeKyprt5FzSqZ1VipH_YhhZC3KtAFdFGldGHqw=s64-c-k-c0x00ffffff-no-rj',
    username: 'rake',
    usermsg: 'Subash is an outstanding developer who consistently delivers high-quality work on time. His attention to detail and dedication to UI perfection make him an absolute pleasure to work with. Highly recommended!',
    stars: 4,
  },
  {
    userimg: 'https://yt4.ggpht.com/ytc/AIdro_mgjhx0JxlSf36c0NYjBKjbi5WcDlSn-6a4_Hnit4zzka0=s32-c-k-c0x00ffffff-no-rj',
    username: 'Adhishessan',
    usermsg: 'Amazing experience working with Subash! His skills in UI/UX design are top-notch, and his ability to implement animations smoothly is incredible. Will definitely collaborate again!',
    stars: 4,
  },
  {
    userimg: 'https://yt4.ggpht.com/pS-Lc5guKkieDLfSf_WKD65vOcxYO-ZSDpjUAnPkiy5PVETK19aZXaIqpsSis9GG3VE_T5-W1A=s64-c-k-c0x00ffffff-no-rj',
    username: 'Jac',
    usermsg: 'he exceeded all expectations! His expertise in React and UI animations truly brought our project to life. Looking forward to more projects together!',
    stars: 4,
  },
  {
    userimg: 'https://yt4.ggpht.com/PFdoZOHWOmvR849x8zAKTUyDYV329jmyR7UiXNWS7SxoxSPlZxOkXNAD1wcWcHtNvFtpSvXrTPw=s64-c-k-c0x00ffffff-no-rj',
    username: 'Nithiesha',
    usermsg: 'Working with Subash was a breeze! He is a 100x developer, super fast, and ensures everything is polished to perfection. Would recommend him to anyone in need of high-quality UI work.',
    stars: 4,
  },
];

var data2 = [
  {
    userimg: 'https://yt4.ggpht.com/nJ7z2jCd44so_bSOS8-sqYUR0cr05ZhrqHOe4lmMcCHMC96n6oj3LCLF01ypJ8fjkM1GLbfW5w=s32-c-k-c0x00ffffff-no-rj',
    username: 'Harmit',
    usermsg: 'Subash developed the entire page overnight—truly amazing work! It was great collaborating with you 😊',
    stars: 5,
  },
  {
    userimg: 'https://yt4.ggpht.com/ytc/AIdro_l4XyS0lL3Q-TSA_hMIvrtgRaMUv3z_m7LQEhY-voPrR4U=s64-c-k-c0x00ffffff-no-rj',
    username: 'karan sigh',
    usermsg: 'I highly recommend Subash! Looking forward to working together on future projects',
    stars: 3,
  },
  {
    userimg: 'https://yt4.ggpht.com/BBPEyRIuuqWHhPDrlt__nk1szuL1dB70d87e_J1ajEJY2txqebtavK4RYZ8vm3gmH3Vw-3Fp=s32-c-k-c0x00ffffff-no-rj',
    username: 'Kush raghul',
    usermsg: 'Subash was consistently attentive throughout the project! Exceptional work ❤',
    stars: 5,
  },
  {
    userimg: 'https://yt4.ggpht.com/A3RrWRy7WUkwl17xC7PVQUIHwJpFn6ZSRtRgJKP2GG7RyKJ1sLTRRsQukJJpZOKXM79DId1n64Q=s64-c-k-c0x00ffffff-no-rj',
    username: 'Nikhil',
    usermsg: 'Subash optimized our UI by reducing the LCP payload, which significantly decreased the bounce rate. Fantastic work!',
    stars: 4,
  },
];
