
import { useAuth0 } from "@auth0/auth0-react";
import React, { useState  , useRef} from "react";
import LogoutButton from "./LogoutButton";
import { Login, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";
import auth from "../components/Hooks/useauth";
import Useauth from "../components/Hooks/useauth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
 
  const auth = Useauth()
  
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);

  };

  

     
  return (
   auth.isAuthenticated && (
      <div className="relative inline-block  "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
       <img
          src={auth.user.picture}
          alt='n'
          className="h-[33px] w-[33px] ml-0 cursora-pointer rounded-full mt-2"

          

        />
     
        {isHovered && (
          <div
            className="absolute top-12 lg:left-[30%] transform -translate-x-1/2 bg-white border border-gray-200 shadow-md rounded-lg p-6 z-10 sm: left-[25%]"
            style={{  visibility: isHovered ? "visible" : "hidden" }}
          >
            <img
                src={auth.user.picture}
                alt='n'
                className="h-10 w-10 rounded-full mr-2"
              />
          
            <hr className="my-2 border-t border-gray-200" />
           <a href='/profile'>
             <button className="text-blue-500 text-sm focus:outline-none" >
             Profile
              </button>
           </a>

              <LogoutButton />
             
     
            </div>
           
        
        )}
        
      </div>
    )
  );
};

export default Profile;
