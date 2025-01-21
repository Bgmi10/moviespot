import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addItemToSliderDetail } from "../../store/cacheSliderSlice";

export default function useSliderDetailPage(id) {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const cacheSliderDetailData = useSelector((store) => store.cacheSlider.sliderDetail);

    const fetchData = async() => {
        try{
            setLoader(true);
            const ref = doc(db, 'slider', 'New Releases');
            const contentRef = collection(ref, 'content');
            const q = query(contentRef, where('id', '==', parseInt(id)));
            const docs = await getDocs(q);
            const data = docs.docs.map((i) => ({
                id: i.id,
                ...i.data()
            }));
            setData(data);
            dispatch(addItemToSliderDetail(data));
        } catch(e) {
            console.log(e);
            setError('error fetching slider data');
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
        if (id) {
           if (cacheSliderDetailData) {
              const filteredCacheData = cacheSliderDetailData.find(item => item.id === parseInt(id));   
              filteredCacheData ? setData([filteredCacheData]) : fetchData();
            }
        };
    },[id]);
    
    return{
     data,
     error,
     loader
    }
}