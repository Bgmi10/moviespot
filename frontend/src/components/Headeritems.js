import React from 'react';
import { NavLink } from 'react-router-dom';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { useDispatch } from 'react-redux';
import { togglemovie } from '../utils/Movieslice';

export const Headeritems = () => {
  const dispatch = useDispatch();

  const handleToggleToSeries = () => {
    dispatch(togglemovie(true));
  }
  
  const handleToggleToMovies = () => {
    dispatch(togglemovie(false));
  }

  const header_list = [
    {
      title: 'Movies',
      link: '/',
      icon: <MovieIcon className="text-rose-700" style={{fontSize: "31px"}} />,
      toggleClick: handleToggleToMovies
    },
    {
      title: 'Series',
      link: '/tv-series',
      icon: <TvIcon className="text-rose-700" style={{fontSize: "31px"}} />,
      toggleClick: handleToggleToSeries
    },
    {
      title: 'Search',
      link: '/search-catagory',
      icon: <SearchIcon className="text-rose-700" style={{fontSize: "31px"}} />,
    },
  ];

  return (
    <>
      <div className="lg:flex sm: hidden">
        {header_list.map((item, index) => (
          <NavLink
            to={item.link}
            key={index}
            onClick={item.toggleClick}
            className={({ isActive }) =>
              `p-2 m-3 text-2xl font-bold navitems relative group ${
                isActive ? 'text-rose-600' : 'text-white hover:text-rose-600 '
              }`
            }
          >
            <div className="flex gap-1 items-center">
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </div>
            <span
              className={`absolute left-1/2 bottom-0 h-[2px] w-0 bg-rose-600 shadow-[0_0_6px_2px_rgba(255,255,255,0.3)]  opacity-0 transition-all duration-500 ease-out transform -translate-x-1/2 ${
                'group-hover:w-full group-hover:scale-x-100 group-hover:opacity-100 group-hover:left-1/2 ' +
                (item.link === window.location.pathname ? 'w-full opacity-100 left-1/2' : '')
              }`}
            ></span>
          </NavLink>
        ))}
      </div>
    </>
  );
};
