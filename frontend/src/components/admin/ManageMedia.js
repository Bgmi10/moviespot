import { useEffect, useState } from "react";
import { db } from "../../utils/firebase";
import { collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Loader from "./Loader";
import BackToAdmin from "./BackToAdmin";
import { languages } from "./constants";
import EditModal from "./EditModal";

const MEDIA_TYPES = ['movies', 'series'];
const SLIDER_CATEGORIES = ['Featured', 'Trending', 'Popular', 'New Releases'];

const HARDCODED_CATEGORIES = {
  movies: ['Latest', 'Upcoming', 'Tamil', 'Malayalam', 'Hindi', 'English', 'Vijay’s Top Hits (Tamil)', 'Top Hits 2024', 'New Releases'],
  series: ['Latest', 'Ongoing', 'Tamil', 'Malayalam', 'Hindi', 'English'],
};

export default function ManageMedia({ setIsOpen }) {
  const [loading, setLoading] = useState(false);
  const [mediaData, setMediaData] = useState(null);
  const [sliderData, setSliderData] = useState(null);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [mediasearchdata, setMediaSearchData] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState("");
     
  const fetchCollectionData = async (collectionPath) => {
    const collectionRef = collection(db, collectionPath);
    const snapshot = await getDocs(collectionRef);
    return snapshot.docs.map(doc => ({
      firebaseId: doc.id,
      ...doc.data()
    }));
  };

  const fetchMediaData = async () => {
    const mediaResults = {};
    for (const mediaType of MEDIA_TYPES) {
      const categories = HARDCODED_CATEGORIES[mediaType];
      if (categories) {
        mediaResults[mediaType] = {};
        for (const categoryName of categories) {
          const contentPath = `media/${mediaType}/categories/${categoryName}/content`;
          const content = await fetchCollectionData(contentPath);
          if (content.length > 0) {
            mediaResults[mediaType][categoryName] = {
              categoryInfo: { name: categoryName },
              content
            };
          }
        }
      }
    }
    return mediaResults;
  };

  const fetchSliderData = async () => {
    const sliderResults = {};
    for (const categoryName of SLIDER_CATEGORIES) {
      const contentPath = `slider/${categoryName}/content`;
      const content = await fetchCollectionData(contentPath);
      if (content.length > 0) {
        sliderResults[categoryName] = {
          categoryInfo: { name: categoryName },
          content
        };
      }
    }
    return sliderResults;
  };

  const fetchMediaSearch = async() => {
    try {
      const collectionRef = collection(db, "mediaSearch");
      const docRef = await getDocs(collectionRef);

      const finalData = docRef.docs.map((item) => ({
        firebaseId: item.id,
        ...item.data()
      }));

      setMediaSearchData(finalData);
    } catch (e) {
      console.log(e);
      setError(e, "error fetching media search data");
    }
  }

  const fetchCollections = async () => {
    setLoading(true);
    try {
      const [media, slider] = await Promise.all([fetchMediaData(), fetchSliderData(), fetchMediaSearch()]);
      setMediaData(media);
      setSliderData(slider);
      if (Object.keys(media).length === 0 && Object.keys(slider).length === 0) {
        setError("No media data found");
      }
    } catch (error) {
      console.error("Error fetching collections:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  

  const handleEditClick = (item) => {
    setEditItem(item);
  };

  const handleEditSubmit = async (updatedItem) => {
    try {
      if (selectedMedia === "mediaSearch") {
        const itemRef = doc(db, "mediaSearch", updatedItem.firebaseId);
        await updateDoc(itemRef, updatedItem);
        setEditItem(null);  
        fetchCollections();
        return;
      }
      const itemRef = doc(db, `${updatedItem.collectionType}/${updatedItem.collectionType === "media" ? updatedItem.type : ""}${updatedItem.collectionType === "media" ? "/categories/" : ""}${updatedItem.category}/content`, String(updatedItem.firebaseId));
      await updateDoc(itemRef, updatedItem);
      setEditItem(null);  
      fetchCollections();
    } catch (error) {
      console.error("Error updating content:", error);
      setError("Error updating content");
    }
  };

  const handleDeleteClick = async (itemId, mediaType, category, collectionType) => {
    try {
      if (selectedMedia === "mediaSearch") {
        console.log("Deleting from mediasearch", itemId);
        const itemRef = doc(db, "mediaSearch", itemId);
        await deleteDoc(itemRef);
        fetchCollections();
        return;
      }
      const itemRef = doc(db, `${collectionType}/${collectionType === "media" ? mediaType : ""}${collectionType === "media" ? "/categories/" : ""}${category}/content`, itemId);
      await deleteDoc(itemRef);
      fetchCollections();
    } catch (error) {
      console.error("Error deleting content:", error);
      setError("Error deleting content");
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const renderContent = (content, mediaType, categoryId) => (
    <div className="space-y-2">
      {content?.map((item, index) => (
        <div key={index} className="bg-gray-700 p-3 rounded" onClick={() => setSelectedMedia(mediaType)}>
          <div className="flex items-center space-x-3 mb-2">
            {item.posterPath && (
              <img
                src={`https://image.tmdb.org/t/p/w92${item.posterPath}`}
                alt={item.title}
                className="w-8 h-12 rounded"
              />
            )}
            <div className="flex-1">
              <span className="text-white text-sm font-medium">{item.title}</span>
              <div className="flex flex-col gap-1 mt-1">
                {item.drivePreviewUrl && (
                  <span className="text-blue-400 text-xs">📁 Drive URL available</span>
                )}
                {item.dashUrl && (
                  <span className="text-orange-400 text-xs">🎬 DASH URL available</span>
                )}
                {!item.drivePreviewUrl && !item.dashUrl && (
                  <span className="text-red-400 text-xs">⚠️ No streaming URLs</span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-yellow-500 hover:text-yellow-400 text-sm px-2 py-1 rounded bg-gray-600"
                onClick={() => handleEditClick(item)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-400 text-sm px-2 py-1 rounded bg-gray-600"
                onClick={() => handleDeleteClick(item.firebaseId, mediaType, categoryId, item.collectionType)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

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
                    {renderContent(content, mediaType, categoryId)}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
                {renderContent(content, "slider", categoryId)}
              </div>
            ))}
          </div>
        </div>
      )}

      {
         <div className="space-y-6 mt-8">
         <h2 className="text-xl text-white font-semibold">MediaSearch Content</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
             <div className="p-4 bg-gray-800 rounded-lg">
               <p className="text-gray-400 text-sm mb-2">Content: {mediasearchdata?.length} items</p>
             {mediasearchdata && renderContent(mediasearchdata, "mediaSearch", "asdlk")}
             </div>
         </div>
       </div>
     
      }
      
      {!loading && !mediaData && !sliderData && (
        <div className="text-white">No data found</div>
      )}

      {editItem && (
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSubmit={handleEditSubmit}
          languages={languages}
          selectedMedia={selectedMedia}
        />
      )}
    </div>
  );
}

