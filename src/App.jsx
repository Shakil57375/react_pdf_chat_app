import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar.jsx";
import PDFUploaderViewer from "./components/PDFUploaderViewer.jsx";
import ChatInterface from "./components/ChatInterface.jsx";
import { RiMenu2Fill } from "react-icons/ri";
import { BsChatTextFill } from "react-icons/bs";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For toggling sidebar
  const [isChatOpen, setIsChatOpen] = useState(false); // For toggling chat interface

  // Framer Motion Variants
  const slideInLeft = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  const slideInBottom = {
    hidden: { y: "100%", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar for Upload History */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideInLeft}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed z-40 bg-white h-screen w-2/3 sm:w-1/3 lg:hidden shadow-2xl"
          >
            <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Visible Without Animation for Large Screens */}
      <div className="hidden lg:block lg:w-1/5 h-screen bg-white">
        <Sidebar />
      </div>

      {/* Sidebar Toggle Button for Mobile Only */}
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
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideInBottom}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed bottom-0 right-0 z-40 bg-gray-200 h-2/3 w-4/5 sm:w-1/2 lg:hidden shadow-xl"
          >
            <ChatInterface closeChat={() => setIsChatOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface Always Visible for Large Screens */}
      <div className="hidden lg:block lg:w-1/5 h-screen bg-gray-200">
        <ChatInterface />
      </div>

      {/* Chat Toggle Button for Mobile Only */}
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
