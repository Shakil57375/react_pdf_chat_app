import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoClose } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const Sidebar = () => {
  const { pdfFiles, setPdfFiles, setSelectedPdf } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(null);
  const [newName, setNewName] = useState("");

  const deletePdf = (pdfToDelete) => {
    const updatedFiles = pdfFiles.filter((pdf) => pdf !== pdfToDelete);
    setPdfFiles(updatedFiles);
    setSelectedPdf(null);
  };

  const renamePdf = (pdfToRename) => {
    const updatedFiles = pdfFiles.map((pdf) =>
      pdf === pdfToRename ? { ...pdf, name: newName } : pdf
    );
    setPdfFiles(updatedFiles);
    setIsEditing(null);
    setNewName("");
  };

  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-4 relative left-14 top-2">
          Upload History
        </h1>
      </div>
      <ul className="mt-2">
        {pdfFiles.length > 0 ? (
          pdfFiles.map((pdf, index) => (
            <li
              key={index}
              className="p-2 border-b flex justify-between items-center"
            >
              {isEditing === index ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="border px-2 py-1 text-sm xl:w-full lg:w-32"
                  />
                  <button onClick={() => renamePdf(pdf)}>
                    <FaSave className="text-green-500 text-lg mr-2" />
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
                <button onClick={() => setIsEditing(index)}>
                  <FiEdit className="text-yellow-500 text-lg" />
                </button>
                <button onClick={() => deletePdf(pdf)}>
                  <MdDelete className="text-red-500 text-lg" />
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
