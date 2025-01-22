import { collection, getDocs, limit, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addItemToMoviesSection, addItemToSeriesSection } from "../../redux/cacheSectionSlice";

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
      const q = query(docRef, limit(12));
      const docSnap = await getDocs(q);
      
      const contentData = docSnap.docs.map(item => ({
       id: item.id,
       ...item.data()
      }));

      if (type === "movies") { 
        dispatch(addItemToMoviesSection({
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
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
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