import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import '../login.css';
import { lang } from '../utils/lang'
import Oauthlogin from '../Oauth/Oauthlogin'


const Login = () => {
  
 
  const [currlang,setcurrlang] = useState('en')
  const Multilang = lang[currlang]

  return (
    <div  >
      <div  className='flex justify-end px-5 py-3 relative'>
  
        
  <select className='bg-gray-400 rounded-sm outline-none ' onChange={(e)=>setcurrlang(e.target.value)}>
     <option value={"en"} >
      en
     </option>
     <option value={"ta"}>
      ta
     </option>
     <option value={"hi"}>
      hi
     </option>
  </select>

</div>
      <div className="relative h-screen overflow-hidden  ">
    
      
      <form
        onSubmit={(e) => e.preventDefault()}
        className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 w-96 bg-opacity-75 bg-black text-white rounded-lg text-center shadow-md relative "
      >
       
        <div className="flex space-x-2 mb-4">
          <FaPlay className="text-rose-600 text-2xl animate-pulse" />
          <h1 className="text-xl font-bold text-rose-600">Movie <span className='text-white'>Spot</span></h1>
        </div>


        <Oauthlogin />

        <Link to="/terms/condition">
        <div className="mt-20 text-xs text-gray-500 cursor-pointer">
       {Multilang.terms}
        </div>
        </Link> 
      </form>
    </div>
    </div>
  );
};

export default Login;
