import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { addItemToSearchDetailPageCache } from "../../redux/cacheSearchSlice";
import { useDispatch, useSelector } from "react-redux";

export default function useSearchDetailPage(id) {
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const cachedSearchDetailDatas = useSelector(store => store.cacheSearch.searchDetailPageCache);
    const dispatch = useDispatch();

    const fetchData = async() => {
        try {
            setLoader(true);
            const collecRef = collection(db, "mediaSearch");
            const q = query(collecRef, where("id", "==", parseInt(id)));
            const contentData = await getDocs(q);
            const finalData  = contentData.docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            
            dispatch(addItemToSearchDetailPageCache(finalData));
            setData(finalData);
        } catch (e) {
            console.log(e);
            setError("error fetching data");
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
       if (id) {
         const filterCachedData = cachedSearchDetailDatas.find(item => item.id === parseInt(id));
         filterCachedData ? setData([filterCachedData]) : fetchData();
       }
    }, [id]);

    return {
        data,
        error,
        loader
    }
}