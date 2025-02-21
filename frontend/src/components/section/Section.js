import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import Slider from 'react-slick';
import { poster_url } from '../../utils/constants';
import useFetchCategory from '../../hooks/useFetchSection';
import { Link } from 'react-router-dom';
import Loader from '../admin/Loader';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function Section({ title, type, category }) {
  const { data, error, loader } = useFetchCategory(type, category);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);

    return () => clearTimeout(timer);
  },[]);

  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      }
    ]
  };

  return (
    <div className="lg:p-10 mt-8 sm: p-3">
      <div className="flex justify-between items-center mb-6">
        <h2 className="lg:text-4xl sm: text-sm font-bold border-2 shadow-[0_0_15px_1px_rgba(255,255,255,0.3)] text-white backdrop-blur-lg rounded-3xl lg:px-10 sm: px-6 py-1">{title}</h2>
        <Link to={`/section/${title}/${type}/${category}`} className="group flex items-center text-white font-bold lg:text-2xl transition-colors duration-300">
          <div className='items-center flex font-bold lg:text-4xl sm: text-md sm: px-6 border-2 shadow-[0_0_15px_1px_rgba(255,255,255,0.3)] lg:px-10 rounded-3xl py-1' >
            <span className="mr-2 group-hover:text-rose-600">More</span>
            <FaArrowRight className="group-hover:translate-x-10 transition-transform duration-300 group-hover:text-rose-600" />
          </div>
        </Link>
      </div>
        {isClient && <Slider {...settings}>
          {loader ? <div className='p-20 items-center flex justify-center h-full'><Loader loading={loader}/></div>: data?.map((movie, index) => (
            <motion.div
              key={index}
              className="relative group px-1"
              whileHover={{ scale: 1.01 }}
            >
              <Link to={`/section/detail/${movie.type}/${movie.category}/${movie.id}`}>
                <motion.img
                  src={`${poster_url}${movie.posterPath}`}
                  alt={movie.title}
                  className="w-full h-auto rounded-2xl shadow-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  loading='lazy'
                />
              </Link>
              <motion.h3
                className="mt-2 lg:text-2xl sm: md font-bold text-white truncate"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {movie.title} 
              </motion.h3>
              <span className="text-white">({movie.releaseDate.slice(0, 4)})</span>
              <div className='flex flex-wrap gap-1 mt-1'>
                 {movie.language.map((item, index) =>  
                  <motion.h1
                  className="lg:text-[11px] sm: text-[8px] px-1 text-rose-600 font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  key={index}
                  >{item}</motion.h1> 
                 )} 
               </div>
            </motion.div>
          ))}
        </Slider>}

    </div>
  );
}
