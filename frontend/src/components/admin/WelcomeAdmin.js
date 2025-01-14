import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FaBars, FaHamburger } from 'react-icons/fa';

export default function WelcomeAdmin({ setIsopen }) {
  // Function to handle opening of a menu or modal
  const openMenu = () => {
    setIsopen(true);  // Example function to control the state of an open/close menu
  };

  return (
    <>
      <FaBars className='text-rose-600 text-xl m-3 cursor-pointer' onClick={() => setIsopen(true)} />
      <div className="bg-slate-800 min-h-screen flex flex-col items-center justify-center text-white">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold mb-4">Welcome, Admin! <span className='text-4xl animate-shake'>👋</span></h1>
          <p className="text-xl mb-6">
            Manage Chat and movies effectivley.
          </p>
        </div>
      </div>
    </>
  );
}
