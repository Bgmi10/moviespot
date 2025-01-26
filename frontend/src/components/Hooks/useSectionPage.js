import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { addItemToSectionPage } from "../../redux/cacheSectionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useSectionPage(type, category, title) {
    console.log(title);
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const cachedSectionPages = useSelector(store => store.cacheSection.sectionPage);
    
    const fetchData = async() => {
        setLoader(true);

        try{
            const docRef = collection(db, "media", type, "categories", category, "content");
            const docsRef = await getDocs(docRef);
            
            const finalData = docsRef.docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch(addItemToSectionPage({
                sectionTitle: title,
                data: finalData
            }));
            setData(finalData);
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {

        if (cachedSectionPages[title]) {
           setData(cachedSectionPages[title])
        } else {
          fetchData();
        }
        
    }, [type, category, title]);

    return {
        data,
        error,
        loader
    }
} 