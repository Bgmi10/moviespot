  import React, { useEffect, useState } from 'react';
  import { useAuth0 } from "@auth0/auth0-react";
  import { FaPlay } from 'react-icons/fa';
  import { useDispatch } from 'react-redux';
  import { toggletheme } from '../utils/Themeslice';
  import { DarkModeSwitch } from 'react-toggle-dark-mode';
  import { useSelector } from 'react-redux';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
  import Profile from '../Oauth/Profile';
  import './hamburger.css'
  import { Headeritems } from './Headeritems';



  const Header = () => {
    const theme1 = useSelector(store => store.theme.toggletheme);
    const [isOpen , setIsOpen] = useState(false)
    const { isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(true);


    const toggle = () => {
      setTheme(!theme);
      dispatch(toggletheme());
    };

    const handleToggle  = ( ) => {
      setIsOpen(prev => !prev)
    }

    

    return (
      <nav className="p-2 shadow-md  border-gray-500  ">
        <div className="container mx-2 flex items-center justify-between  px-6 mt-4">
          <div className="flex space-x-2">
            <div className="text-rose-600 text-2xl animate-pulse py-[1px]">
              <FaPlay />
            </div>
            <div>
              <h1 className='text-rose-600 relative text-lg'>Movie<span className={theme1? 'text-white' : 'text-black'}>Spot</span></h1>
            </div>
          </div>

            <Headeritems />

          <div className="lg:ml-[950px]">
            
            <DarkModeSwitch
              checked={theme}
              onChange={toggle}
              size={27}
              className='mt-2'
            />
          
          </div>

          <div className="relative inline-block">
          {isAuthenticated ?   <Profile /> : <a href="/login">
            { <FontAwesomeIcon icon={faUserCircle} className='text-teal-400 h-[30px] w-[30px] lg:mr-2 cursor-pointer rounded-full mt-2' />}
          </a>}
        </div>
        <div className="cursor-pointer lg:hidden" onClick={handleToggle}>
        <div className={`hamburger-icon ${isOpen ? 'open' : ''}`}>
          <div className="line top "></div>
          <div className="line middle"></div>
          <div className="line bottom"></div>
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
      </div>
      </div>

      </nav>
    );
  };

  export default Header;

