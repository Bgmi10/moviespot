import React from 'react';
import footerimg from '../img/crop footer.jpeg';
import { useSelector } from 'react-redux';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const theme = useSelector(store => store.theme.toggletheme);

  const handleshareclick = () => {  
    const message = encodeURIComponent(`🌟 Discover Moviesspot.buzz! 🤩 Dive into the world of top-rated movies, exclusive releases, and more! Enjoy ad-free streaming and immerse yourself in cinema magic! 🎬🍿 #MovieLovers #StreamingNow`);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappUrl, "_blank"); 
  };

  return (
    <footer className="bg-black text-white mt-20 relative bottom-0">
      <img src={footerimg} className="absolute inset-0 w-full h-full object-cover brightness-50 opacity-50" alt="Footer background" />
      <div className="relative w-full z-10 bg-gradient-to-b px-6 py-12 lg:px-20 bg-opacity-30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:justify-between gap-8">
          {/* Quick Links */}
          <div>
            <div className="text-2xl font-bold mb-4 text-white bg-black rounded-md p-2">
              <span className='text-rose-600'>Quick</span> Links
              </div>
            <ul className="text-gray-300 space-y-2">
              <li className="hover:text-rose-600 transition duration-300" onClick={() => window.location.href = '/'}>Home</li>
              <li className="hover:text-rose-600 transition duration-300">Movies</li>
              <li className="hover:text-rose-600 transition duration-300">Series</li>
              <li className="hover:text-rose-600 transition duration-300">Search</li>
              <li className="hover:text-rose-600 transition duration-300">Policy</li>
              <li className="hover:text-rose-600 transition duration-300">Contact Us</li>
            </ul>
          </div>
          <div>
            <div className="text-2xl font-bold mb-4 text-white bg-black rounded-md p-2 w-fit"><span className='text-rose-600'>Contact</span> Us</div>
            <p className="text-gray-300">Email: moviespot@gmail.com</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-white bg-black rounded-md p-2"><span className='text-rose-600'>Follow</span> Us</h2>
            <div className="flex gap-3 text-gray-300 flex-col">
              <span
                className="hover:text-rose-600 transition duration-300 cursor-pointer"
                onClick={() => window.location.href = '/'}
              >
                <FaTwitter className="inline-block" /> Twitter
              </span>
              <span
                className="hover:text-rose-600 transition duration-300 cursor-pointer"
                onClick={() => window.location.href = '/'}
              >
                <FaFacebook className="inline-block" /> Facebook
              </span>
              <span
                className="hover:text-rose-600 transition duration-300 cursor-pointer"
                onClick={() => window.location.href = 'https://www.instagram.com/ig_subash.gaming/'}
              >
                <FaInstagram className="inline-block" /> Instagram
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-300 border-t pt-6">
          <div className="space-x-4">
            <span
              className="hover:text-rose-600 transition duration-300 cursor-pointer"
              onClick={() => window.location.href = '/terms-condition'}
            >
              Terms of Service
            </span>
            <span
              className="hover:text-rose-600 transition duration-300 cursor-pointer"
              onClick={() => window.location.href = '/privacy-policy'}
            >
              Privacy Policy
            </span>
            <span
              className="hover:text-rose-600 transition duration-300 cursor-pointer"
              onClick={() => window.location.href = '/refund-policy'}
            >
              Refund Policy
            </span>
          </div>
          <p className="mt-4">© 2025 MovieSpot. All rights reserved.</p>
          <p>Made with ❤️ from 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
