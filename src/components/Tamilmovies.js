import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ShimmerGif from './ShimmerGif';
import { useEffect , useState} from 'react';
import axios from 'axios'




const Moviecard = ({ movie }) => (
  <div className='mr-4'>
    <Link to={`/tamilmoviedetails/${movie.id}`}>
      <img src={movie.poster_path} alt='' className='w-32 h-48 object-cover rounded-md cursor-pointer'></img>
    </Link>
    <p className='text-white mt-2 '>{movie.title}</p>
  </div>
);

const Tamilmovies = () => {
  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Make a request to your server to fetch movies
        const response = await axios.get('http://localhost:3002/api/movies');

        // Update the state with the fetched movies
        setMovieData(response.data);
        setLoading(false);
      } catch (error) {
       
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
          speed:500,
        },
      },
    ],
    swipe: true,
    easing: 'ease',   
   };
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-white mb-4">Tamil Movies HD</h2>
      <Slider {...settings}>
        {loading
          ? Array.from({ length: 10 }).map((_, index) => <ShimmerGif key={index} />)
          : movieData.map((movie) => <Moviecard key={movie.id} movie={movie} />)}
      </Slider>
    </div>
  );
};

export default Tamilmovies;