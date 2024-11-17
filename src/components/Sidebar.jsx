import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Sidebar = () => {
  const { pdfFiles, setPdfFiles, setSelectedPdf } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(null);
  const [newName, setNewName] = useState('');

  const deletePdf = (pdfToDelete) => {
    const updatedFiles = pdfFiles.filter((pdf) => pdf !== pdfToDelete);
    setPdfFiles(updatedFiles);

    // If the deleted PDF is currently selected, clear the viewer
    if (pdfToDelete.file === pdfToDelete.file) {
      setSelectedPdf(null);
    }
  };

  const renamePdf = (pdfToRename) => {
    const updatedFiles = pdfFiles.map((pdf) =>
      pdf === pdfToRename ? { ...pdf, name: newName } : pdf
    );
    setPdfFiles(updatedFiles);
    setIsEditing(null); // Exit editing mode
    setNewName(''); // Clear the input field
  };

  return (
    <div className="w-1/4 bg-gray-100 p-4">
      <h1 className="text-xl font-bold mb-4">Upload History</h1>
      <ul className="mt-2">
        {pdfFiles.length > 0 ? (
          pdfFiles.map((pdf, index) => (
            <li key={index} className="p-2 border-b flex justify-between items-center">
              {isEditing === index ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border px-2 py-1 text-sm"
                    placeholder="Enter new name"
                  />
                  <button
                    onClick={() => renamePdf(pdf)}
                    className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span
                  className="cursor-pointer hover:text-blue-600"
                  onClick={() => setSelectedPdf(pdf)}
                >
                  {pdf.name}
                </span>
              )}
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsEditing(index)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-sm"
                >
                  Rename
                </button>
                <button
                  onClick={() => deletePdf(pdf)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No history available.</p>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
