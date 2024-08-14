import React from 'react';
import footerimg from '../img/crop footer.jpeg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LottieAnimation } from './lottie';
import * as share from '../components/share.json';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const theme = useSelector(store => store.theme.toggletheme);


  const handleshareclick  = () =>{
    
    const message = encodeURIComponent(`🌟 Discover Moviesspot.buzz! 🤩 Dive into the world of top-rated movies, exclusive releases, and more! Enjoy ad-free streaming and immerse yourself in cinema magic! 🎬🍿 #MovieLovers #StreamingNow`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, "_blank");
    
  }
  return (
    <footer className="relative bg-gray-900 text-white  mt-20">
      <img src={footerimg} className="absolute inset-0 w-full h-full mt-10 object-cover opacity-25  " alt="Footer background" />
      <div className="relative z-10 container mx-auto px-6 bg-black bg-opacity-60 ">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center lg:text-left mt-[-60px]" onClick={handleshareclick}>
            <LottieAnimation gif={share} />
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-blue-500 to-purple-600 animate-slide-up">
              Support Us
            </h2>
            <p className="text-gray-300">
              Share our website and help us grow!
            </p>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-blue-500 to-purple-600 animate-slide-up">
              Quick Links
            </h2>
            <ul className="text-gray-300 space-y-1">
              
                <li className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = '/'}>Home</li>
               <li className="hover:text-rose-600 transition duration-300" >New Releases</li>
              <li className="hover:text-rose-600 transition duration-300">Top Rated</li>
              <li className="hover:text-rose-600 transition duration-300">Genres</li>
              <li className="hover:text-rose-600 transition duration-300">Subscription Plans</li>
              <li className="hover:text-rose-600 transition duration-300">Contact Us</li>
            </ul>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-blue-500 to-purple-600 animate-slide-up">
              Contact Us
            </h2>
            <p className="text-gray-300">Email: moviesspot@gmail.com</p>
            <p className="text-gray-300">Phone: +91-7845442450</p>
            <p className="text-gray-300">Address: Chennai, Tamil Nadu, India</p>
          </div>
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-blue-500 to-purple-600 animate-slide-up">
              Follow Us
            </h2>
            
            <span  className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = '/'}>Twitter<FaTwitter /></span>
            <span  className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = '/'}>Facebook<FaFacebook /> </span>
            <span  className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = 'https://www.instagram.com/ig_subash.gaming/'}>Instagram<FaInstagram /></span>
            
          </div>
        </div>
        <div className="mt-8 text-center text-gray-300 border-t border-gray-700 pt-4">
          
         
            <span className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = '/terms-condition'}>| Terms of Service  </span>
            <span  className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = '/privacy-policy'}> | Privacy Policy </span> 
            <span  className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = '/refund-policy`'}> | Refundpolicy</span>
           
           
            
              <p>© 2024 Moviesspot All rights reserved.</p>
              <div>
                  Made with ❤️
              </div>
         
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
