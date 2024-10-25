import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const Index = () => {
  const [data, setData] = useState([]);
  const [userquery, setUserQuery] = useState('');
  const [endpage, setEndpage] = useState(false);
  const [page, setPage] = useState(1);
  const [isdata, setISdata]= useState(null);

  const fetch_data = async () => {
    try {
      const res = await fetch(
        `https://www.eporner.com/api/v2/video/search/?query=${userquery}&per_page=20&page=${page}&thumbsize=big&order=top-weekly&gay=1&lq=1&format=json`
      );
      const json = await res.json();
      setData(prev => [...prev, ...json?.videos]);
      setISdata(json?.videos);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetch_data();
  }, [userquery, page]);

  const handlescroll = () => {
    const isscreenend = window.innerHeight + window.scrollY >= document.body.scrollHeight - 250;
    setEndpage(isscreenend);
  };

  useEffect(() => {
    window.addEventListener('scroll', handlescroll);
    return () => window.removeEventListener('scroll', handlescroll);
  }, []);

  useEffect(() => {
    if (endpage) {
      setPage((prev) => prev + 1);
    }
  }, [endpage]);

  const dummycard = Array.from({ length: 30 }, (_, i) => i);


  return (
    <>
      <div className='justify-center flex py-20 mb-[-90px]'>
        <input
          type='text'
          placeholder='Search'
          className='rounded-lg bg-gray-600 text-white w-1/2 p-3 outline-none m-3'
          onChange={(e) => setUserQuery(e.target.value)}
        />
      </div>

      <div className='flex flex-wrap justify-center gap-3 p-4'>
      
        {!isdata ? (
          <div className='p-2 gap-3 grid grid-cols-4  justify-center flex-wrap'>
            {dummycard.map((i , index) => (
              <div
                className='w-80 rounded-lg h-64 animate-pulse bg-gray-700'
                key={index}
              ></div>
            ))}
          </div>
        ) : (
          data?.map((i) => (
            <Link key={i?.id} to={`/porn/detail/${i?.id}`} className='w-80 cursor-pointer'>
              <div className='bg-gray-800 rounded-lg overflow-hidden shadow-lg'>
                 <img
                  src={i?.default_thumb?.src}
                  alt={i?.title}
                  className='w-full blur-3xl h-48 object-cover hover:mb-[-4px]'   
                />
                <div className='p-4'>
                  <p className='text-gray-300 font-semibold truncate'>
                    {i?.title}
                  </p>
                  <div className='flex items-center justify-start mt-2'>
                    <div className='flex items-center text-gray-400'>
                      <VisibilityIcon className='mr-1' color='error' />
                      <span>{i?.views?.toLocaleString()}</span>
                    </div>
                    <div className='flex items-center text-gray-400 ml-2'>
                      <AccessTimeIcon className='mr-1' />
                      <span>{i?.length_min} min</span>
                    </div>
                    <div className='flex items-center text-gray-400 ml-2'>
                      <ThumbUpIcon className='mr-1' color='info' />
                      <span>{i?.rate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};
