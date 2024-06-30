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
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
  const theme1 = useSelector(store => store.theme.toggletheme);
  const { isAuthenticated } = useAuth0();

  const dispatch = useDispatch();
  const [theme, setTheme] = useState(true);

  const toggle = () => {
    setTheme(!theme);
    dispatch(toggletheme());
  };

  const header_list = [
    {
      title  : 'Movies',
      link : '/'
    }, 
    {
      title  : 'Tv-series',
      link : '/tv-series'
    },
    {
      title  : 'About-us',
      link : '/about'
    },
    {
      title  : 'Contact-us',
      link : '/contact'
    },
  ]

  return (
    <nav className="p-2 shadow-md mb-8 border-b  border-gray-500  ">
      <div className="container mx-auto flex items-center justify-between  px-6 mt-4">
        <div className="flex space-x-4">
          <div className="text-rose-600 text-2xl animate-pulse py-[1px]">
            <FaPlay />
          </div>
          <div>
            <h1 className='text-rose-600 relative text-lg'>Movie<span className={theme1? 'text-white' : 'text-black'}>Spot</span></h1>
          </div>
        </div>

        <div className="hidden sm:flex absolute ml-[400px] ">
         

          {
            header_list.map((i , index) =>(
              <Link to={i.link} key={index}>
              <h1 className='p-2 bg-transparent text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-yellow-500 to-yellow-600  m-4   '>{i.title}</h1>
              </Link>
            ))
          }
         
        
        </div>

        <div className="flex items-center space-x-2 sm: ml-[125px]  lg:ml-[950px]  ">
          
          <DarkModeSwitch
            checked={theme}
            onChange={toggle}
            size={27}
            className='mt-2'
          />
        
        </div>

        <div className="relative inline-block">
        {isAuthenticated ?   <Profile /> : <a href="/login">
          { <FontAwesomeIcon icon={faUserCircle} className='text-teal-400 h-[30px] w-[30px] mr-2 cursor-pointer rounded-full mt-2' />}
        </a>}
      </div>
      </div>

    </nav>
  );
};

export default Header;
