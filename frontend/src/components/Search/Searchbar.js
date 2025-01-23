import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Mic, X } from "lucide-react";
import poster from "../../img/poster.jpeg";
import useSearch from "../hooks/useSearch";

const UpdatedSearchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [searchType, setSearchType] = useState("movies");
  const [language, setLanguage] = useState("all");

  const { data, loader, error } = useSearch(searchType, searchTerm, language);

  const languages = [
    "English", "Tamil", "Hindi", "Malayalam", 
    "Telugu", "Korean", "Tamil Dubbed", "Kannada", "All"
  ]

  const handleSpeechRecognition = () => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const recognition = new Recognition()

      recognition.onstart = () => {
        setListening(true)
        setTranscript("")
      }

      recognition.onresult = (event) => {
        const currentTranscript = event.results[0][0].transcript
        setSearchTerm(currentTranscript)
        setTranscript(currentTranscript)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.start()
    } else {
      alert("Speech recognition not supported")
    }
  }

  return (
    
    <div className="relative">
      <img src={poster} className="absolute lg:bottom-[286px] sm: bottom-[325px]"/>
      <div className="relative z-10 py-32 text-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover Your Next Favorite {searchType}
          </motion.h1>
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder={`Search for ${searchType}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-[13px] pl-6 pr-28 text-lg rounded-l-full bg-transparent text-white placeholder-white/70 border-2 focus:outline-none focus:border-white"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")} 
                    className="absolute right-16 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                )}
              </div>
              <div className="flex">
                <motion.button
                  type="button"
                  onClick={handleSpeechRecognition}
                  className={`absolute right-20 top-5 ${
                    listening ? "text-rose-600" : "text-white"
                  } ${listening ? "animate-pulse" : ""}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mic size={24} />
                </motion.button>
                <motion.button
                  type="submit"
                  className="p-4 lg:py-[15px] sm: py-[16px] border-l-0 bg-gradient border-2 rounded-r-full"
                >
                  <Search size={24} />
                </motion.button>
              </div>
            </div>
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="type-select" className="text-sm font-medium">
                  Type:
                </label>
                <select
                  id="type-select"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="bg-white/20 backdrop-blur-lg border border-white/30 text-white text-sm rounded-lg focus:border-rose-500 block w-full p-2.5"
                >
                  <option value="movies" className="text-gray-900">Movies</option>
                  <option value="series" className="text-gray-900">Series</option>
                </select>
              </div>
              <div className="flex flex-col items-start gap-2">
                <label htmlFor="language-select" className="text-sm font-medium">
                  Language:
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-white/20 backdrop-blur-lg border border-white/30 text-white text-sm rounded-lg focus:border-rose-500 block w-full p-2.5"
                >
                  {languages.map((lang) => (
                    <option key={lang.toLowerCase()} value={lang.toLowerCase()} className="text-gray-900">
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default UpdatedSearchbar