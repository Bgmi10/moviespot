import { useState } from "react";
import Adminmsgchat from "../Developerprofile/Admin/Adminmsgchat";
import UploadFileToDrive from "./UploadFileToDrive";

export default function Admin() {
    const [selecteditem, setSelectedItem] = useState('');
    const [isopen, setIsopen] = useState(false);

    const data = [
        {
            id: 1,
            name: "Admin Chat"
        },
        {
            id: 2,
            name: "Upload Video To Drive"
        },
    ]
    
    return(
        <>
          <div className="flex justify-start h-screen">
              { !isopen && <div>
                  <div className="w-72 border border-white h-full bg-white">
                     <div className="flex justify-center border-b p-3">
                         <span>Admin</span>
                     </div>
                     <div>
                          {
                           data.map((i) => (
                               <div key={i.id}  onClick={() => {
                                setSelectedItem(i.name)
                                setIsopen(true)
                                }}className={`p-3 border ${selecteditem === i.name ? "bg-gray-200" : ""} cursor-pointer`}>
                                  <span>{i.name}</span>
                               </div>
                           ))
                          }
                      </div>
                   </div>
               </div>}
                 { selecteditem === "Admin Chat" && <Adminmsgchat /> }
                 { selecteditem === "Upload Video To Drive" && <UploadFileToDrive /> }
          </div>
        </>
    )
}