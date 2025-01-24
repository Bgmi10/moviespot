import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { poster_url } from '../../utils/constants';
import { useSelector } from 'react-redux';
import gif from '../../img/movieSpotgif.gif'


const Searchpage = () => {
    const [data, setData] = useState([]);
    const theme = useSelector(store => store.theme.toggleTheme);
    const [scrollCheck, setScrollCheck] = useState(false);
    const type = useSelector(store => store.movietoggle.type1)
    const [page, setPage] = useState(1);
    const query = new URLSearchParams(useLocation().search);
    const url =  query.get('query');
    const loc = window.location.pathname === '/searchpage'


    const fetchSearchResults = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${url}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`);
        const json = await res.json();
        setData(prevData => [...prevData, ...json.results]);
    };


    useEffect(() => {
        if (scrollCheck === true) {
            setPage(prevPage => prevPage + 1);
        }
    }, [scrollCheck]);

    useEffect(() => {
        if (scrollCheck || page === 1 ) {
            fetchSearchResults();
        }
    }, [page]);



    const scrollevent = () =>{
        const isScrolledToBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 400;
        setScrollCheck(isScrolledToBottom)
    }
 
    useEffect(() => {
       

        window.addEventListener('scroll',scrollevent);

        return () => {
            window.removeEventListener('scroll', scrollevent);

        };
       
    }, []);

    return (
      <div className={'px-4 py-24'} >
        <div className="grid sm: grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            
        {data.length === 0 ? <p className='text-gray-300 '>No search found </p> : data.map((item) => (
          <a href={`/searchdetail/${item.id}`} key={item.id}  >
          <div className="flex flex-col items-center">
          <div className="w-full aspect-[2/3] relative overflow-hidden rounded-lg">
              <img
                src={item.poster_path ? `${poster_url}${item.poster_path}` : gif}
                alt="movie poster"
                className="lg:w-full lg:h-full sm: h-52 sm: w-32 object-cover hover:scale-105 transition-transform duration-300"
              />
           </div>
            <div className="mt-2 w-full lg:p-1">
                <p className="text-white lg:text-xl sm: text-sm sm:text-base font-normal truncate">
                  {item.title} ({item.releaseDate.slice(0, 4)})
                </p>
              </div>
            </div>
           
          </a>
        ))}
        </div>
      </div>
    );
};

export default Searchpage;
