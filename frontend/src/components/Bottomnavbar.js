import { faBars, faPlay, faSearch, faTape, faTv } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglemovie } from '../utils/Movieslice';

export const Bottomnavbar = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const toggletype = useSelector((store) => store.movietoggle.togglemovie);

 
  const handleClick = () => {
    
    dispatch(togglemovie(toggle));
  };

  const handletvclick = () =>{   
    setToggle(true)
    dispatch(togglemovie(true))
  }

  // Determine the background color based on toggletype
  

  return (
    <div className={`fixed inset-x-0 bottom-0  transition-colors bg-slate-900 opacity-80 duration-500 flex justify-between px-5 py-2 z-50`}>
      <Link to="/">
        <FontAwesomeIcon icon={faTape} className={!toggletype ? "text-rose-600 text-2xl" : 'text-white text-2xl '} onClick={handleClick} />
      </Link>
      
      <Link to="/tv-series">
        <FontAwesomeIcon icon={faTv} className={toggletype ?  "text-rose-600 text-2xl cursor-pointer" : 'text-white text-2xl'} onClick={handletvclick} />
      </Link>
      
      <FontAwesomeIcon icon={faSearch} className="text-white text-2xl" />
    </div>
  );
};
