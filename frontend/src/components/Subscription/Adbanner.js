import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';


export const Adbanner = () => {
  const [popout, setpopout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setpopout(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {popout && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-40 backdrop-blur-sm">
          <div className="relative flex justify-center items-center bg-blue-500 text-white h-[300px] w-[90%] lg:w-[95%] overflow-hidden shadow-lg rounded-lg m-6 transition transform duration-700 ease-in-out scale-95 opacity-0 animate-fadeIn">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"></div>
            <div className="absolute top-2 right-2 z-20">
              <FontAwesomeIcon icon={faClose} className='text-lg text-black cursor-pointer' onClick={() => setpopout(false)} />
            </div>
            <div className="relative p-3 mt-3 z-10 w-1/2 left-20 lg:left-0 lg:mt-[-7px]">
              <h1 className="text-xl font-bold mb-2 lg:text-5xl lg:mb-6">Unlock Ad-Free Movies!</h1>
              <p className="text-lg lg:text-3xl lg:mb-3">
                Subscribe now for just <span className="bg-yellow-500 text-black px-2 py-1 rounded-md">₹49</span> /month and enjoy uninterrupted movie streaming!
              </p>
              <button className="mt-3 px-6 py-2 bg-yellow-500 text-black font-semibold rounded-md hover:bg-yellow-600 transition duration-300 lg:p-4">
                Subscribe Now
              </button>
            </div>
            <img
              src="https://img.freepik.com/free-photo/fun-3d-illustration-cartoon-teenage-girl-with-rain-gear_183364-80088.jpg?w=360&t=st=1718905484~exp=1718906084~hmac=490f2a7e8b388f5e56da8344046ee3e181c5b5ac3f97f8d974f4377d07b52d84"
              alt="Celebration Confetti"
              className="absolute inset-0 w-[45%] h-full object-cover z-0 lg:w-[166px]"
            />
          </div>
        </div>
      )}
    </>
  );
}
