import axios from "axios";
import { gapi } from "gapi-script";
import { useEffect, useState } from "react";
import { poster_url } from "../../utils/constans";
import gif from "../../img/movieSpotgif.gif"
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGoogleDrive } from "react-icons/fa";

export default function UploadFileToDrive() {

    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(null);
    const [selectedmovie, setSelectedMovie] = useState(null);
    const [files, setFiles] = useState([]);
    const [isauthenticated, setIsAuthenticated] = useState(false);
    const [selectedtype, setSelectedType] = useState(true);
  
    const fetchMovies = async() => {
       try{
        const res = await axios.get(`https://api.themoviedb.org/3/search/${selectedtype ? "movie" : "tv"}`, { 
            params: {
                api_key: process.env.REACT_APP_API_KEY,
                query: query,
                language: "ta"
            }
        });
        setMovies(res.data);
       }
       catch(e){
        console.log(e);
       }
    }

    useEffect(() => {
        const initClient = () => {
          gapi.client.init({
            clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/drive.file', 
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
          }).then(() => {
            const authInstance = gapi.auth2.getAuthInstance();
            setIsAuthenticated(authInstance.isSignedIn.get());
          });
        };
    
        gapi.load('client:auth2', initClient);
    }, []);

    const signIn = () => {
        gapi.auth2.getAuthInstance().signIn().then(() => {
            setIsAuthenticated(true);
        })
    }

    const signOut = () => {
        gapi.auth2.getAuthInstance().signOut().then(() => {
            setIsAuthenticated(false);
        })
    }


    useEffect(() => {
      const timer = setTimeout(() => {
          fetchMovies();
        }, 500);

        return () => clearTimeout(timer);
    },[query]);

    const handleClick = (i) => {
        setSelectedMovie(i);
    }

    const handleDrop = (e) => {
      e.preventDefault();
      const uploadedFiles = Array.from(e.dataTransfer.files);
      setFiles([...files, ...uploadedFiles]);
    };

    const handleFileChange = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        const renamedFiles = uploadedFiles.map((file, index) => {
          const newName = selectedmovie && `MovieSpot_${selectedmovie.title.replace(/\s+/g, "_")}${index + 1}${file.name.substring(file.name.lastIndexOf("."))}`
          return new File([file], newName, { type: file.type });
        });
      
        setFiles([...files, ...renamedFiles]);
      };

    const handleDragOver = (e) => e.preventDefault();

   const handleUploadToDrive = async () => {
      try {
          if(!gapi.auth2.getAuthInstance()){
             await gapi.auth2.init({
               client_id:  process.env.REACT_APP_GOOGLE_CLIENT_ID
             })
          }
          const authInstance = gapi.auth2.getAuthInstance();
  
          if(!authInstance.isSignedIn.get()){
            await authInstance.signIn();
          }
          const accessToken = authInstance.currentUser.get().getAuthResponse().access_token;
  
          if(!accessToken){
            return;
          }

          let filesToUpload = [];
          
          if (selectedtype){
              filesToUpload = [files[0]];
          } else {
              filesToUpload = files;
          }
  
          
  
          if (selectedtype) {
              const file = files[0];
              const fileName = `MovieSpot_${selectedmovie.title.replace(/\s+/g, "_") || selectedmovie.name.replace(/\s+/g, "_") }${file.name.substring(file.name.lastIndexOf("."))}`;
              
              const metadata = {
                  name: fileName,
                  mimeType: file.type,
                  parents: ["root"],
              };
              
              const formData = new FormData();
              formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
              formData.append("file", file);
  
              const response = await fetch(
                  "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart", 
                  {
                      method: "POST",
                      headers: {
                          Authorization: `Bearer ${accessToken}`,
                      },
                      body: formData,
                  }
              );
              
              const result = await response.json();
              console.log("File uploaded successfully:", result);
          } else {
              const uploadPromises = filesToUpload.map((file, index) => {
                  const fileName = `MovieSpot_${selectedmovie.title.replace(/\s+/g, "_")}_Episode${index + 1}${file.name.substring(file.name.lastIndexOf("."))}`;
                  
                  const metadata = {
                      name: fileName,
                      mimeType: file.type,
                      parents: ["root"],
                  };
  
                  const formData = new FormData();
                  formData.append("metadata", new Blob([JSON.stringify(metadata)], { type: "application/json" }));
                  formData.append("file", file);
  
                  return fetch(
                      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
                      {
                          method: "POST",
                          headers: {
                              Authorization: `Bearer ${accessToken}`,
                          },
                          body: formData,
                      }
                  ).then(response => response.json());
              });
  
              const uploadResults = await Promise.all(uploadPromises);
  
              uploadResults.forEach((result, index) => {
                  console.log(`File ${index + 1} uploaded successfully:`, result);
              });
          }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
   };

      

    return (
        <>
          <div className="m-10 mb-20">
               <div className="flex flex-col gap-2">
                 <button onClick={() => setSelectedType(p => !p)} className="text-white bg-blue-500 p-3 rounded-md">{`switch to ${!selectedtype ? "Movies" : "Series"}`}</button>
                 <input type="text" className="p-3 rounded-md outline-none border-none w-full" placeholder={` search for ${selectedtype ? "Movies" : "Series" }`} onChange={(e) => setQuery(e.target.value)} />
              </div>

              { !selectedmovie && <div className="mt-10 flex flex-col gap-2">
                  {
                    movies?.results.map((i) => (
                        <div key={i.id} className="flex gap-3 items-center cursor-pointer hover:scale-105 transition-transform" onClick={() => handleClick(i)}>
                            <img src={i.poster_path ? poster_url + i.poster_path : gif} alt="no image" className="w-20 rounded-md" />
                            <div className="flex flex-col gap-1">
                              <span className="text-white">{i.title || i.name}</span>
                              <span className="text-amber-500">lang: {i.original_language}</span>
                              <span className="text-orange-500">rate: {i.vote_average}</span>
                              <span className="text-gray-400">{i.release_date || i.first_air_date}</span>
                            </div>
                        </div>
                    ))
                  }
              </div>}
              {selectedmovie &&
              <div className="w-full mt-5 h-auto border border-gray-600 rounded-md">
                  <div className="m-5">
                    <div className="flex justify-center">
                     <span className="text-white">Selected Movie</span>
                    </div>
                    <div className="flex flex-col mt-4">
                       <img className="w-40 rounded-md" src={poster_url + selectedmovie.poster_path}/>
                       <span className="text-white">{selectedmovie.title || selectedmovie.name}</span>
                       <span className="text-amber-500">lang: {selectedmovie.original_language}</span>
                       <span className="text-orange-500">rate: {selectedmovie.vote_average}</span>
                       <span className="text-gray-400">release-date: <span className="text-white text-sm">{selectedmovie.release_date || selectedmovie.first_air_date}</span></span>
                       <span className="text-gray-600">{selectedmovie.overview}</span>
                       <div className="flex w-full mt-5 flex-col">
                           <div
                             className="flex flex-col items-center justify-center w-full h-56 border-2 border-dashed border-gray-600 rounded-lg hover:border-blue-500 transition duration-300"
                             onDrop={handleDrop}
                             onDragOver={handleDragOver}
                           >
                             <FontAwesomeIcon
                               icon={faCloudUploadAlt}
                               className="text-blue-500 text-4xl mb-3"
                             />
                             <h2 className="text-gray-300 font-semibold text-lg">
                               Drag & Drop your files here
                             </h2>
                             <p className="text-gray-500 text-sm mb-4">or click to upload</p>
                             <label className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                               Browse Files
                               <input
                                 type="file"
                                 multiple
                                 className="hidden"
                                 onChange={handleFileChange}
                               />
                             </label>
                           </div>
                     
                           {files.length > 0 && (
                             <div className="mt-5 w-96">
                               <h3 className="text-gray-300 font-medium mb-2">Uploaded Files:</h3>
                               <ul className="bg-gray-800 rounded-lg p-3 max-h-48 overflow-y-auto">
                                 {files.map((file, index) => (
                                   <li
                                     key={index}
                                     className="text-gray-400 text-sm border-b border-gray-700 py-1"
                                   >
                                     {file.name}
                                   </li>
                                 ))}
                               </ul>
                               <button className="flex items-center gap-2 text-white p-3 rounded-md bg-blue-500 mt-2 hover:bg-blue-600 transition duration-300 shadow-lg" onClick={handleUploadToDrive}>
                                  <FaGoogleDrive className="text-gray-800 text-xl" />
                                  <span>Upload to Drive</span>
                              </button>
                             </div>
                           )}
                         </div>
                       </div>
                     </div>
              </div>}
          </div>
        </>
    )
}