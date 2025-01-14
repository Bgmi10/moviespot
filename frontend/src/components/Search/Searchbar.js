import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Searchcatagory from './Searchcatagory';
import { Quicksearch } from './Quicksearch';

const Searchbar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const latestSearchTerm = useRef('');
  const theme = useSelector(store => store.theme.toggletheme)
  const category_type = useSelector(store => store.movietoggle.type1)

  
 const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  
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
    
    <div className={theme ? `py-32` : `bg-white`}  >
      <div className={ `flex justify-center items-center` }>
      <div  className="flex items-center relative">
        <div className="relative">
          <input
            type="text"
            placeholder={'Search for ' + `${category_type}...`}
            value={searchTerm}
            onChange={handleSearch}
            className={theme ? "p-2 border outline-none border-gray-900 rounded-md m-2 lg:w-[700px] sm: w-60 bg-slate-900 text-white "  : "p-2 border rounded-md  border-gray-900  m-2 lg:w-[700px] outline-none sm: w-60  text-gray-500 " }
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
         <div>
             <Searchcatagory />
          </div>
         <div>
            <Quicksearch searchQuery={searchTerm}  type={category_type}/>
        </div>
         
      </div>
      
  );
};

export default Searchbar;




// here problem is user type input results is coming from cache i need to  prevent that 