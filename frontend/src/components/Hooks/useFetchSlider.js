import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../utils/firebase"

export default function useFetchSlider(type) {
    console.log(type)
    const [loader, setLoader] = useState(false);
    const [sliderdata, setSliderData] = useState(null);
    const [error, setError] = useState('');

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
            setSliderData(data);
        } catch(e) {
            console.log(e);
            setError('error fetching slider data')
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
      if(type) fetchData();
    },[type]);
    
    return{
     sliderdata,
     error,
     loader
    }
}