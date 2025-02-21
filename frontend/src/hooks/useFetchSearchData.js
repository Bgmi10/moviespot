import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { convertToTitleCase } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { addItemToSearchCache } from "../redux/cacheSearchSlice";

export default function useFetchSearchData(type, userQuery, language) {
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const cachedSearchData = useSelector(store => store.cacheSearch);

    const fetchData = async() => {
        try{
            setLoader(true);
            const collecRef = collection(db, "mediaSearch");
            const upperCaseTitle = convertToTitleCase(userQuery);

            if (upperCaseTitle.trim() === "") return;
            let q;

            const baseSearch = [where("title", ">=", upperCaseTitle), where("title", "<", upperCaseTitle + "\uf8ff"), where("type", "==", type)];
            const languageArray = Array.isArray(language) ? language : [language];
            if (language === "all") {
                q = query(collecRef, ...baseSearch)
            } else {
                q = query(collecRef, ...baseSearch, where("language", "array-contains-any", languageArray));
            }

            const docSnap = await getDocs(q);
            const contentData = docSnap.docs.map((item) => ({
                id: item.id,
                ...item.data()
            }));
            dispatch(addItemToSearchCache({
                userQuery: userQuery,
                data: contentData
            }));
            setData(contentData);
        } catch (e) {
            console.log(e);
            setError('error fetching data...')
        } finally {
            setLoader(false);
        }
    }

    useEffect(() => {
      const timer = setTimeout(() => {
        if (cachedSearchData[userQuery]) {
            setData(cachedSearchData[userQuery])
        } else {
          fetchData();
        }
      }, 500);

      return () => clearTimeout(timer);  
    }, [type, userQuery, language]);

    return {
        loader,
        data,
        error
    }
}  