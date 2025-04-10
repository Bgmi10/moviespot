import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "../utils/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function UserRequestNotification() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchUserRequest();
  }, []);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }

    setShowToast(true);

    const interval = setInterval(() => {
      setCount((prev) => (prev + 1) % data.length);
      
      setShowToast(false);
      setTimeout(() => setShowToast(true), 300);
    }, 7000);

    return () => clearInterval(interval);
  }, [data]);

  async function fetchUserRequest() {
    try {
      const q = query(
        collection(db, "user-requests"),
        where("isUploaded", "==", true)
      );

      const querySnapshot = await getDocs(q);

      const response = querySnapshot.docs.map((item) => ({
        firebaseId: item.id,
        ...item.data(),
      }));

      setData(response);
    } catch (e) {
      console.log(e);
    }
  }

  if (data.length === 0 || !showToast) {
    return null;
  }

  const currentItem = data[count];

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed lg:bottom-4 bottom-14 lg:right-4 right-1 bg-black bg-opacity-90 border-l-4 border-rose-500 rounded-md shadow-lg z-50 max-w-xs"
        >
            <div className="text-white m-2 flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-white"/>
              <span className="text-white ml-2"> User Request</span>
            </div>
            
          <div className="px-4 py-1 flex items-start">
            <div className="flex-shrink-0 mr-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <p className="text-xs font-bold text-green-400 uppercase mb-0.5">
                  Successfully Added!
                </p>
              </div>
              <p className="text-sm font-medium text-white truncate">
                {currentItem?.query || "Requested content"}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">
                {currentItem?.type || "Content"} • {currentItem?.userCity || "Location"} {currentItem?.userNativeFlag || ""}
              </p>
            </div>
            
            <div className="ml-2 flex-shrink-0">
              <button className="text-xs text-white bg-rose-600 px-2 py-1 rounded" onClick={() => window.location.href = `/search?query=${currentItem?.originalTitle ?? currentItem?.query ?? ""}&type=${currentItem?.type ?? ""}`}>
                Watch
              </button>
            </div>
          </div>
          
          <motion.div 
            className="h-0.5 bg-rose-500"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 7, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}