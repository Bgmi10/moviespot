import { collection, doc, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../utils/firebase"

export default function useSearchSlider(id) {
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(''); 
    
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
        } catch(e) {
            console.log(e);
            setError('error fetching slider data');
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
      if(id) fetchData();
    },[id]);
    
    return{
     data,
     error,
     loader
    }
}