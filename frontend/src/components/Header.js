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
 

  const toggle = () => {

    dispatch(toggletheme());
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className='absolute z-20' >
    <nav className=" mb-3 border-gray-500  flex items-center justify-between  ">
      <div className="flex items-center space-x-4 ml-2 sm: mt-3" >
        <h1 className="text-rose-600 text-lg font-semibold   p-2 rounded-md  border-none outline-none " >
          Movie<span className='text-white'>Spot</span>
        </h1>
        <div className="hidden lg:flex">
          <Headeritems />
        </div>
      </div>
      
      <div className={"flex items-center space-x-4  lg:ml-[1150px]   mt-3 lg:absolute  sm: ml-36"}>
        <DarkModeSwitch
          checked={theme1}
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
        
        <div className="cursor-pointer  lg:hidden" onClick={handleToggle}>
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
              <a onClick={() => window.location.href = '/search-catagory'}>Search Movies </a>
              <a onClick={() => window.location.href = '/tv-series'}>Tv-series</a>
              <a onClick={() => window.location.href = '/'}>Home</a>
              <a  onClick={() => window.location.href = '/developer-profile'}>Developer-Profile</a>
              <a  onClick={() => window.location.href = '/'}>Subscription</a>
              <a  onClick={() => window.location.href = '/about-us'}>About us </a>
              <a  onClick={() => window.location.href = '/contact-us'}>Contact us</a>
              <a  onClick={() => window.location.href = '/terms-condition'}>Terms & condition</a>
              <a  onClick={() => window.location.href = '/privacy-policy'}>Privacy policy</a>
              <a  onClick={() => window.location.href = '/refund-policy'}>Refund policy </a>
          
              
            </>
          )}
        </div>
      
    </nav>
    </div>
  );
};

export default Header;
