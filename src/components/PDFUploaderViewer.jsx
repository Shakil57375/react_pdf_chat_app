import React, { useContext } from 'react';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { AppContext } from '../context/AppContext';
import * as pdfjs from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

// Set the worker source
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

const PDFUploaderViewer = () => {
  const { pdfFiles, setPdfFiles, selectedPdf, setSelectedPdf } = useContext(AppContext);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newPdf = {
        name: file.name,
        file: URL.createObjectURL(file), // Create a URL for the uploaded file
      };
      setPdfFiles([...pdfFiles, newPdf]); // Add the file to history
      setSelectedPdf(newPdf); // Display the newly uploaded file
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
      {!selectedPdf ? (
        <div className="flex flex-col items-center">
          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg shadow-md text-lg mb-4"
          >
            Upload PDF
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
          <p className="text-gray-500">No PDF selected. Please upload one.</p>
        </div>
      ) : (
        <div className="w-full h-full p-4 bg-white shadow-lg">
          <div className="relative h-full border border-gray-300">
            <Viewer fileUrl={selectedPdf.file} /> {/* Display the selected PDF */}
            <button
              onClick={() => setSelectedPdf(null)} // Reset to show the upload interface
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-lg shadow-md"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFUploaderViewer;
