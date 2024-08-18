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

  return (
    <div className='relative h-screen overflow-hidden  '>
     
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
                repeatType :"mirror"
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
);
};


var mockdata = [
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'chrein',
        usermsg : 'Working with subash was super cool❣️ ',
        stars : 4

    },
    {
        userimg : 'https://instagram.fmaa1-2.fna.fbcdn.net/v/t51.2885-19/451197649_1149334886291858_1342439340489177934_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fmaa1-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=YWhClVo6-xsQ7kNvgFkDNA-&edm=APs17CUBAAAA&ccb=7-5&oh=00_AYBCLqVp_CUrNBqs_AOhC8poJK_Uyz2kCXIxZ_JAvuG5iQ&oe=66C7E380&_nc_sid=10d13b',
        username : 'leo-24',
        usermsg : 'Highly recommended this guy and working with this people ',
        stars  :3

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy '

    },{
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy '

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy '

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy ',
        stars : 4

    },{
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy ',
        stars : 5

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy ',
        stars : 4

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy ',
        stars : 5

    }, {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy ',
        stars : 4

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy ',
        stars : 4

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy '

    },{
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy '

    },
    {
        userimg : 'https://ui.aceternity.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1774006615370276865%2F0gASM8m6_normal.jpg&w=1080&q=75',
        username : 'subash',
        usermsg : 'ive met this guy '

    },
]