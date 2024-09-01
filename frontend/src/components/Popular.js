import React, { useEffect, useState } from 'react';
import { LottieAnimation } from './lottie';
import * as animi from './anima.json';
import { settings } from '../utils/Helper';
import { poster_url } from '../utils/constans';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import moviesspotgif from '../img/movieSpotgif.gif';
import { FaPlay } from 'react-icons/fa';

export const Popular = ({ title, apiurl, sort }) => {
  const theme = useSelector(store => store.theme.toggletheme);
  const [hoverid, setHoverid] = useState('');
  const [data, setData] = useState('');
  console.log(data)

  const fetch_data = async () => {
    try {
      const res = await fetch(`${apiurl}${process.env.REACT_APP_API_KEY}&${sort}`);
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const handleEnter = (id) => {
    setHoverid(id);
  };

  const handleMouseLeave = () => {
    setHoverid('');
  };

  return (
    <div className="lg:p-2 mt-2">
      <div className="flex justify-between">
        <h2 className={`text-2xl font-medium mb-4 px-2 mt-6 ${theme ? 'text-gray-300' : 'text-gray-800'}`}>{title}</h2>
        <a href={`/popular-detail?apiurl=${encodeURIComponent(apiurl)}&sort=${encodeURIComponent(sort)}`}>
          <h1 className="text-gray-400 cursor-pointer text-md font-medium mt-4 mr-2 py-3">
            More.. <FontAwesomeIcon icon={faArrowRight} />
          </h1>
        </a>
      </div>

      {!data.results ? (
        <LottieAnimation gif={animi} />
      ) : (
        <Slider {...settings}>
          {data?.results?.map((item) => (
            <a href={`/searchdetail/${item.id}`} key={item.id}>
              <div
                className="relative group"
                onMouseEnter={() => handleEnter(item.id)}
                onMouseLeave={handleMouseLeave}
              >
                {item.id === hoverid && (
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black  to-transparent flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:scale-110 my-[9px] mx-1"
                    style={{ zIndex: 10 }}
                  >
                    <FaPlay
                      className="text-rose-600 text-3xl shadow-lg "
                      style={{
                        zIndex: 10,
                        filter: 'drop-shadow(0 0 15px rgba(245, 255, 255, 0.9))',
                      }}
                    />
                  </div>
                )}
                <img
                  src={!item.poster_path ? moviesspotgif : `${poster_url}${item.poster_path}`}
                  className="w-full rounded-xl p-[4px] cursor-pointer transition-transform duration-300 ease-in-out transform "
                  alt={item.title || item.name}
                />
              </div>
              <span className="text-gray-300 text-lg px-1 overflow-hidden">{item.title || item.name}</span>
            </a>
          ))}
        </Slider>
      )}
    </div>
  );
};
