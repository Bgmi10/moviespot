import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ShimmerGif from './ShimmerGif';
import axios from 'axios';

const MovieCard = ({ movie }) => (
  <div className='mr-4'>
    <Link to={`/tamilmoviedetails/${movie.id}`}>
      <img
        src={movie.poster_path}
        alt=''
        className='w-32 h-48 object-cover rounded-md cursor-pointer'
      ></img>
    </Link>
    <p className='text-white mt-2'>{movie.title}</p>
  </div>
);

const Vijayhits = () => {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Make a request to your server to fetch Vijay hits
        const response = await axios.get('http://localhost:3002/api/vijayhits');

        // Update the state with the fetched Vijay hits
        setMovieData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Vijay hits:', error);
        setLoading(false);
      }
    };

    // Call the fetchMovies function
    fetchMovies();
  }, []);

  const settings = {
    infinite: false,
    slidesToShow: 8,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        
        },
      },
    ],
    swipe: true,
    easing: 'ease',   
   };
  
  
  

  return (
    <div className='mb-6'>
      <h2 className='text-2xl font-bold text-white mb-4'>Vijay Hits</h2>
      <Slider {...settings}>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => <ShimmerGif key={index} />)
        ) : (
          movieData.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </Slider>
    </div>
  );
};

export default Vijayhits;
