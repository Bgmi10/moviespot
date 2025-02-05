import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { FaMailBulk, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import { Link } from 'react-router-dom';

export default function ScrollAnimatedFooter() {
  const footerRef = useRef(null);
  const borderRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });

  const scaleX = useSpring(
    useTransform(scrollYProgress, [0.5, 1], [0, 1]), 
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001
    }
  );

  return (
    <motion.footer 
      ref={footerRef}
      className="bg-black text-white mt-20 relative bottom-0 w-full"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }} 
      transition={{ duration: 0.5 }}
    >
       <div className="absolute top-0 left-0 right-0 h-[2px] w-full overflow-hidden">
        <motion.div 
          ref={borderRef}
          className="relative h-full w-full"
          style={{ 
            scaleX,
            transformOrigin: "left"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-600" />
        </motion.div>
      </div>
      <div className="relative w-full z-10 sm: px-6 lg:px-20 sm: py-14">
        <div className="grid sm:grid-cols-2 sm: gap-12 lg:flex lg:justify-between">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-2xl font-bold mb-4">
              <span className="text-rose-600">Quick</span> Links
            </div>
            <ul className="text-gray-300 flex flex-col gap-3">
              <Link to={"/"}> 
                <li className="hover:text-rose-600 transition duration-300 cursor-pointer flex gap-2 items-center">
                  <MovieIcon fontSize='small'/>
                  <span>Movies</span>
                </li>
              </Link>
              <Link to="/series">
                <li className="hover:text-rose-600 transition duration-300 cursor-pointer gap-2 items-center flex">
                  <TvIcon fontSize='small'/> 
                  <span>Series</span>
                </li>
              </Link>
              <Link to="/search">
                <li className="hover:text-rose-600 transition duration-300 cursor-pointer flex items-center gap-2">
                  <SearchIcon fontSize='small'/>
                  <span>Search</span>
                </li>
              </Link>
            </ul>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-2xl font-bold mb-4">
              <span className="text-rose-600">Contact</span> Us
            </div>
            <div className="text-gray-300 flex items-center gap-2">
              <FaMailBulk /> moviespot@gmail.com
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="text-2xl font-bold mb-4">
              <span className="text-rose-600">Follow</span> Us
            </div>
            <div className="flex flex-col gap-3 text-gray-300">
              <span className="hover:text-rose-600 transition duration-300 cursor-pointer flex items-center gap-2">
                <FaTwitter /> Twitter
              </span>
              <span className="hover:text-rose-600 transition duration-300 cursor-pointer flex items-center gap-2">
                <FaFacebook /> Facebook
              </span>
              <span className="hover:text-rose-600 transition duration-300 cursor-pointer flex items-center gap-2">
                <FaInstagram /> Instagram
              </span>
            </div>
          </motion.div>
        </div>
        <motion.div 
          className="mt-12 text-center text-gray-300 pt-4 border-t border-gray-800"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="space-x-4">
            <span className="hover:text-rose-600 transition duration-300 cursor-pointer" onClick={() => window.location.href = '/terms-condition'}> 
              Terms of Service
            </span>
            <span className="hover:text-rose-600 transition duration-300 cursor-pointer" onClick={() => window.location.href = "/privacy-policy"}>
              Privacy Policy
            </span>
            <span className="hover:text-rose-600 transition duration-300 cursor-pointer" onClick={() => window.location.href = "/refund-policy"}>
              Refund Policy
            </span>
          </div>
          <p className="mt-4">©2025 MovieSpot. All rights reserved.</p>
          <div className="flex gap-2 items-center justify-center mt-4">
            <span>Made with <span className='animate-pulse'>❤️</span> from</span> 
            <img src="https://emojigraph.org/media/twitter/flag-india_1f1ee-1f1f3.png" alt="Indian flag" className="h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}