import React from 'react';
import Mainslider from '../Mainslider';
import Section from '../section/Section';
import useFetchSlider from '../hooks/useFetchSlider';

const SeriesHome = () => {
  const { seriessliderdata, loader } = useFetchSlider('series'); 
  return (
    <div className='text-white'>
     <Mainslider data={seriessliderdata} loader={loader} />
     <Section title={"BollyWood"} type={"series"} category={"Hindi" } />
     <Section title={"Malayalam"} type={"series"} category={"Malayalam" } />
    </div>
    
  )
}

export default SeriesHome