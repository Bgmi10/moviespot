import React, { useState, useRef, useEffect } from 'react';
import { Search } from './Search';
import { useDispatch } from 'react-redux';
import { cacheresults } from '../utils/Searchcacheslice';
import { useSelector } from 'react-redux';





const Searchbar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const latestSearchTerm = useRef('');
  const [movies, setmovies] = useState('')
  const dispatch = useDispatch()
  const cache = useSelector(store=>store.cache)
  const theme = useSelector(store => store.theme.toggletheme)
 

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  

  useEffect(()=>{
   
   const timer =  setTimeout(()=>
  {  
    if(cache[searchTerm]){

   return  setmovies(cache[searchTerm])
    
  } 
   else{
    return fetchmovies()
   }
},150)

    return ()=> {clearTimeout(timer)}
  },[searchTerm])

  const fetchmovies = async() =>{
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${process.env.REACT_APP_API_KEY}`)

    const data = await response.json()

  
   
    dispatch(cacheresults({[searchTerm] : data}))
    setmovies(data)
  }

   const SpeechRecognition = () => {

   

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

      recognition.onstart = () => {
        setListening(true);
        setTranscript('');
      };

      recognition.onresult = (event) => {
        const currentTranscript = event.results[0][0].transcript;
        setSearchTerm(currentTranscript);
        setTranscript(currentTranscript);
        latestSearchTerm.current = currentTranscript;
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser');
    }
  };
  
  

  return (
    <div className={theme ? `bg-slate-900` : `bg-white`}  >
      <div className={ `flex justify-center items-center mb-4 ` }>
      <div  className="flex items-center relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearch}
            className={theme ? "p-2 border rounded-md focus:outline-none focus:border-gray-500 transition-all duration-300 transform scale-100 hover:scale-105 m-2 sm:w-96 bg-slate-900 text-white "  : "p-2 border rounded-md focus:outline-none  border-gray-500 focus:border-gray-600 transition-all duration-300 transform scale-100 hover:scale-105 m-2 sm:w-96  text-gray-500 " }
          />
          <button
            type="button"
            onClick={SpeechRecognition}
            className="absolute right-0 top-3 p-2 mr-3 transition-all duration-300 flex items-end"
            disabled={listening}
          >
            <svg
              className={`w-4 h-4 text-gray-500 ${
                listening ? 'animate-bounce' : ''
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
              />
            </svg>
          </button>
        </div>
        <a href={`/searchpage?query=${searchTerm}`} >
        <button type="submit" className="bg-rose-600 rounded-md p-2 w-20  cursor-pointer font-serif" >
          Search
        </button>
        </a>
        
        {listening && (
          <p className="absolute right-8 top-8 text-gray-600 m-4 p-2">
            {transcript}
          </p>
        )}
           
      </div>
    </div>
    
     <Search movies={movies} />
    
      </div>
  );
};

export default Searchbar;



