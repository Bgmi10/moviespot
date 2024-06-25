import React from 'react';
import footerimg from '../img/crop footer.jpeg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LottieAnimation } from './lottie';
import * as share from '../components/share.json';

const Footer = () => {
  const theme = useSelector(store => store.theme.toggletheme);


  const handleshareclick  = () =>{
    
    const message = encodeURIComponent(`🌟 Discover Moviesspot.buzz! 🤩 Dive into the world of top-rated movies, exclusive releases, and more! Enjoy ad-free streaming and immerse yourself in cinema magic! 🎬🍿 #MovieLovers #StreamingNow`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, "_blank");
    
  }
  return (
    <footer className="relative bg-gray-900 text-white py-10 mt-20">
      <img src={footerimg} className="absolute inset-0 w-full h-full object-cover opacity-25" alt="Footer background" />
      <div className="relative z-10 container mx-auto px-6">
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
              <Link to={'/'}>
                <li className="hover:text-rose-600 transition duration-300">Home</li>
              </Link>
              <li className="hover:text-rose-600 transition duration-300">New Releases</li>
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
            <p className="text-gray-300">Facebook | Twitter | Instagram | YouTube</p>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-300 border-t border-gray-700 pt-4">
          <p>© 2024 Movie Website. All rights reserved.</p>
          <Link to='/terms/condition'>
            <p className="hover:text-rose-600 transition duration-300">Privacy Policy | Terms of Service | Cookie Policy</p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
