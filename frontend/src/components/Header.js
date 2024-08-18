import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from 'react-redux';
import { toggletheme } from '../utils/Themeslice';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Profile from '../Oauth/Profile';
import './hamburger.css';
import { Headeritems } from './Headeritems';

const Header = () => {
  const theme1 = useSelector(store => store.theme.toggletheme);
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(true);

  const toggle = () => {
    setTheme(!theme);
    dispatch(toggletheme());
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='absolute z-20'>
    <nav className=" mb-3 border-gray-500  flex items-center justify-between  ">
      <div className="flex items-center space-x-4 ml-2 sm: mt-3">
        <h1 className="text-rose-600 text-lg font-semibold  bg-black p-2 rounded-md  border-none outline-none ">
          Movie<span className={theme1 ? 'text-white' : 'text-black'}>Spot</span>
        </h1>
        <div className="hidden lg:flex">
          <Headeritems />
        </div>
      </div>
      
      <div className="flex items-center space-x-4  lg:ml-[1150px] sm: ml-72 sm: mt-3 absolute ">
        <DarkModeSwitch
          checked={theme}
          onChange={toggle}
          size={27}
          className="mt-1"
        />

        <div className="relative inline-block ">
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
        </div>
        </div>

        <div className="cursor-pointer lg:hidden" onClick={handleToggle}>
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <div className="line top "></div>
          <div className="line middle"></div>
          <div className="line bottom"></div>
        </div>
      </div>

      <div
          className={`menu ${isOpen ? 'menu-enter menu-enter-active' : 'menu-exit menu-exit-active'}`}
        >
          {isOpen && (
            <>
              <span onClick={() => window.location.href = '/search-catagory'}>Search Movies </span>
              <span onClick={() => window.location.href = '/tv-series'}>Tv-series</span>
              <span onClick={() => window.location.href = '/'}>Home</span>
              <span  onClick={() => window.location.href = '/developer-profile'}>Developer-Profile</span>
              <span  onClick={() => window.location.href = '/'}>Subscription</span>
              <span  onClick={() => window.location.href = '/about-us'}>About us </span>
              <span  onClick={() => window.location.href = '/contact-us'}>Contact us</span>
              <span  onClick={() => window.location.href = '/terms-condition'}>Terms & condition</span>
              <span  onClick={() => window.location.href = '/privacy-policy'}>Privacy policy</span>
              <span  onClick={() => window.location.href = '/refund-policy'}>Refund policy </span>
          
              
            </>
          )}
        </div>
      
    </nav>
    </div>
  );
};

export default Header;
