import React, { useState, useEffect } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faTimes } from '@fortawesome/free-solid-svg-icons';
import { signOut } from 'firebase/auth';
import { FaPlay } from 'react-icons/fa';
import { auth } from '../utils/firebase';
import RainbowText from './Rainbowtext';
import { onAuthStateChanged } from 'firebase/auth';



const Header = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  const toggleMobileNav = () => {
    setMobileNavOpen((prev) => !prev);
    document.body.style.overflow = !isMobileNavOpen ? 'hidden' : 'auto';
  };

  const closeMobileNav = () => {
    setMobileNavOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Sign-out error:', error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const storedUserName = sessionStorage.getItem('userName');
        const newUserName = storedUserName || user.displayName || "";
        setUserName(newUserName);
        sessionStorage.setItem('userName', newUserName);
      } else {
        setUserName(null);
        sessionStorage.removeItem('userName');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    sessionStorage.setItem('userName', userName);
  }, [userName]);

  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-2 ">
          <div className="text-rose-600 text-xl animate-pulse ">
            <FaPlay />
          </div>
          <div>
          <h1 className='text-rose-600'>Movie<span className='text-white'>Spot</span></h1>

          </div>
        </div>
        <div>
          <RainbowText userName={userName} />
        </div>
        <div className="flex items-center space-x-4 md:hidden">
          
        </div>
        
        <Link to='/livechat'>  <button className={`text-rose-600 cursor-pointer hover:text-gray-300`}>
            Live Chat
          </button>
        </Link>  
     
        <div className={`hidden md:flex items-center space-x-4 relative group`}>
       
          <button className={`text-white cursor-pointer group-hover:text-gray-300`} onClick={handleSignOut}>
            Sign Out
          </button>
          {isMobileNavOpen && (
            <div className="absolute top-10 right-0 bg-black p-2 space-y-2 text-white rounded shadow-md">
              <div>
                <button className="cursor-pointer" onClick={closeMobileNav} >Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
