import { useState, useEffect } from 'react';

export default function EditModal({ item, onClose, onSubmit, languages }) {
  const [editedItem, setEditedItem] = useState(item);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem(prev => ({
      ...prev,
      [name]: name === 'id' || name === 'averageRating' ? Number(value) : value
    }));
  };

  const handleLanguageToggle = (language) => {
    setEditedItem(prev => ({
      ...prev,
      language: prev.language.includes(language)
        ? prev.language.filter(lang => lang !== language)
        : [...prev.language, language]
    }));
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

          <div>
            {languages?.map((language) => (
              <button
                key={language}
                type="button"
                className={`p-1 rounded-md border text-white m-1 ${
                  editedItem.language.includes(language) ? "bg-blue-500 border-blue-500" : "border-gray-600"
                }`} 
                onClick={() => handleLanguageToggle(language)}
              >
                {language}
              </button>
            ))}
          </div>

          <div>
            {editedItem.drivePreviewUrl.map((item, index) => (
              <input
                key={index}
                type="text"
                value={item.url || ''}
                placeholder="File URL"
                className="w-full p-2 rounded bg-gray-700 text-white m-1"
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