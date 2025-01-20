import { collection, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";

export default function useFetchCategory(type, catagory) {
  const [data, setData] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async() => {
    try{
       setLoader(true);
       const docRef = collection(db, "media", type, "categories", catagory, "content");
       const docSnap = await getDocs(docRef);

       const contentData = docSnap.docs.map(item => ({
        id: item.id,
        ...item.data()
       }));
       setData(contentData);
       setLoader(false);

    } catch (e) {
        console.log(e);
        setError(e);
        setLoader(false);
    }
  }

  useEffect(() => {
   fetchData();
  },[catagory, type]);

  return {
    data,
    loader,
    error
  }
}