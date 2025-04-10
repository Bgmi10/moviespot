import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { db } from "../../utils/firebase";
import { Search, Filter, MapPin, User, Mail, Globe, DollarSign, Phone, Flag } from 'lucide-react';
import { collection, getDocs } from "firebase/firestore";

export default function UserRequest({ setUserRequest }) {
  const [isShowUserRequest, setIsShowUserRequest] = useState(false);
  const [data, setData] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");

  const handleShowUserRequest = async () => {
    setIsShowUserRequest(true);

    try {
      const query = await getDocs(collection(db, "user-requests"));
      const response = query.docs.map((item) => ({
        firebaseId: item.id,
        ...item.data(),
      }));
      
      const filteredData = response.filter((item) => item.isUploaded === false);
      setData(filteredData);
    } catch (e) {
      console.error(e);
    }
  };

    const handleClickUserRequest = (item) => {
      setSelectedItem(item.query)
      setUserRequest(item);
      setIsShowUserRequest(false);
    }

  return (
    <div className="text-white mt-5 m-1">
      {isShowUserRequest && (
        <div className= "border border-gray-700 absolute w-[70%] md:w-1/2 max-h-[70vh] overflow-y-auto rounded-xl shadow-lg p-5 backdrop-blur-2xl space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">User Requests</h2>
            <button
              onClick={() => setIsShowUserRequest(false)}
              className="text-gray-300 hover:text-red-400 transition"
            >
              <FontAwesomeIcon icon={faClose} size="lg" />
            </button>
          </div>

          {data ? (
            data.length > 0 ? (
              data.map((item) => (
                <div 
                className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-5 hover:shadow-lg transition duration-300 cursor-pointer"
                onClick={() => handleClickUserRequest(item)}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg truncate w-4/5">{item.query}</h3>
                  <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                    {item.type}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center mb-1">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="truncate">{item.userEmail}</span>
                  </div>
                  
                  <div className="flex items-center mb-1">
                    <Globe className="w-4 h-4 mr-2" />
                    <span>{item.language}</span>
                  </div>
                  
                  <div className="flex items-center mb-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>
                      {item.userCity}, {item.userState}, {item.userCountry}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      <span>{item.userCurrency}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-1" />
                      <span>{item.userPhoneCode}</span>
                    </div>
                    <div className="flex items-center">
                      <Flag className="w-3 h-3 mr-1" />
                      <span>{item.userContinent}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-1" />
                      <span className="truncate">{item.userIp}</span>
                    </div>
                  </div>
                </div>
              </div>
              ))
            ) : (
              <p className="text-gray-400">No pending user requests.</p>
            )
          ) : (
            <p className="text-gray-400">Loading...</p>
          )}
        </div>
      )}

      <button
        className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg shadow-md"
        onClick={handleShowUserRequest}
      >
        Show User Requests
      </button>
      {
        selectedItem && <span className="text-white ml-2">selected item: {selectedItem}</span>
      }
    </div>
  );
}
