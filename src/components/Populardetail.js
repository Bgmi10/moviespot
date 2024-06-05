import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { poster_url } from '../utils/constans';

const Populardetail = () => {
  const [data, setData] = useState([]);
  const [scrollCheck, setScrollCheck] = useState(false);
  const [page, setPage] = useState(1);
  const query = new URLSearchParams(useLocation().search);

  const sort = query.get('sort');
  const apiUrl = query.get('apiurl');
  console.log("sdasd")
  const fetchData = async () => {
    try {
      const res = await fetch(`${apiUrl}${process.env.REACT_APP_API_KEY}&page=${page}&sort=${sort}`);
      const json = await res.json();
      setData(prevData => [...prevData, ...json.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 100) {
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
    <div className="px-4 lg:px-32 flex flex-wrap justify-center">
      {data.map((item) => (
        <Link to={`/searchdetail/${item.id}`} key={item.id} >
          <div className="p-4 flex flex-col items-center">
            <img
              src={item.poster_path ? `${poster_url}${item.poster_path}` : 'https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg'}
              alt="movie poster"
              className="rounded-lg w-full lg:w-40  lg:h-60  sm: h-52  sm:w-42 hover:scale-105 transition-transform"
            />
            <div>
            <p className=" mt-2 text-gray-400  whitespace-normal overflow-hidden">{item.title}</p>
            </div>
          </div>
         
        </Link>
      ))}
    </div>
  );
};

export default Populardetail;
