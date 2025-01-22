import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { addItemToSectionDetailPage } from "../../redux/cacheSectionSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useFetchSectionDetailPage(id, type, category) {
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const cachedSectionsDetailPage = useSelector(store => store.cacheSection.sectionDetailPage);

    const fetchData = async() => {
        setLoader(true);
        try{
            const ref = collection(db, "media", type, "categories", category, "content");
            const q = query(ref, where("id", "==", parseInt(id)));
            const docRef = await getDocs(q);
            const finalData = docRef.docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch(addItemToSectionDetailPage(finalData));
            setData(finalData);
        } catch (e) {
            console.log(e);
            setError(e);
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
       if (id) {
           if (cachedSectionsDetailPage) {
              const sectionDetailPage = cachedSectionsDetailPage.find(item => item.id === parseInt(id));
              
              if (sectionDetailPage) {
                setData([sectionDetailPage]);
              } else {
                fetchData();
              }
            } else {
                fetchData();
            } 
        }
    },[id, type, category]);
 
    return {
     data,
     loader,
     error
    }
}