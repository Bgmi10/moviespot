import { useState, useEffect } from 'react';

export default function EditModal({ item, onClose, onSubmit, languages }) {
  const [editedItem, setEditedItem] = useState(() => {
    // Ensure drivePreviewUrl is always an array
    const normalizedItem = {
      ...item,
      drivePreviewUrl: Array.isArray(item.drivePreviewUrl) 
        ? item.drivePreviewUrl 
        : item.drivePreviewUrl 
          ? [{ url: item.drivePreviewUrl }] 
          : [],
      language: Array.isArray(item.language) ? item.language : [],
      dashUrl: item.dashUrl || '',
      dashVideoId: item.dashVideoId || ''
    };
    return normalizedItem;
  });

  useEffect(() => {
    const normalizedItem = {
      ...item,
      drivePreviewUrl: Array.isArray(item.drivePreviewUrl) 
        ? item.drivePreviewUrl 
        : item.drivePreviewUrl 
          ? [{ url: item.drivePreviewUrl }] 
          : [],
      language: Array.isArray(item.language) ? item.language : [],
      dashUrl: item.dashUrl || '',
      dashVideoId: item.dashVideoId || ''
    };
    setEditedItem(normalizedItem);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      [name]: name === 'id' || name === 'averageRating' ? Number(value) : value
    }));
  };

  const handleLanguageToggle = (language) => {
    setEditedItem(prev => {
      const currentLanguages = Array.isArray(prev.language) ? prev.language : [];
      return {
        ...prev,
        language: currentLanguages.includes(language)
          ? currentLanguages.filter(lang => lang !== language)
          : [...currentLanguages, language]
      };
    });
  };

  const handleDrivePreviewUrlChange = (index, value) => {
    setEditedItem(prev => {
      const newDrivePreviewUrl = [...prev.drivePreviewUrl];
      newDrivePreviewUrl[index] = { url: value };
      return { ...prev, drivePreviewUrl: newDrivePreviewUrl };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedItem);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-white font-semibold mb-2">Edit {editedItem.title}</h3>
        <form onSubmit={handleSubmit} className="space-y-2">
          {['title', 'posterPath', 'backdropPath', 'averageRating', 'type', 'overview', 'category', 'releaseDate', 'collectionType', 'id'].map(field => (
            <input
              key={field}
              type={field === 'averageRating' || field === 'id' ? 'number' : 'text'}
              name={field}
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={editedItem[field] || ''}
              onChange={handleChange}
            />
          ))}

          {/* DASH URL Field */}
          <div>
            <label className="text-white text-sm">DASH Streaming URL:</label>
            <input
              type="text"
              name="dashUrl"
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="https://s3.amazonaws.com/dash/videoId/manifest.mpd"
              value={editedItem.dashUrl || ''}
              onChange={handleChange}
            />
          </div>

          {/* DASH Video ID Field */}
          <div>
            <label className="text-white text-sm">DASH Video ID:</label>
            <input
              type="text"
              name="dashVideoId"
              className="w-full p-2 rounded bg-gray-700 text-white"
              placeholder="e.g., f591db1e-c0db-4d22-95e4-00e6313501c0"
              value={editedItem.dashVideoId || ''}
              onChange={handleChange}
            />
          </div>

          <div>
            {languages?.map((language) => (
              <button
                key={language}
                type="button"
                className={`p-1 rounded-md border text-white m-1 ${
                  (editedItem.language || []).includes(language) ? "bg-blue-500 border-blue-500" : "border-gray-600"
                }`} 
                onClick={() => handleLanguageToggle(language)}
              >
                {language}
              </button>
            ))}
          </div>

          {/* Drive URLs Section */}
          <div>
            <label className="text-white text-sm">Google Drive URLs:</label>
            {(editedItem.drivePreviewUrl || []).map((item, index) => (
              <input
                key={index}
                type="text"
                value={item?.url || ''}
                placeholder="Google Drive File URL"
                className="w-full p-2 rounded bg-gray-700 text-white mb-1"
                onChange={(e) => handleDrivePreviewUrlChange(index, e.target.value)}
              />
            ))}
          </div>
        
          <select 
            name="adult"
            onChange={handleChange} 
            value={editedItem.adult.toString()}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}