import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import PDFUploaderViewer from "./components/PDFUploaderViewer.jsx";
import ChatInterface from "./components/ChatInterface.jsx";
import { RiMenu2Fill } from "react-icons/ri";
import { BsChatTextFill } from "react-icons/bs";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For toggling sidebar
  const [isChatOpen, setIsChatOpen] = useState(false); // For toggling chat interface

  return (
    <div className="flex h-screen">
      {/* Sidebar for Upload History */}
      <div
        className={`fixed lg:relative z-40 bg-gray-100 h-screen lg:h-auto ${
          isSidebarOpen ? "w-2/3 sm:w-1/3" : "hidden"
        } lg:block lg:w-1/5`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Toggle Button for Sidebar (Mobile Only) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-5 left-5 z-50 bg-white text-gray-500 p-2 rounded-full shadow-xl"
      >
        <RiMenu2Fill className="text-xl" />
      </button>

      {/* Main Section for PDF Viewer */}
      <div className="flex-1 lg:w-3/5 bg-white p-4">
        <PDFUploaderViewer />
      </div>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-0 right-0 z-40 bg-gray-200 h-2/3 w-4/5 sm:w-1/2 ${
          isChatOpen ? "block" : "hidden"
        } lg:block lg:w-1/5 lg:relative lg:h-auto`}
      >
        <ChatInterface closeChat={() => setIsChatOpen(false)} />
      </div>

      {/* Toggle Button for Chat Interface (Mobile Only) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="lg:hidden fixed bottom-10 right-6 z-50 bg-blue-500 text-white p-2 rounded-full shadow-md"
        >
          <BsChatTextFill />
        </button>
      )}
    </div>
  );
};

export default App;
