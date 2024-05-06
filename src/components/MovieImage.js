import React from 'react';
import { Link } from 'react-router-dom';
import gif from '../img/movieSpotgif.gif';

const MovieImage = ({ src, alt, linkTo, loading }) => (
  <Link to={linkTo} className="block relative">
    {loading ? (
      
      <img src={gif} alt="Loading GIF" className="w-full h-48 object-cover rounded-t-xl" />
    ) : (
      
      <img src={src} alt={alt} className="w-full h-48 object-cover rounded-t-xl" />
    )}
  </Link>
);

export default MovieImage;
