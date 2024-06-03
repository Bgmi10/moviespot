import React, { useEffect, useState } from 'react'
import { Link, useFetcher, useLocation } from 'react-router-dom'
import { poster_url } from '../utils/constans';
import { useSelector } from 'react-redux';



const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};


  
const Searchpage = () => {
    const [data , setdata] = useState([])
    const theme = useSelector(store => store.theme.toggletheme)
    const query = useQuery();

    const [scrollcheck , setscrollcheck] = useState(false)
    console.log(scrollcheck)

    const [page , setpage] = useState(1)
    console.log(page)

    const searchQuery = query.get('query');

    const scrollevent = () => {
        
        const a = window.innerHeight + window.scrollY >= document.body.scrollHeight
      
        setscrollcheck(a)
        
    }

   
    useEffect(()=>{
        if(scrollcheck  === true) {
            setpage(page + 1)
        }
    },[scrollcheck])
  
   
    useEffect(()=>{
       
        
          if(scrollcheck || page === 1){const fetch_search_results = async() =>{
          const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`)

          const json = await res.json()
          setdata(dat => [...dat, ...json.results])
         
        } 
    

        fetch_search_results()
          }

         window.addEventListener('scroll' , scrollevent)

        return () =>window.removeEventListener('' , scrollevent)
        
      },[page])
   
  return (
    <div>
        {
           data.length === 0  ? <p className={theme ? 'text-white lg:px-[420px] sm: px-16' :'text-black lg:px-[420px] sm: px-16' }>No search Found</p>  : data?.map((i ) => (
                <Link to={`/searchdetail/${i.id}`} key={i.id}>
                  
                <div className=' p-2 sm:items-center lg:justify-center '>
                    <img src={poster_url + i.poster_path } className='h-52 w-1/2  rounded-lg  ' />
                    <h1 className='text-gray-400'>{i.title}</h1>

                </div>
                </Link>    
            ))
        }

    </div>
  )
}   

export default Searchpage