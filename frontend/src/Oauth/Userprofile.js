import React, { useState } from 'react';
import Useauth from '../components/Hooks/useauth';
import verfied_gif from '../img/00071.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import notverfied_gif from '../img/00024.png'
import axios from 'axios';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import HeroLightpass from '../components/HeroLightpass';

const UserProfile = () => {
  const auth = Useauth();

  const [edit , setedit] = useState(false)
  const [name , setname] = useState('')
  const [email , setemail] = useState('')
  const [picture,setpicture] = useState('')
  
  const editclick = () =>{
    setedit(true)

  }
  

  const handlefilechange = (e) =>{
   const file = e.target.files[0]
   const reader = new FileReader()
   reader.onload = () =>{
           setpicture(reader.result)
   }
   reader.readAsDataURL(file);
  }

  const userformdata = {
    name :name,
    email : email,
    
  }


  const handleSubmit = async (e) =>{

    e.preventDefault()
    try{
   const res = await axios.put(`http://localhost:5000/api/user/${auth.user.sub}`,userformdata)
   console.log(res.data , "user updated success")
  }
catch(error) {
  console.log(error)
}
  



    
  }

  // const handleSubmit = async (e) =>{
  //   e.preventDefault()
  //   try{

  //     const Formdata = userformdata
  //     const res = await fetch(`http://localhost:5000/api/user/${auth.user.sub}`, {
  //       method:"PUT",
  //       body:Formdata
  //     })

  //     console.log(res.data)
  //   }
  //   catch(error ){
  //     console.log(error)
  //   }
  // } 
  return (
    <div className="relative flex justify-center items-center ">
      {auth.isAuthenticated && (
        
        <div className="abslute flex flex-col items-center">
          {/* Background Image */}
          <img
            src="https://img.freepik.com/free-photo/abstract-gradient-neon-lights_23-2149279137.jpg?t=st=1718009740~exp=1718013340~hmac=5a1aacadeb745e565fe6549bf7c4d65ec516e037ce80f4ac43b7e0c22560eb6c&w=360"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
            alt="Background"
          />

          {/* Profile Picture */}
          <div className="relative mb-3 ">
            <img
              src={auth.user.picture}
              className="h-24 w-24 mt-10 rounded-full border-2 border-gray-500 bg-opacity-50 hover:scale-105 transition-transformx"
              alt="User Profile"
            />
            {/* Edit Icon */}
            <FontAwesomeIcon
              icon={faEdit}
              className="absolute right-11 bottom-4 text-white cursor-pointer"
              style={{ transform: 'translate(50%, 50%)' }}
              onClick={editclick}
            />
            
            
          </div>
            {/* User Name */}
            {auth.user.email_verified ?
          <div className='flex text-gray-400 '>
          <p className='px-[-20px]'> verified  </p> 
          <img src={verfied_gif}  className='h-4 w-4 absolute rounded-[1200px]  ml-14 mt-[3px]'></img>
          </div>: 
           <div className='flex text-gray-400 '>
           <p className='px-[-20px]'> not verified  </p> 
           <img src={notverfied_gif}  className='h-4 w-4 absolute rounded-[1200px]  ml-[88px] mt-[3px]'></img>
           </div>
          }
          
        {!edit &&<>
          <h1 className="mt-6 text-white relative  font-Bold text-2xl">{auth.user.name}</h1>
          <h1 className="mt-6 text-gray-400 relative  font-light text-lg ">{auth.user.email}</h1>
          </>}

        {edit &&  <form onSubmit={handleSubmit} className="flex flex-col items-center mt-6 outline-none border-none relative">
              <div className="mb-4">
                <label className="text-white block mb-1" htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="p-2 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="text-white block mb-1" htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="p-2 rounded-lg"
                />
              </div>
              <div className="mb-4 ml-[110px]">
                <label className="text-white block mb-1" htmlFor="picture">Profile Picture:</label>
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={handlefilechange}
                  className="p-2  rounded-lg"
                />
              </div>
              <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                Save Changes
              </button>
            </form>}
            <buttpn>Click this button</buttpn>
          {/* <HeroLightpass /> */}
        </div>
      )}
    </div>
  );
};

export default UserProfile;


// user can add perference through via POST but the thing is im using TMDB API is it possible 