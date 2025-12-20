import React, { useEffect, useState } from 'react';
import { Headeritems } from './Headeritems';

const Header = () => {
  const [change, setChange] = useState(false);
 
  const handleScroll = () => {
     const e = window.scrollY > 10;
     setChange(e);
  };

  useEffect(() => {
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
  },[change]);

  return (
    <nav className={`fixed top-0 left-0 right-0 flex justify-between items-start w-full bg-gradient-to-b from-black/1 to-transparent z-50 ${change ? "transition-transform backdrop-blur-lg border-b border-gray-800" : "transition" }`}>
      <div className='sm: w-[20px] lg:hidden'></div>
      <div className="flex items-center space-x-4 lg:mt-5 sm: mt-0">
        <h1 className="text-rose-600 bg-black text-xl font-semibold sm: mt-2 lg:mt-0 p-3 px-8 py-2 rounded-full border-none outline-none" >
          Movie<span className='text-white'>Spot</span>
        </h1>
      </div>
      <div className='lg:flex items-center'>
         <Headeritems />
      </div>
    </nav>
  );
};

export default Header;
