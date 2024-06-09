import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { FaPlay } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toggletheme } from '../utils/Themeslice';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Profile from '../Oauth/Profile';



const Header = () => {

  const theme1 = useSelector(store => store.theme.toggletheme)
  const {  isAuthenticated } = useAuth0();
 
  const dispatch = useDispatch()
  const [theme , settheme] = useState(true)

 
  const toggle = () =>{
    settheme(!theme)
    dispatch(toggletheme())
   
  }

  return (
    <nav className={"p-4 "}> 

      <div className="container mx-auto flex items-center justify-between">

         

        <div className="flex space-x-2  ">
          <div className="text-rose-600 text-2xl animate-pulse py-[1px]">
            <FaPlay />
          </div>
          <div>
          <h1 className='text-rose-600 relative text-lg'>Movie<span className={theme1 ? 'text-white' : 'text-black'}>Spot</span></h1>

          </div>
        
        </div>
        
       
        
        
        {/* <Link to='/livechat'>  <button className={`text-rose-600 cursor-pointer hover:text-gray-300 relative `}>
        
            Live Chat
           
          </button>
        </Link>   */}
        
       
        <DarkModeSwitch
          checked={theme}
          onChange={toggle} 
        
          size={24}
          
        />
        <div className='sm: ml-[-100px] lg:ml-[-1000px] '>
        <Profile /> 
        </div>
        <div className='sm: ml-[-110px] lg:ml-[-1000px]   '>
       
        <a href="/login">
        {!isAuthenticated && <FontAwesomeIcon icon={faUserCircle}  className='text-teal-400 text-2xl cursor-pointer  '/>}

        </a>
       
        </div>
       
      </div>
    </nav>
  );
};

export default Header;
