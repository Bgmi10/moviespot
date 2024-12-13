import React, { useState } from 'react';
import {  Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { lang } from '../utils/lang'
import Oauthlogin from '../Oauth/Oauthlogin'
import Header from './Header';


const Login = () => {
  
 
  const [currlang,setcurrlang] = useState('en')
  const Multilang = lang[currlang]

  return (

<>
<div className='flex justify-end px-5 py-3 relative '>
        
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
      <div className="relative h-screen justify-center flex lg:items-center">
        <Oauthlogin />
      </div>

      <div className=" text-xs text-gray-500 cursor-pointer justify-center flex mt-[-240px] ml-8">
        <Link to="/terms/condition">
        {Multilang.terms}
       </Link> 
      </div>
       
      </>
  );
};

export default Login;
