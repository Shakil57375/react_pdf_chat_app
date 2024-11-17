import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PDFViewer = () => {
  const { selectedPdf } = useContext(AppContext);
    console.log(selectedPdf)
  return (
    <div className="h-full border rounded-md overflow-hidden">
      {selectedPdf ? (
        <Worker workerUrl="/pdf.worker.min.mjs">
          <Viewer
            fileUrl={selectedPdf.file}
            options={{
              cMapUrl: "/cmaps/", // Character maps for fonts
              cMapPacked: true,
            }}
          />
        </Worker>
      ) : (
        <p className="text-center">Select or upload a PDF to view</p>
      )}
    </div>
  );
};

export default PDFViewer;
