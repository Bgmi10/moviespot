import { useState } from "react";
import Adminmsgchat from "./Adminmsgchat";
import UploadFileToDrive from "./UploadFileToDrive";
import ManageMedia from "./ManageMedia";
import AdminCheck from "./AdminCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import WelcomeAdmin from "./WelcomeAdmin";
import { adminMenu } from "./constants";

export default function Admin() {
    const [selecteditem, setSelectedItem] = useState('Home');
    const [isopen, setIsopen] = useState(false);
    const [isauth, setIsAuth] = useState(() => {
        const isAuth = localStorage.getItem('isAdminAuth');
        return isAuth && isAuth
    });
    const [password, setPassword] = useState('');
    
    return(
        <>
          { !isauth ? <AdminCheck password={password} setpassword={setPassword} setIsAuthenticated={setIsAuth} /> : <div className="flex h-screen">
              {isopen && <div className="h-screen flex">
                  <div className="w-72 h-full lg:fixed border-r border-gray-700">
                     <div className="flex justify-between border-b border-gray-700 p-3 text-white items-center">
                         <span className="text-xl">Admin</span>
                         <FontAwesomeIcon icon={faClose} onClick={() =>{ 
                            setIsopen(false);
                            setSelectedItem("Home");
                            }} className="text-xl cursor-pointer text-rose-600" />
                     </div>
                     <div>
                          {
                           adminMenu.map((i) => (
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