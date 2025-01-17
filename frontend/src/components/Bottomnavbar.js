import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';

export const Bottomnavbar = () => {
  const location = useLocation();
  
  const getIconColor = (path) => {
    return location.pathname === path ? 'text-rose-700' : 'text-white';
  };

  return (
    <div className={`sm:hidden fixed inset-x-0 bottom-0 border-t border-gray-600 transition-colors bg-transparent backdrop-blur-md duration-500 flex justify-between px-5 py-2 z-50`}>
      <Link to="/" className='flex gap-1 items-center'>
        <MovieIcon className={`${getIconColor('/')}`} style={{fontSize: "31px"}} />
        <span className={`${getIconColor('/')} text-lg font-semibold`}>Movies</span>
      </Link>
      <Link to="/tv-series" className='flex gap-1 items-center'>
        <TvIcon className={`${getIconColor('/tv-series')}`} style={{fontSize: "31px"}} />
        <span className={`${getIconColor('/tv-series')} text-lg font-semibold`}>Series</span>
      </Link>
      <Link to="/search-catagory" className='flex gap-1 items-center'>
        <SearchIcon className={`${getIconColor('/search-catagory')}`} style={{fontSize: "31px"}} />
        <span className={`${getIconColor('/search-catagory')} text-lg font-semibold`}>Search</span>
      </Link>
    </div>
  );
};
