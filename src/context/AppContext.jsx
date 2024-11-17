import React, { createContext, useState } from "react";

// Create Context
export const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [messages, setMessages] = useState([]);

  return (
    <AppContext.Provider
      value={{
        pdfFiles,
        setPdfFiles,
        selectedPdf,
        setSelectedPdf,
        messages,
        setMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
