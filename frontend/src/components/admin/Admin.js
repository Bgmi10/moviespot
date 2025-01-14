import { useState } from "react";
import Adminmsgchat from "../Developerprofile/Admin/Adminmsgchat";
import UploadFileToDrive from "./UploadFileToDrive";
import ManageMedia from "./ManageMedia";
import AdminCheck from "./AdminCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import WelcomeAdmin from "./WelcomeAdmin";

export default function Admin() {
    const [selecteditem, setSelectedItem] = useState('Home');
    const [isopen, setIsopen] = useState(false);
    const [isauth, setIsAuth] = useState(false);
    const [password, setPassword] = useState('');

    const data = [
        {
            id: 4,
            name: 'Home'
        },
        {
            id: 1,
            name: "Admin Chat"
        },
        {
            id: 2,
            name: "Upload Video To Drive"
        },
        {
            id: 3,
            name: "Manage Media"
        }
    ]
    
    return(
        <>
          { isauth ? <AdminCheck setIsAuthenticated={setIsAuth} setpassword={setPassword} password={password} /> : <div className="flex h-screen">
              {isopen && <div className="h-screen flex">
                  <div className="w-72 h-full bg-slate-950 lg:fixed border border-gray-700">
                     <div className="flex justify-between border-b border-gray-700 p-3 bg-slate-900 text-white items-center">
                         <span className="text-xl">Admin</span>
                         <FontAwesomeIcon icon={faClose} onClick={() =>{ 
                            setIsopen(false);
                            setSelectedItem("Home");
                            }} className="text-xl cursor-pointer text-rose-600" />
                     </div>
                     <div>
                          {
                           data.map((i) => (
                               <div key={i.id}  onClick={() => {
                                setSelectedItem(i.name);
                                setIsopen(false);
                                }}className={`p-3 text-white ${selecteditem === i.name ? "bg-gray-700" : ""} cursor-pointer`}>
                                  <span>{i.name}</span>
                               </div>
                           ))
                          }
                      </div>
                   </div>
               </div>}
               {!isopen && <div className="lg:flex-1 lg:ml-72">
                 { selecteditem === "Admin Chat" && <Adminmsgchat setIsopen={setIsopen} /> }
                 { selecteditem === "Home" && <WelcomeAdmin setIsopen={setIsopen} /> }
                 { selecteditem === "Upload Video To Drive" && <UploadFileToDrive setIsopen={setIsopen} /> }
                 { selecteditem === "Manage Media" && <ManageMedia setIsOpen={setIsopen}/> }
                </div>}
          </div>}
        </>
    )
}