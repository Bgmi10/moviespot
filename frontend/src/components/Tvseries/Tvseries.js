import React from 'react';
import { Mainslider } from '../Mainslider';
import { Popular } from '../Popular';
import useFetchSlider from '../Hooks/useFetchSlider';

const Tvseries = () => {
  const { seriessliderdata, loader } = useFetchSlider('series'); 
  return (
    <div className='text-white'>
     <Mainslider data={seriessliderdata} loader={loader} />
     {/* <div>
      <Popular apiurl={'https://api.themoviedb.org/3/tv/top_rated?&api_key='} sort={'&with_original_language=ta'} title={'Top rated'}/>
      <Popular apiurl={'https://api.themoviedb.org/3/tv/popular?&api_key='} sort={'popularity.desc&with_original_language=ta&release_date.gte=${today}&with_genres=35'} title={'Popular'}/>
      <Popular apiurl={'https://api.themoviedb.org/3/tv/on_the_air?&api_key='} sort={'popularity.desc&with_original_language=ta&release_date.gte=${today}&with_genres=35'} title={'Top Hits'}/>
     </div> */}
    </div>
    
  )
}

export  default Tvseries