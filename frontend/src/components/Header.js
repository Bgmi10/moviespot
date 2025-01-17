import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { toggletheme } from '../store/themeSlice';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Profile from '../Oauth/Profile';
import { Headeritems } from './Headeritems';

const Header = () => {
  const theme1 = useSelector(store => store.theme.toggletheme);
  const { isAuthenticated } = useAuth0();
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();
 
  const toggle = () => {
    dispatch(toggletheme());
  };
  
  const handleScroll = () => {
     const e = window.scrollY > 10;
     setChange(e);
  };

  useEffect(() => {
   window.addEventListener('scroll', handleScroll);
   return () => window.removeEventListener('scroll', handleScroll);
  },[change]);

  return (
    <nav className={`fixed top-0 left-0 right-0 flex justify-between items-start p-3 w-full bg-gradient-to-b from-black/1 to-transparent z-50 ${change ? "transition-transform backdrop-blur-lg border-b border-gray-600" : "transition" }`}>
      <div className="flex items-center space-x-4 lg:mt-5 sm: mt-0">
        <h1 className="text-rose-600 bg-black text-2xl font-semibold p-2 rounded-lg border-none outline-none" >
          Movie<span className='text-white'>Spot</span>
        </h1>
      </div>
      <div className='lg:flex items-center'>
         <Headeritems />
         <DarkModeSwitch
          checked={!theme1}
          onChange={toggle}
          size={30}
          style={{ color: theme1 ? '#be123c' : '#ffffff'}}
          className='sm: mt-2 lg:mt-0'
        />
        {/* <div className="relative inline-block ">
          {isAuthenticated ? (
            <Profile />
          ) : (
            <a href="/login">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-rose-600 h-[30px] w-[30px] cursor-pointer rounded-full mt-1"
              />
            </a>
          )}
        </div> */}
      </div>
      {/* <div className="cursor-pointer  lg:hidden" onClick={handleToggle}>
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <div className="line top "></div>
          <div className="line middle"></div>
          <div className="line bottom"></div>
        </div>
      </div> */}
     {/* <div className={`menu ${isOpen ? 'menu-enter menu-enter-active' : 'menu-exit menu-exit-active'}`}>
       {isOpen && (
         <>
           <a onClick={() => window.location.href = '/search-catagory'}>Search Movies </a>
           <a onClick={() => window.location.href = '/tv-series'}>Tv-series</a>
           <a onClick={() => window.location.href = '/'}>Movies</a>
           {/* <a  onClick={() => window.location.href = '/developer-profile'}>Developer-Profile</a> */}
           {/* <a  onClick={() => window.location.href = '/about-us'}>About us </a>
           <a  onClick={() => window.location.href = '/contact-us'}>Contact us</a>
           <a  onClick={() => window.location.href = '/terms-condition'}>Terms & condition</a>
           <a  onClick={() => window.location.href = '/privacy-policy'}>Privacy policy</a>
           <a  onClick={() => window.location.href = '/refund-policy'}>Refund policy </a> 
         </>
       )}
     </div> */}
    </nav>
  );
};

export default Header;
