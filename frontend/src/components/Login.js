import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { lang } from '../utils/lang'
import Oauthlogin from '../Oauth/Oauthlogin'


const Login = () => {
  
 
  const [currlang,setcurrlang] = useState('en')
  const Multilang = lang[currlang]

  return (
    <div  >
      <div  className='flex justify-between px-5 py-3 relative'>
      <div className="flex space-x-2  ">
          <div className="text-rose-600 text-2xl animate-pulse py-[2px]">
            <FaPlay />
          </div>
          <div>
          <h1 className='text-rose-600 relative text-lg'>Movie<span className={'text-white'}>Spot</span></h1>

          </div>
        
        </div>
  
        
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

      <div className="relative h-screen  py-40 lg:items-center">
        <div className='px-3 '>
        <Oauthlogin />
        </div>
        <Link to="/terms/condition">
        <div className=" text-xs py-8 px-2 text-gray-500 cursor-pointer">
       {Multilang.terms}
        </div>
        </Link> 
      
    </div>
    </div>
  );
};

export default Login;
