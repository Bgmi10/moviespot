import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addItemToSeriesSlider, addItemToMovieSlider } from "../../redux/cacheSliderSlice";

export default function useFetchSlider(type) {
    const [loader, setLoader] = useState(false);
    const [moviessliderdata, setMoviesSliderData] = useState(null);
    const [seriessliderdata, setSeriesSliderData] = useState(null);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const cacheSliderData = useSelector((store) => store.cacheSlider);
    
    const fetchData = async() => {
        try{
            setLoader(true);
            const ref = doc(db, 'slider', 'New Releases');
            const contentRef = collection(ref, 'content');
            const q = query(contentRef, where('type', '==', type));
            const docs = await getDocs(q);
            const data = docs.docs.map((i) => ({
                id: i.id,
                ...i.data()
            }));
            data && type === "movies" ? setMoviesSliderData(data) : setSeriesSliderData(data);
            data && type === "movies" ? dispatch(addItemToMovieSlider(data)) : dispatch(addItemToSeriesSlider(data));
        } catch(e) {
            console.log(e); 
            setError('error fetching slider data');
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
      if(type) {
        if(cacheSliderData.moviesSlider === null || cacheSliderData.seriesSlider === null){
            fetchData();
            return;
        }
        type === "movies" ? setMoviesSliderData(cacheSliderData?.moviesSlider) : setSeriesSliderData(cacheSliderData?.seriesSlider);
      }
    },[type]);
    
    return{
     moviessliderdata,
     seriessliderdata,
     error,
     loader
    }
}
