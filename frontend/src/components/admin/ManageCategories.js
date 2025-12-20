import { useState } from "react";
import { useCategory } from "../../contexts/CategoryContext";

export default function ManageCategories() {
  const { category, categoryRaw, createCategory, updateCategory, deleteCategory } = useCategory();
  const [showNewMovieCat, setShowNewMovieCat] = useState(false);
  const [showNewSeriesCat, setShowNewSeriesCat] = useState(false);
  const [newMovieCategory, setNewMovieCategory] = useState("");
  const [newSeriesCategory, setNewSeriesCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryValue, setEditCategoryValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCategory = async (type, title) => {
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      const success = await createCategory(type, title);
      if (success) {
        if (type === 'MOVIE') {
          setNewMovieCategory("");
          setShowNewMovieCat(false);
        } else {
          setNewSeriesCategory("");
          setShowNewSeriesCat(false);
        }
      }
    } catch (error) {
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCategory = async (categoryId, newTitle) => {
    if (!newTitle.trim()) return;
    
    setLoading(true);
    try {
      const success = await updateCategory(categoryId, newTitle);
      if (success) {
        setEditingCategory(null);
        setEditCategoryValue("");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setLoading(true);
    try {
      await deleteCategory(categoryId);
    } catch (error) {
      console.error("Error deleting category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg text-white font-semibold mb-3">Manage Categories</h3>
      
      {/* Movies Categories */}
      <div className="mb-4">
        <h4 className="text-white mb-2">Movies Categories</h4>
        <div className="flex flex-wrap gap-2 items-center">
          {showNewMovieCat ? (
            <div className="flex gap-2">
              <input 
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600" 
                type="text" 
                value={newMovieCategory}
                onChange={(e) => setNewMovieCategory(e.target.value)}
                placeholder="Enter category name"
                disabled={loading}
              />
              <button 
                onClick={() => handleCreateCategory('MOVIE', newMovieCategory)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                Add
              </button>
              <button 
                onClick={() => {
                  setShowNewMovieCat(false);
                  setNewMovieCategory("");
                }}
                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowNewMovieCat(true)} 
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              disabled={loading}
            >
              + Add New
            </button>
          )}
          
          {categoryRaw.movies?.map((movie) => (
            <div key={movie.id} className="flex items-center gap-1 bg-gray-700 rounded px-2 py-1">
              {editingCategory === movie.id ? (
                <>
                  <input
                    className="bg-gray-800 text-white px-2 py-0.5 rounded text-sm"
                    value={editCategoryValue}
                    onChange={(e) => setEditCategoryValue(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    onClick={() => handleUpdateCategory(movie.id, editCategoryValue)}
                    className="text-green-400 hover:text-green-300 text-sm disabled:opacity-50"
                    disabled={loading}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setEditCategoryValue("");
                    }}
                    className="text-gray-400 hover:text-gray-300 text-sm"
                    disabled={loading}
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <span className="text-white">{movie.title}</span>
                  <button
                    onClick={() => {
                      setEditingCategory(movie.id);
                      setEditCategoryValue(movie.title);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 text-sm ml-2"
                    disabled={loading}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(movie.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                    disabled={loading}
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Series Categories */}
      <div>
        <h4 className="text-white mb-2">Series Categories</h4>
        <div className="flex flex-wrap gap-2 items-center">
          {showNewSeriesCat ? (
            <div className="flex gap-2">
              <input 
                className="bg-gray-700 text-white px-3 py-1 rounded border border-gray-600" 
                type="text" 
                value={newSeriesCategory}
                onChange={(e) => setNewSeriesCategory(e.target.value)}
                placeholder="Enter category name"
                disabled={loading}
              />
              <button 
                onClick={() => handleCreateCategory('SERIE', newSeriesCategory)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                disabled={loading}
              >
                Add
              </button>
              <button 
                onClick={() => {
                  setShowNewSeriesCat(false);
                  setNewSeriesCategory("");
                }}
                className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowNewSeriesCat(true)} 
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              disabled={loading}
            >
              + Add New
            </button>
          )}
          
          {categoryRaw.series?.map((series) => (
            <div key={series.id} className="flex items-center gap-1 bg-gray-700 rounded px-2 py-1">
              {editingCategory === series.id ? (
                <>
                  <input
                    className="bg-gray-800 text-white px-2 py-0.5 rounded text-sm"
                    value={editCategoryValue}
                    onChange={(e) => setEditCategoryValue(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    onClick={() => handleUpdateCategory(series.id, editCategoryValue)}
                    className="text-green-400 hover:text-green-300 text-sm disabled:opacity-50"
                    disabled={loading}
                  >
                    ✓
                  </button>
                  <button
                    onClick={() => {
                      setEditingCategory(null);
                      setEditCategoryValue("");
                    }}
                    className="text-gray-400 hover:text-gray-300 text-sm"
                    disabled={loading}
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <span className="text-white">{series.title}</span>
                  <button
                    onClick={() => {
                      setEditingCategory(series.id);
                      setEditCategoryValue(series.title);
                    }}
                    className="text-yellow-400 hover:text-yellow-300 text-sm ml-2"
                    disabled={loading}
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDeleteCategory(series.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                    disabled={loading}
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}