import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loader from "./Loader";
import BackToAdmin from "./BackToAdmin";

/// todo: replace the hard coded value of category and fetch the category from firestore

export default function ManageMedia({ setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const [mediaData, setMediaData] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPosterPath, setEditPosterPath] = useState("");
  const [editbackdroppath, setEditBackPath] = useState("");
  const [editrating, setEditRating] = useState("");
  const [edittype, setEditType] = useState("");
  const [editoverview, setEditOverview] = useState("");
  const [editcategory, setEditCategory] = useState("");
  const [editreleasedate, setEditReleaseDate] = useState("");
  const [editadult, setEditAdult] = useState(false);
  
  const MEDIA_TYPES = ['movies', 'series'];

  const fetchMedia = async () => {
    try {
      setError(null);
      const mediaResults = {};

      const hardcodedCategories = {
        movies: ['Latest', 'Upcoming', 'Tamil', 'Malayalam', 'Hindi', 'English'],
        series: ['Latest', 'Ongoing', 'Tamil', 'Malayalam', 'Hindi', 'English'],
      };

      // Directly fetch categories for movies and series
      for (const mediaType of MEDIA_TYPES) {
        console.log(`Fetching categories for ${mediaType}`);
        
        const categories = hardcodedCategories[mediaType];
        
        if (categories) {
          mediaResults[mediaType] = {};
          
          for (const categoryName of categories) {
            const categoryPath = `media/${mediaType}/categories/${categoryName}/content`;
            const categoryRef = collection(db, categoryPath);
            const categorySnapshot = await getDocs(categoryRef);

            if (!categorySnapshot.empty) {
              const contentPath = `media/${mediaType}/categories/${categoryName}/content`;
              const contentRef = collection(db, contentPath);
              const contentSnapshot = await getDocs(contentRef);

              mediaResults[mediaType][categoryName] = {
                categoryInfo: { name: categoryName },
                content: contentSnapshot.docs.map(doc => ({
                  firebaseId: doc.id,
                  ...doc.data()
                }))
              };
            }
          }
        }
      }
      setMediaData(mediaResults);
      if (Object.keys(mediaResults).length === 0) {
        setError("No media data found");
      }
    } catch (error) {
      console.error("Error fetching media:", error);
      setError(error.message);
    }
  };

  const fetchSlider = async () => {
    try {
      const sliderResults = {};
      const sliderCategories = ['Featured', 'Trending', 'Popular', 'New Releases'];

      for (const categoryName of sliderCategories) {
        const categoryPath = `slider/${categoryName}/content`;
        const categoryRef = collection(db, categoryPath);
        const categorySnapshot = await getDocs(categoryRef);

        if (!categorySnapshot.empty) {
          const categoryData = categorySnapshot.docs[0].data();
          const contentPath = `slider/${categoryName}/content`;
          const contentRef = collection(db, contentPath);
          const contentSnapshot = await getDocs(contentRef);

          sliderResults[categoryName] = {
            categoryInfo: categoryData,
            content: contentSnapshot.empty ? [] : contentSnapshot.docs.map(doc => ({
              firebaseId: doc.id,
              ...doc.data()
            }))
          };
        }
      }

      setSliderData(sliderResults);
    } catch (error) {
      console.error("Error fetching slider:", error);
      setError(error.message);
    }
  };

  const fetchCollections = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchMedia(), fetchSlider()]);
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
     setEditItem(item);
     setEditTitle(item?.title);
     setEditPosterPath(item?.posterPath || "");
     setEditBackPath(item?.backdropPath);
     setEditRating(item?.averageRating);
     setEditType(item?.type);
     setEditOverview(item?.overview);
     setEditCategory(item?.category);
     setEditReleaseDate(item?.releaseDate);
     setEditAdult(item?.adult);
  };

  const handleEditSubmit = async () => {
    if (editItem) {
      try {
        const itemRef = doc(db, `media/${editItem.type}/categories/${editItem.category}/content`, String(editItem.firebaseId));
        await updateDoc(itemRef, {
          title: editTitle,
          posterPath: editPosterPath
        });
        setEditItem(null);  // Close the edit modal
        fetchCollections();  // Refetch data
      } catch (error) {
        console.error("Error updating content:", error);
        setError("Error updating content");
      }
    }
  };

  const handleDeleteClick = async (itemId, mediaType, category) => {
    try {
        const s = String(itemId)
        console.log(typeof s, category)
      const itemRef = doc(db, `media/${mediaType}/categories/${category}/content`, String(itemId));
      await deleteDoc(itemRef);
      fetchCollections();  // Refetch data
    } catch (error) {
      console.error("Error deleting content:", error);
      setError("Error deleting content");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="p-6">
     <BackToAdmin setIsOpen={setIsOpen} /> 
      <Loader loading={loading}/>
      {mediaData && (
        <div className="space-y-6">        
          <h2 className="text-xl text-white font-semibold">Media Content</h2>
          {Object.entries(mediaData).map(([mediaType, categories]) => (
            <div key={mediaType} className="space-y-4">
              <h3 className="text-lg text-white capitalize">{mediaType}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(categories).map(([categoryId, { categoryInfo, content }]) => (
                  <div key={categoryId} className="p-4 bg-gray-800 rounded-lg">
                    <h4 className="text-white font-medium mb-2">{categoryInfo.name}</h4>
                    <p className="text-gray-400 text-sm mb-2">Content: {content.length} items</p>
                    <div className="space-y-2">
                      {content.map(item => (
                        <div key={item.id} className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
                          {item.posterPath && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${item.posterPath}`}
                              alt={item.title}
                              className="w-8 h-12 rounded"
                            />
                          )}
                          <span className="text-white text-sm">{item.title}</span>
                          <button
                            className="text-red-500"
                            onClick={() => handleDeleteClick(item.firebaseId, mediaType, categoryId)}
                          >
                            Delete
                          </button>
                          <button
                            className="text-yellow-500"
                            onClick={() => handleEditClick(item)}
                          >
                            Edit
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-white font-semibold mb-4">Edit {editItem.title}</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Poster Path"
                value={editPosterPath}
                onChange={(e) => setEditPosterPath(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="backdrop path"
                value={editbackdroppath}
                onChange={(e) => setEditBackPath(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Poster Path"
                value={editrating}
                onChange={(e) => setEditRating(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Poster Path"
                value={edittype}
                onChange={(e) => setEditType(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Poster Path"
                value={editoverview}
                onChange={(e) => setEditOverview(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Poster Path"
                value={editcategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Poster Path"
                value={editreleasedate}
                onChange={(e) => setEditReleaseDate(e.target.value)}
              />
              <select onChange={(e) => setEditAdult(e.target.value)} value={editadult}>
                 <option value={editadult}>true</option>
                 <option value={editadult}>false</option>
              </select>
              <div className="flex space-x-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={handleEditSubmit}
                >
                  Save Changes
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setEditItem(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {sliderData && (
        <div className="space-y-6 mt-8">
          <h2 className="text-xl text-white font-semibold">Slider Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(sliderData).map(([categoryId, { categoryInfo, content }]) => (
              <div key={categoryId} className="p-4 bg-gray-800 rounded-lg">
                <h4 className="text-white font-medium mb-2">{categoryInfo.name}</h4>
                <p className="text-gray-400 text-sm mb-2">Content: {content.length} items</p>
                <div className="space-y-2">
                  {content.map(item => (
                    <div key={item.id} className="flex items-center space-x-2 bg-gray-700 p-2 rounded">
                      {item.posterPath && (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${item.posterPath}`}
                          alt={item.title}
                          className="w-8 h-12 rounded"
                        />
                      )}
                      <span className="text-white text-sm">{item.title}</span>
                      <button
                        className="text-red-500"
                        onClick={() => handleDeleteClick(item.id, "slider", categoryId)}
                      >
                        Delete
                      </button>
                      <button
                        className="text-yellow-500"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!loading && !mediaData && !sliderData && (
        <div className="text-white">No data found</div>
      )}
    </div>
  );
}
