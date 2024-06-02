import React, { useState, useEffect, useDebugValue } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { FaPlay } from 'react-icons/fa';
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext } from 'react';
import themecontext from '../utils/themecontext';
import { useDispatch } from 'react-redux';
import { toggletheme } from '../utils/Themeslice';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useSelector } from 'react-redux';



const Header = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const user_name  = useContext(themecontext)
  const theme1 = useSelector(store => store.theme.toggletheme)
  
  const dispatch = useDispatch()
  const [theme , settheme] = useState(true)

  const update = localStorage.setItem("user_theme" , theme1 )
 
  const toggle = () =>{
    settheme(!theme)
    dispatch(toggletheme())
   
  }
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
    <nav className="p-4"> 

      <div className="container mx-auto flex items-center justify-between">

          {/* <img src='https://showflix.xyz/static/media/footer-bg.67e95f05.jpg ' className='absolute   lg:w-full lg:p-36  opacity-80  sm:px-10 ' />  */}

        <div className="flex space-x-2  ">
          <div className="text-rose-600 text-xl animate-pulse ">
            <FaPlay />
          </div>
          <div>
          <h1 className='text-rose-600 relative '>Movie<span className={theme1 ? 'text-white' : 'text-black'}>Spot</span></h1>

          </div>
        
        </div>
        
       
        
        
        <Link to='/livechat'>  <button className={`text-rose-600 cursor-pointer hover:text-gray-300 relative `}>
        
            Live Chat
           
          </button>
        </Link>  
        <DarkModeSwitch
          checked={theme}
          onChange={toggle} 
          className=''
          size={24}
          
        />
       
         
      
     
       
      </div>
    </nav>
  );
};

export default Header;
