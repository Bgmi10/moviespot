import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { poster_url } from '../utils/constans';
import { useSelector } from 'react-redux';


const Searchpage = () => {
    const [data, setData] = useState([]);
    const theme = useSelector(store => store.theme.toggleTheme);
    const query = new URLSearchParams(useLocation().search);
    const [scrollCheck, setScrollCheck] = useState(false);
    
    const [page, setPage] = useState(1);

    const searchQuery = query.get('query');

    const fetchSearchResults = async () => {
        const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`);
        const json = await res.json();
        setData(prevData => [...prevData, ...json.results]);
    };


    useEffect(() => {
        if (scrollCheck === true) {
            setPage(prevPage => prevPage + 1);
        }
    }, [scrollCheck]);

    useEffect(() => {
        if (scrollCheck || page === 1) {
            fetchSearchResults();
        }
    }, [page]);

    const scrollevent = () =>{
        const isScrolledToBottom = window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100;
        setScrollCheck(isScrolledToBottom)
    }
 
    useEffect(() => {
       

        window.addEventListener('scroll',scrollevent);

        return () => {
            window.removeEventListener('scroll', scrollevent);

           
        };
       
    }, []);
       if(data?.results?.poster_path === null) return  "img not avialable"
    return (
        <div className="px-4 lg:px-32 flex flex-wrap justify-center">
            
        {data.length === 0 ? <p className='text-gray-300 '>No search found </p> : data.map((item) => (
          <Link to={`/searchdetail/${item.id}`} key={item.id} >
            <div className="p-4 flex flex-col items-center">
              <img
                src={item.poster_path ? `${poster_url}${item.poster_path}` : ''}
                alt="movie poster"
                className="rounded-lg w-full lg:w-40  lg:h-60  sm: h-52  sm:w-42 hover:scale-105 transition-transform"
              />
              <div>
              <p className=" mt-2 text-gray-400  whitespace-normal overflow-hidden">{item.original_language}</p>
              </div>
            </div>
           
          </Link>
        ))}
      </div>
    );
};

export default Searchpage;
