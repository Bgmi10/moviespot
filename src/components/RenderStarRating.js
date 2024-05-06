
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const renderStarRating = (rating) => {
    const stars = [];
    const normalizedRating = rating / 2;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= normalizedRating ? faStar : ['far', 'star']}
          className="text-yellow-500"
        />
      );
    }
    return stars;
  };

  export default renderStarRating