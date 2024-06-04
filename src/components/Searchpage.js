import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gif from '../img/movieSpotgif.gif';
import { poster_url } from '../utils/constans';
import { useSelector } from 'react-redux';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Searchpage = () => {
    const [data, setData] = useState([]);
    const theme = useSelector(store => store.theme.toggleTheme);
    const query = useQuery();
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
        <div className="sm: px-4   lg:px-32 lg:flex lg:flex-row lg:flex-wrap  sm: flex  sm: flex-wrap" >
            {data.length === 0 ? (
                <p className={`${theme ? 'text-white lg:px-[420px] sm: px-16' : 'text-black lg:px-[420px] sm: px-16'}`}>No search found</p>
            ) : (
                data.map(i => (
                    <Link to={`/searchdetail/${i.id}`} key={i.id}>
                        <div >
                        <div className="lg:p-10 lg:justify-center items-center sm: p-7 ">
                         
                                <img src={poster_url + i.poster_path} className="rounded-lg w-full lg:w-40 sm: h-40    lg:h-auto hover:scale-105 " alt="no img" />
                                {!i.poster_path && <img src='https://static.vecteezy.com/system/resources/previews/005/720/408/original/crossed-image-icon-picture-not-available-delete-picture-symbol-free-vector.jpg ' className='h-60 w-40 rounded-lg'></img>}
                            <h1 className="text-gray-400 flex-wrap flex">{i.original_language}</h1>
                        </div>
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
};

export default Searchpage;
