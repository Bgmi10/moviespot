import React, { useState, useRef } from 'react';

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const latestSearchTerm = useRef('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onSearch(latestSearchTerm.current || searchTerm);
  // };

  const handleSpeechRecognition = () => {
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
    <div className="flex justify-center items-center bg-black">
      <form  className="flex items-center relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearch}
            className="p-2 border rounded-md focus:outline-none focus:border-gray-500 transition-all duration-300 transform scale-100 hover:scale-105 m-2 sm:w-96 bg-black text-white" // Updated style
          />
          <button
            type="button"
            onClick={handleSpeechRecognition}
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
        <button type="submit" className="bg-rose-600 rounded-md p-2 cursor-pointer">
          Search
        </button>
        {listening && (
          <p className="absolute right-8 top-8 text-gray-600 m-4 p-2">
            {transcript}
          </p>
        )}
      </form>
    </div>
  );
};

export default Searchbar;
