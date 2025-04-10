import React, { useEffect, useState } from 'react';
import { poster_url } from '../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { db } from '../../utils/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSpinner } from '@fortawesome/free-solid-svg-icons';

export const MovieSearchCard = ({ data, loader, query, searchType, language }) => {
  const [firebaseLoader, setFirebaseLoader] = useState(false);
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userEmail, setUserEmail] = useState(""); 
  const navigate = useNavigate();
  const [showConfirmRequest, setShowConfirmRequest] = useState(false);

  async function fetchUserData () {
    try{
      const response = await fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=464ed0df1c0342c6a959b07bdcad59a5");
      const json = await response.json();
      setUserData(json);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async() => {
    try {
     setFirebaseLoader(true);
     await addDoc(collection(db, "user-requests"), {
      id: Math.floor(Math.random() * 1000),
      userEmail: userEmail,
      isUploaded: false,
      userIp: userData.ip,
      userCountry: userData.country.name, 
      userPhoneCode: userData.country.phone_code,
      userNativeFlag: userData.country.flag,
      userCurrency: userData.country.currency,
      userContinent: userData.continent.name,
      userState: userData.state.name,
      userCity: userData.city.name,
      query: query,
      type: searchType,
      language: language
     });
     setIsFormSubmit(true);
    } catch (e) {
      console.log(e);
    } finally {
      setFirebaseLoader(false);
    }
  }

  const handleConfirmRequest = async () => {
    if (!userEmail) {
      window.alert("PLEASE FILL OUT THE EMAIL BOX.");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(userEmail)) {
      window.alert("PLEASE ENTER A VALID EMAIL ADDRESS.");
      return;
    }
    
    await handleSubmit();
    setShowConfirmRequest(false);
  }
  
  return (
    <div className="p-5">
    {isFormSubmit && (
  <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-sm">
    <div className="w-[90%] max-w-[400px] bg-black/90 p-8 border-2 border-white rounded-lg shadow-lg">
      <div className="text-center text-white">
        <h2 className="text-2xl font-bold mb-4 text-rose-600">
          Thank You for Your Request!
        </h2>
        <p className="text-md mb-4">
          You will be notified at <strong>{userEmail}</strong> once it's available.
        </p>
        <div className="flex flex-col gap-4">
          <button
            className="w-full py-2 px-4 text-white bg-rose-600 rounded-lg font-semibold shadow-md transition-all duration-300"
            onClick={() =>{ 
              setUserEmail("");
              navigate("/")
            }}
          >
            Back to Homepage
          </button>
          <button
            className="w-full py-2 px-4 text-white bg-transparent border-2 border-white rounded-lg font-semibold transition-all duration-300"
            onClick={() => {
            setIsFormSubmit(false)
            setUserEmail("");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    {loader ? (
      <div className="flex justify-center items-center h-64">
        <span>Loading...</span>
      </div>
    ) : (
      <> 
      {data?.length === 0 &&<>
        <div className="mt-20 flex justify-center"> 
          <span className="lg:text-3xl font-bold flex gap-2">No {searchType} found for
            <span className="text-rose-600">"{query}"</span>
          </span> 
        </div>
       {
        showConfirmRequest && 
          <div className="fixed inset-0 flex justify-center items-center z-50 backdrop-blur-md lg:p-0 p-6">
            <FontAwesomeIcon icon={faClose} className='text-white absolute top-[270px] lg:top-[180px] cursor-pointer font-bold text-2xl' onClick={() => setShowConfirmRequest(false)} />
          <div className="w-fit bg-gradient-to-t p-6 border-2 rounded-lg flex flex-col gap-3">
             <span className="block text-white text-lg font-bold">
              {`Want to notify when "${query}" added ? drop your email`}
              </span>
             <input type="text" placeholder="Email"  onChange={(e) => setUserEmail(e.target.value)} className="bg-transparent border-gray-600 border outline-none p-3 rounded-md w-full mt-4" />
             <button className='p-3 px-10 font-bold py-2 rounded-lg bg-rose-600' onClick={handleConfirmRequest}>
              {firebaseLoader ? <FontAwesomeIcon icon={faSpinner} spin /> : "Confirm Request"}
             </button>
          </div>
        </div>
       }
       <div className='flex justify-center mt-8'>
          <button className='p-3 px-10 font-bold py-2 rounded-lg bg-rose-600' onClick={() => setShowConfirmRequest(true)}>
            {firebaseLoader ? <FontAwesomeIcon icon={faSpinner} spin /> : "Request movie"}
          </button>
        </div> 
       </>
      }
      <div className="grid sm: grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        { data?.map((movie) => (
          <Link to={`/search/detail/${movie.id}`} key={movie.id}>
            <div className="flex flex-col items-center hover:scale-105 transition-transform">
              <div className="w-full aspect-[2/3] relative overflow-hidden rounded-lg">
                <img
                  src={movie.posterPath ? `${poster_url}${movie.posterPath}` : "PLACEHOLDER_IMAGE"}
                  alt={`${movie.title} poster`}
                  className="duration-300 rounded-2xl"
                />
              </div>
              <div className="mt-2 w-full p-1 flex flex-col">
                <span className="text-white text-sm sm:text-base lg:text-xl font-bold truncate">{movie.title}</span>
                <span>({movie.releaseDate.slice(0, 4)})</span>
                <div className='flex flex-wrap gap-1 mt-1'>
                 {movie.language.map((item, index) =>  
                  <motion.h1
                  className="lg:text-[11px] bg- sm: text-[8px] px-1 rounded-xl text-rose-600 font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  key={index}
                  >{item}</motion.h1> 
                 )} 
               </div>
              </div>
             
            </div>
          </Link>
        ))}
      </div>
      </>
    )}
  </div>
  )
}
