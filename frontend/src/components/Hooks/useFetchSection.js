import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addItemToMoviesSections, addItemToSeriesSection } from "../../store/cacheSectionSlice";

export default function useFetchSection(type, category) {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const cachedMoviesSections = useSelector(store => store.cacheSection.moviesSections);
  const cachedSeriesSections = useSelector(store => store.cacheSection.seriesSections);
    
  const fetchData = async() => {
    try{
      setLoader(true);
      const docRef = collection(db, "media", type, "categories", category, "content");
      const docSnap = await getDocs(docRef);
      const contentData = docSnap.docs.map(item => ({
       id: item.id,
       ...item.data()
      }));

      if (type === "movies") { 
        dispatch(addItemToMoviesSections({
          sectionName: category,
          sectionData: contentData
        }));
      }

      if (type === "series") {
        dispatch(addItemToSeriesSection({
          sectionName: category,
          sectionData: contentData
        }));
      }

      setData(contentData);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setError(e);
      setLoader(false);
    }
  }

  useEffect(() => {

    if (type === "movies") {
      cachedMoviesSections[category] ? setData(cachedMoviesSections[category]) : fetchData();   
    }
     
    if (type === "series") {
      cachedSeriesSections[category] ? setData(cachedSeriesSections[category]) : fetchData();
    }

  },[category, type]);

  return {
    data,
    loader,
    error
  }
}