import { useDispatch } from 'react-redux';
import { togglecategory  , type1} from '../../utils/Movieslice';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';


const Searchcatagory = () => {
  const dispatch = useDispatch();
  const [localtype, setLocaltype] = useState('movie');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (value) => {

    const toggle_value = value === 'movie' ? false : true;
    dispatch(togglecategory(toggle_value));
    setIsOpen(false); 
    setLocaltype(value)
    dispatch(type1(value))// Close the dropdown after selection
  };

  return (
    <>
      <div>
       
        <div className='flex justify-center  m-6'>  
        <span className='justify-center flex text-gray-400 mt-1 text-lg font-semibold'>
          Select Category
        </span>
        <div className='relative inline-block ml-4'>
          <button
            className='w-full bg-slate-800 text-gray-200 p-2 rounded-md shadow-md focus:outline-none transition duration-200 hover:bg-slate-700 flex items-center justify-between'
            onClick={() => setIsOpen(!isOpen)}
          >
            {localtype.charAt(0).toUpperCase() + localtype.slice(1)}
            <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} className='mt-1 ml-1'  />
          </button>
          {isOpen && (
            <div className='absolute left-0 right-0 mt-1 bg-slate-800 rounded-md shadow-lg z-10'>
              <div 
                className='cursor-pointer p-2 text-gray-200 hover:bg-slate-700 transition duration-200'
                onClick={() => handleChange('movie')}
              >
                Movie
              </div>
              <div 
                className='cursor-pointer p-2 text-gray-200 hover:bg-slate-700 transition duration-200'
                onClick={() => handleChange('tv')}
              >
                TV
              </div>
            </div>
          )}
        </div>
        </div>
       
      </div>
    </>
  );
};

export default Searchcatagory;
