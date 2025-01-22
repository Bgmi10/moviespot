import React, { useEffect, useState } from 'react'
import { poster_url } from '../../utils/constants'
import gif from '../../img/ms1.gif'


export const Quicksearch = ({searchQuery, type}) => {
  // Todo need to cache the results 
    const [page, setPage] = useState(1)
    const [endpage, setEndpage] = useState(false)
    const [data, setData] = useState([])
    

    const fetch_data = async () => {
      try{
        const res = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${searchQuery}&page=${page}&api_key=${process.env.REACT_APP_API_KEY}`);
        const json = await res?.json()
        setData(prev => [ ...prev, ...json?.results])
      }
      catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      if (endpage) {
        setPage(prev => prev + 1)
      }
    },[])

    const handlescroll = () => {
      setEndpage(window.innerHeight + window.scrollY >= document.body.scrollHeight - 400)
    }
 
    useEffect(() =>{ 
       window.addEventListener('scroll' , handlescroll);
       return () => window.removeEventListener('scroll' , handlescroll);
    }, [])
   
    useEffect(() => {
      if (page === true) {
        fetch_data()
        return;
      }
      const t = setTimeout(() => {
        if (page && searchQuery) {
         fetch_data();
        }      
      }, 400);
       return () => clearTimeout(t);
    }, [page, searchQuery])


     return (
        <div className={'p-5 py-5'} >
        <div className="grid sm: grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            
       {data?.map((item) => (
          <a href={`/searchdetail/${item?.id}`} key={item?.id}  >
          <div className="flex flex-col items-center">
          <div className="w-full aspect-[2/3] relative overflow-hidden rounded-lg">
              <img
                src={item?.poster_path ? `${poster_url}${item?.poster_path}` : gif}
                alt="movie poster"
                className="lg:w-full lg:h-full sm: h-52 sm: w-32 object-cover hover:scale-105 transition-transform duration-300"
              />
           </div>
            <div className="mt-2 w-full lg:p-1">
                <p className="text-gray-300 lg:text-xl sm: text-sm sm:text-base font-normal truncate">
                  {item?.title}
                </p>
              </div>
            </div>
          </a>
        ))}
        </div>
      </div>
  )
}
