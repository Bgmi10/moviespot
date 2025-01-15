import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import Loader from "./Loader";

export default function UploadToFirebase({ selectedMovie }) {
  const [collections, setCollections] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);

  const CONTENT_TYPES = {
    MEDIA: 'media',
    SLIDER: 'slider'
  };

  const MEDIA_TYPES = {
    MOVIES: 'movies',
    SERIES: 'series'
  };

  const DEFAULT_CATEGORIES = {
    [MEDIA_TYPES.MOVIES]: ['Latest', 'Upcoming', 'Tamil', 'Malayalam', 'Hindi', 'English'],
    [MEDIA_TYPES.SERIES]: ['Latest', 'Ongoing', 'Tamil', 'Malayalam', 'Hindi', 'English'],
    [CONTENT_TYPES.SLIDER]: ['Featured', 'Trending', 'Popular', 'New Releases']
  };

  useEffect(() => {
    fetchCollections();
  }, [currentPath]);

  const getCurrentPathString = () => {
    return currentPath.join('/');
  };

  const fetchCollections = async () => {  
    try {
      setLoading(true);
      const pathString = getCurrentPathString();
      
      if (pathString === '') {
        setCollections([CONTENT_TYPES.MEDIA, CONTENT_TYPES.SLIDER]);
      } 
      else if (pathString === CONTENT_TYPES.MEDIA) {
        setCollections([MEDIA_TYPES.MOVIES, MEDIA_TYPES.SERIES]);
      }
      else if (pathString === CONTENT_TYPES.SLIDER) {
        const sliderRef = collection(db, CONTENT_TYPES.SLIDER);
        const snapshot = await getDocs(sliderRef);
        const existingCategories = snapshot.docs.map(doc => doc.data().name);
        const allCategories = [...new Set([...DEFAULT_CATEGORIES[CONTENT_TYPES.SLIDER], ...existingCategories])];
        setCategories(allCategories);
      }
      else if (Object.values(MEDIA_TYPES).includes(pathString.split('/').pop())) {
        const mediaType = pathString.split('/').pop();
        const categoriesRef = collection(db, `${pathString}/categories`);
        const snapshot = await getDocs(categoriesRef);
        const existingCategories = snapshot.docs.map(doc => doc.data().name);
        const allCategories = [...new Set([...DEFAULT_CATEGORIES[mediaType], ...existingCategories])];
        setCategories(allCategories);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setLoading(false);
    }
  };

  const fetchDocuments = async (categoryPath) => {
    try {
      setLoading(true);
      const collRef = collection(db, categoryPath);
      let snapshot;
      
      if (currentPath[0] === CONTENT_TYPES.SLIDER) {
        snapshot = await getDocs(collRef);
      } else {
        const contentTypeQuery = query(collRef, where("type", "==", currentPath.includes(MEDIA_TYPES.MOVIES) ? "movies" : "series"));
        snapshot = await getDocs(contentTypeQuery);
      }
      
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        path: doc.ref.path,
        ...doc.data()
      }));
      setDocuments(docs);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching documents:", error);
      setLoading(false);
    }
  };

  const createCollection = async () => {
    if (!newCollectionName.trim()) return;
    
    try {
      setLoading(true);
      const pathString = getCurrentPathString();

      if (pathString === CONTENT_TYPES.SLIDER) {
        const sliderRef = collection(db, CONTENT_TYPES.SLIDER);
        await addDoc(sliderRef, {
          name: newCollectionName,
          created: new Date(),
          type: 'slider_category'
        });
      } 
      else if (Object.values(MEDIA_TYPES).includes(pathString.split('/').pop())) {
        const categoriesRef = collection(db, `${pathString}/categories`);
        await addDoc(categoriesRef, {
          name: newCollectionName,
          created: new Date(),
          type: 'category',
          mediaType: pathString.split('/').pop()
        });
      }

      await fetchCollections();
      setNewCollectionName("");
      setIsCreatingCollection(false);
      setLoading(false);
    } catch (error) {
      console.error("Error creating collection:", error);
      setLoading(false);
    }
  };

  const uploadToCollection = async () => {
    if (!selectedCategory || !selectedMovie) return;
    
    try {
      setLoading(true);
      const pathString = getCurrentPathString();
      let targetRef;
      
      if (pathString === CONTENT_TYPES.SLIDER) {
        targetRef = collection(db, `${CONTENT_TYPES.SLIDER}/${selectedCategory}/content`);
      } else {
        targetRef = collection(db, `${pathString}/categories/${selectedCategory}/content`);
      }
      
      const movieData = {
        id: selectedMovie.id,
        title: selectedMovie.title || selectedMovie.name,
        overview: selectedMovie.overview,
        posterPath: selectedMovie.poster_path,
        releaseDate: selectedMovie.release_date || selectedMovie.first_air_date,
        drivePreviewUrl: selectedMovie.drivePreviewUrl,
        type: selectedMovie.type,
        category: selectedCategory,
        language: selectedMovie.languages,
        adult: selectedMovie.adult,
        backdropPath: selectedMovie.backdrop_path,
        averageRating: selectedMovie.vote_average,
        createdAt: new Date(),
        updatedAt: new Date(),
        collectionType: currentPath[0] === CONTENT_TYPES.SLIDER ? "slider" : "media"  
      };
      
      await addDoc(targetRef, movieData);
      await fetchDocuments(targetRef.path);
      setLoading(false);
      alert('File uploaded to server successfully...');
      setCategories('');
      setCurrentPath([]);
    } catch (error) {
      console.error("Error uploading content:", error);
      setLoading(false);
    }
  };

  const navigateToPath = async (path) => {
    setCurrentPath(path.split('/'));
    await fetchCollections();
  };

  const navigateBack = async () => {
    setSelectedCategory('');
    const newPath = [...currentPath];
    newPath.pop();
    setCurrentPath(newPath);
  };

  return (
    <>
      <div className="p-6 space-y-6 border border-gray-800 rounded-lg mt-6">
        <span className="text-white">Upload to server</span>
        <div className="flex items-center space-x-2">
          {currentPath?.length > 0 && (
            <button
              onClick={navigateBack}
              className="px-3 py-1 text-sm bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              ← Back
            </button>
          )}
          <div className="flex items-center lg:space-x-2 sm: space-x-0 text-xs">
            <span className="text-gray-400">Root</span>
            {currentPath?.map((path, index) => (
              <span key={index} className="text-gray-400">
                → {path}
              </span>
            ))}
          </div>
        </div>

        {currentPath?.length === 0 && (
          <div className="grid grid-cols-2 gap-4">
            {collections?.map((type) => (
              <button
                key={type}
                onClick={() => navigateToPath(type)}
                className="p-4 bg-gray-800 rounded-lg text-white hover:bg-gray-700"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {currentPath?.length === 1 && currentPath[0] === CONTENT_TYPES.MEDIA && (
          <div className="grid grid-cols-2 gap-4">
            {collections?.map((type) => (
              <button
                key={type}
                onClick={() => navigateToPath(`${CONTENT_TYPES.MEDIA}/${type}`)}
                className="p-4 bg-gray-800 rounded-lg text-white hover:bg-gray-700"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        )}

        {(Object.values(MEDIA_TYPES).includes(currentPath[currentPath.length - 1]) || currentPath[0] === CONTENT_TYPES.SLIDER) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-sm">Categories</h3>
              <button
                onClick={() => setIsCreatingCollection(true)}
                className="px-2 py-2 bg-blue-600 text-xs text-white rounded hover:bg-blue-700"
              >
                New Category
              </button>
            </div>

            <div className="sm: flex sm: flex-col gap-2 w-full lg:grid lg:grid-cols-3">
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-2 rounded-lg text-white ${
                    selectedCategory === category ? 'bg-blue-600' : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {category && category}
                </button>
              ))}
            </div>

            {isCreatingCollection && (
              <div className="p-4 bg-gray-800 rounded space-y-4">
                <input
                  type="text"
                  value={newCollectionName}
                  onChange={(e) => setNewCollectionName(e.target.value)}
                  placeholder="New Category Name"
                  className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={createCollection}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setIsCreatingCollection(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {selectedCategory && selectedMovie && (
          <div className="p-4 bg-gray-800 rounded mt-4">
            <div className="flex flex-col justify-between gap-2">
              <div className="flex justify-start gap-2 flex-col">
                <img
                  src={`https://image.tmdb.org/t/p/w92${selectedMovie.poster_path}`}
                  alt={selectedMovie.title || selectedMovie.name}
                  className="w-12 h-18 rounded"
                />
                <div>
                  <h3 className="text-white font-medium">
                    {selectedMovie.title || selectedMovie.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {selectedMovie.release_date || selectedMovie.first_air_date}
                  </p>
                  <p className="text-gray-400 text-sm">
                    Category: {selectedCategory}
                  </p>
                </div>
              </div>
              <button
                onClick={uploadToCollection}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                disabled={loading}
              >
                {loading ? "Uploading..." : "Upload to server"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Loader loading={loading} />
    </>
  );
}