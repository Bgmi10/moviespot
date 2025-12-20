import React from 'react';
import { FaBars } from 'react-icons/fa';

export default function WelcomeAdmin({ setIsopen, logCount }) {
  return (
    <>
      <FaBars className='text-rose-600 text-xl m-3 cursor-pointer' onClick={() => setIsopen(true)} />
        <span className='text-white'>
          log Count: {logCount}
        </span>
      <div className="min-h-screen flex flex-col items-center justify-center text-white">
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
