import Sidebar from "./components/Sidebar.jsx";
import PDFUploaderViewer from "./components/PDFUploaderViewer.jsx";
import ChatInterface from "./components/ChatInterface.jsx";

const App = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar for Upload History */}
      <Sidebar />

      {/* Main Section for PDF Viewer */}
      <div className="w-1/2 bg-white p-4">
        <PDFUploaderViewer />
      </div>

      {/* Chat Interface */}
      <div className="w-1/4 bg-gray-200 p-4">
        <ChatInterface />
      </div>
    </div>
  );
};

export default App;
