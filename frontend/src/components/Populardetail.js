import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { poster_url } from '../utils/constants';
import gif from '../img/movieSpotgif.gif';

const Populardetail = () => {
  const [data, setData] = useState([]);
  const [scrollCheck, setScrollCheck] = useState(false);
  const [page, setPage] = useState(1);
  const query = new URLSearchParams(useLocation().search);
  const sort = query.get('sort');
  const apiUrl = query.get('apiurl');

  const fetchData = async () => {
    try {
      const res = await fetch(`${apiUrl}${process.env.REACT_APP_API_KEY}&page=${page}&sort=${sort}`);
      const json = await res.json();
      setData(prevData => [...prevData, ...json?.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 250) {
      setScrollCheck(true);
    }
  };

  useEffect(() => {
    if (scrollCheck) {
      setPage(prevPage => prevPage + 1);
      setScrollCheck(false);
    }
  }, [scrollCheck]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="px-4 p-24">
      <div className="grid sm: grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <Link to={`/searchdetail/${item.id}`} key={item.id} className="block">
            <div className="flex flex-col items-center">
              <div className="w-full aspect-[2/3] relative overflow-hidden rounded-lg">
                <img
                  src={!item.poster_path ? gif : `${poster_url}${item.poster_path}`}
                  alt="movie poster"
                  className="lg:w-full lg:h-full sm: h-52 sm: w-32 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="mt-2 w-full lg:p-1">
                <p className="text-gray-300 lg:text-xl sm: text-sm sm:text-base font-normal truncate">
                  {item.title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Populardetail;