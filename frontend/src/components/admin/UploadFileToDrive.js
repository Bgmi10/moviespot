import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { poster_url } from "../../utils/constans";
import gif from "../../img/movieSpotgif.gif";
import { faArrowLeft, faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaGoogleDrive } from "react-icons/fa";
import UploadToFirebase from "./UploadToFirebase";
import Loader from "./Loader";
import BackToAdmin from "./BackToAdmin";
import { languages } from "./constants";

export default function UploadFileToDrive({ setIsopen }) {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState(null);
    const [selectedmovie, setSelectedMovie] = useState(null);
    const [files, setFiles] = useState([]);
    const [isauthenticated, setIsAuthenticated] = useState(false);
    const [selectedtype, setSelectedType] = useState(true);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
        const loadGoogleAPI = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://apis.google.com/js/api.js';
                script.onload = resolve;
                document.body.appendChild(script);
            });
        };

        const initializeGoogleAPI = async () => {
            try {
                await loadGoogleAPI();
                await new Promise((resolve) => window.gapi.load('client:auth2', resolve));
                
                await window.gapi.client.init({
                    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID, 
                    scope: 'https://www.googleapis.com/auth/drive.file',
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
                    ux_mode: 'popup',
                    plugin_name: 'MovieSpot'
                });

                window.gapi.auth2.getAuthInstance().then(auth2 => {
                    auth2.isSignedIn.listen((isSignedIn) => {
                        setIsAuthenticated(isSignedIn);
                        if (!isSignedIn) {
                            setAuthError(null);
                        }
                    });

                    setIsAuthenticated(auth2.isSignedIn.get());
                });

            } catch (error) {
                console.error('Error initializing Google API:', error);
                setAuthError('Failed to initialize Google API');
            }
        };

        initializeGoogleAPI();
    }, []);

    const handleAuthClick = useCallback(async () => {
        try {
            setAuthError(null);
            const auth2 = window.gapi.auth2.getAuthInstance();
            
            if (!auth2) {
                throw new Error('Auth2 instance not initialized');
            }

            const options = {
                prompt: 'select_account',
                ux_mode: 'popup',
                plugin_name: 'MovieSpot'
            };

            if (auth2.isSignedIn.get()) {
                await auth2.signOut();
            }

            await auth2.signIn(options);
            
            const user = auth2.currentUser.get();
            const authResponse = user.getAuthResponse();
            
            if (!authResponse || !authResponse.access_token) {
                throw new Error('Failed to get access token');
            }

            setIsAuthenticated(true);
            return authResponse.access_token;

        } catch (error) {
            console.error('Authentication error:', error);
            
            if (error.error === 'popup_closed_by_user') {
                setAuthError('Authentication cancelled. Please try again.');
            } else if (error.error === 'access_denied') {
                setAuthError('Access denied. Please grant the required permissions.');
            } else {
                setAuthError('Authentication failed. Please try again.');
            }
            
            throw error;
        }
    }, []);

    const fetchMovies = async() => {
        if (!query) return;
        
        try {
            setIsLoading(true);
            const res = await axios.get(`https://api.themoviedb.org/3/search/${selectedtype ? "movie" : "tv"}`, { 
                params: {
                    api_key: process.env.REACT_APP_API_KEY,
                    query: query
                }
            });
            setMovies(res.data);
        } catch(e) {
            console.error('Error fetching movies:', e);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMovies();
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const handleClick = (movie) => {
        setSelectedMovie(movie);
        setFiles([]);
        setUploadProgress(0);
        setAuthError(null);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const uploadedFiles = Array.from(e.dataTransfer.files);
        handleFiles(uploadedFiles);
    };

    const handleFileChange = (e) => {
        const uploadedFiles = Array.from(e.target.files);
        handleFiles(uploadedFiles);
    };

    const handleFiles = (uploadedFiles) => {
        if (!selectedmovie) return;

        const renamedFiles = uploadedFiles.map((file, index) => {
            const baseName = selectedmovie.title?.replace(/\s+/g, "_") || selectedmovie.name?.replace(/\s+/g, "_");
            const extension = file.name.substring(file.name.lastIndexOf("."));
            const newName = `MovieSpot_${baseName}${selectedtype ? '' : `_Episode${index + 1}`}${extension}`;
            return new File([file], newName, { type: file.type });
        });
        
        setFiles([...files, ...renamedFiles]);
    };

    const handleDragOver = (e) => e.preventDefault();

    const uploadFileToDrive = async(file, fileName, accessToken) => {
      const metadata = {
          name: fileName,
          mimeType: file.type,
          parents: ['1t1bxmTbH9jGWMY_4qpo90HbKsPEKTeRT']
      };

      const formData = new FormData();
      formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
      formData.append('file', file);
    
      try {
          const response = await axios.post(
              'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
              formData,
              {
                  headers: {
                      Authorization: `Bearer ${accessToken}`,
                      'Content-Type': 'multipart/form-data',
                  },
                  onUploadProgress: (progressEvent) => {
                      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                      setUploadProgress(progress);
                  },
              }
          );

          return {
              url: `https://drive.google.com/file/d/${response.data.id}/preview`,
              moviespotFileName: response.data.name,
              fileType: response.data.mimeType,
              season: !selectedtype &&  
          };
      } catch (error) {
          throw error;
      }
    };
  
    const handleUploadToDrive = async() => {
        if (!files.length) {
            alert('Please select files to upload first.');
            return;
        }
  
        try {
            setIsLoading(true);
            let accessToken;
  
            if (!isauthenticated) {
                try {
                    accessToken = await handleAuthClick();
                } catch (error) {
                    setIsLoading(false);
                    return;
                }
            } else {
                const currentUser = window.gapi.auth2.getAuthInstance().currentUser.get();
                accessToken = currentUser.getAuthResponse().access_token;
            }
  
            if (!accessToken) {
                throw new Error('No access token available');
            }
  
            setUploadProgress(0);
  
            if (selectedtype) {
                const file = files[0];
                const fileName = `MovieSpot_${selectedmovie.title?.replace(/\s+/g, "_") || selectedmovie.name?.replace(/\s+/g, "_")}${file.name.substring(file.name.lastIndexOf("."))}`;
                const uploadResult = await uploadFileToDrive(file, fileName, accessToken);
                
                setSelectedMovie(prev => ({ 
                    ...prev, 
                    drivePreviewUrl: [uploadResult],
                    type: "movies"
                }));
            } else {
                const uploadResults = [];
                
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileName = `MovieSpot_${selectedmovie.title?.replace(/\s+/g, "_") || selectedmovie.name?.replace(/\s+/g, "_")}_Episode${i + 1}${file.name.substring(file.name.lastIndexOf("."))}`;
                    const uploadResult = await uploadFileToDrive(file, fileName, accessToken);
                    uploadResults.push(uploadResult);
                
                    if (i < files.length - 1) {
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    }
                }
                
                setSelectedMovie(prev => ({ 
                    ...prev, 
                    drivePreviewUrl: uploadResults,
                    type: "series"
                }));
            }
            
            alert('Upload completed successfully!');
            setFiles([]);
            setUploadProgress(0);
        } catch (error) {
            console.error('Error uploading to Drive:', error);
            alert('Error uploading files. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
  
    const handleSelectedLanguages = (i) => {
      setSelectedMovie((prev) => {
        const existingLangs = prev?.languages || [];
        if (existingLangs.includes(i)) {
          return { ...prev, languages: existingLangs.filter((lang) => lang !== i) };
        }
        return { ...prev, languages: [...existingLangs, i] };
      });
    };
    

    return (
      <>  
       <div className="m-10 mb-20">
            {authError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                    <span className="block sm:inline">{authError}</span>
                </div>
            )}
           <BackToAdmin setIsOpen={setIsopen} />
           {!selectedmovie && <div className="flex flex-col gap-2">
                <button 
                    onClick={() => setSelectedType(p => !p)} 
                    className="text-white bg-blue-500 p-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    {`Switch to ${!selectedtype ? "Movies" : "Series"}`}
                </button>
                <input 
                    type="text" 
                    className="p-3 rounded-md outline-none border-none w-full"
                    placeholder={`Search for ${selectedtype ? "Movies" : "Series"}`}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>}

            {
              selectedmovie && <div className="flex justify-start" onClick={() => setSelectedMovie(null)}>
                <FontAwesomeIcon icon={faArrowLeft} className="text-white lg:hidden"/>
              </div>
            }

            {isLoading && (
                <Loader loading={isLoading} />
            )}
           
            {!selectedmovie && !isLoading && (
                <div className="mt-10 flex flex-col">
                    {movies?.results?.map((movie) => (
                        <div 
                            key={movie.id} 
                            className="flex gap-3 items-center cursor-pointer lg:hover:scale-105 transition-transform p-3 rounded-md"
                            onClick={() => handleClick(movie)}
                        >
                            <img 
                             src={movie.poster_path ? poster_url + movie.poster_path : gif} 
                             alt={movie.title || movie.name}
                             className="w-20 rounded-md"
                            />
                            <div className="flex flex-col gap-1">
                              <span className="text-white">{movie.title || movie.name}</span>
                              <span className="text-amber-500">Language: {movie.original_language}</span>
                              <span className="text-orange-500">Rating: {movie.vote_average}</span>
                              <span className="text-gray-400">{movie.release_date || movie.first_air_date}</span>
                            </div>
                        </div>
                    ))}
                </div>
             )}

            {selectedmovie && (
                <div className="w-full mt-5 h-auto border border-gray-600 rounded-md">
                    <div className="m-5">
                        <div className="flex lg:justify-between sm: justify-center items-center">
                            <span className="text-white text-xl">Selected {selectedtype ? "Movie" : "Series"}</span>
                            <button 
                                onClick={() => setSelectedMovie(null)}
                                className="text-gray-400 hover:text-white lg:block hidden"
                            >
                                Back to Search
                            </button>
                        </div>
                        
                        <div className="flex flex-col mt-4 mb-4">
                            <div className="lg:flex gap-4">
                                <img 
                                    className="w-40 rounded-md" 
                                    src={selectedmovie.poster_path ? poster_url + selectedmovie.poster_path : gif}
                                    alt={selectedmovie.title || selectedmovie.name}
                                />
                                <div className="flex flex-col gap-2">
                                    <span className="text-white text-xl">{selectedmovie.title || selectedmovie.name}</span>
                                    <span className="text-amber-500">Language: {selectedmovie.original_language}</span>
                                    <span className="text-orange-500">Rating: {selectedmovie.vote_average}</span>
                                    <span className="text-gray-400">
                                        Release Date: <span className="text-white text-sm">
                                            {selectedmovie.release_date || selectedmovie.first_air_date}
                                          </span>
                                    </span>
                                    <p className="text-gray-400 mt-2">{selectedmovie.overview}</p>
                                </div>
                            </div>
                            <div className="mt-4 w-full border border-gray-600 p-2 rounded-md">
                              <span className="text-white">Select languages</span>
                              <div className="mt-2">
                                {languages.map((i) => (
                                  <button
                                    key={i}
                                    className={`border text-white m-1 p-1 rounded-md ${
                                      selectedmovie?.languages?.includes(i) ? 'bg-blue-500 border-blue-500' : ''
                                    }`}
                                    onClick={() => handleSelectedLanguages(i)}
                                  >
                                    {i}
                                  </button>
                                ))}
                             </div>
                            </div>
                            <div className="flex w-full mt-6 flex-col">
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
                                            multiple={!selectedtype}
                                            className="hidden"
                                            onChange={handleFileChange}
                                           // accept="video/*"
                                        />
                                    </label>
                                </div>

                                {files.length > 0 && (
                                    <div className="mt-5">
                                        <h3 className="text-gray-300 font-medium mb-2">Selected Files:</h3>
                                        <ul className="bg-gray-800 rounded-lg p-3 max-h-48 overflow-y-auto">
                                            {files.map((file, index) => (
                                                <li
                                                    key={index}
                                                    className="text-gray-400 text-sm border-b border-gray-700 py-2 last:border-0"
                                                >
                                                    {file.name}
                                                </li>
                                            ))}
                                        </ul>

                                        {uploadProgress > 0 && (
                                            <div className="mt-4">
                                                <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                    <div 
                                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                                                        style={{ width: `${uploadProgress}%` }}
                                                    ></div>
                                                </div>
                                                <p className="text-gray-400 text-sm mt-1">{uploadProgress}% uploaded</p>
                                            </div>
                                        )}
                                        <button 
                                            className="flex items-center gap-2 text-white p-3 rounded-md bg-blue-500 mt-4 hover:bg-blue-600 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed w-full justify-center"
                                            onClick={handleUploadToDrive}
                                            disabled={isLoading}
                                        >
                                            <FaGoogleDrive className="text-white text-xl" />
                                            <span>{isLoading ? 'Uploading...' : 'Upload to Drive'}</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                          <UploadToFirebase  selectedMovie={selectedmovie}/>
                        </div>
                    </div>
                </div>
            )}
            </div>
      </>
    );
}

