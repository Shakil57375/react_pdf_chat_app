import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IoClose } from "react-icons/io5";
import Loader from "./Loader";
import { IoIosSend } from "react-icons/io";

// Chatbot image URL (replace with your actual image URL or import)
const chatbotImage =
  "https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg";

const ChatInterface = ({ closeChat }) => {
  const { messages, setMessages } = useContext(AppContext);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loader

  const predefinedResponses = {
    "What is this document about?":
      "This document provides information about the uploaded content.",
    "Who created this document?":
      "The document was created by a sample user for demonstration purposes.",
    "What is my name?": "Hello Shakil, how are you?",
    "Can you help with this document?":
      "Sure! Let me know what specific help you need.",
    "What features does this app have?":
      "This app lets you upload PDFs, view them, and chat about their content.",
    "What is your purpose?": "I'm here to assist with your document queries.",
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { type: "user", text: input };
      setMessages([...messages, userMessage]);
      setInput("");

      setIsLoading(true); // Show loader
      setTimeout(() => {
        const aiMessage = {
          type: "ai",
          text:
            predefinedResponses[input] ||
            "I'm not sure how to respond to that.",
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setIsLoading(false); // Hide loader
      }, 1500); // Simulate response delay
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or other default behavior
      handleSend();
    }
  };

  const handleDefaultPromptClick = (prompt) => {
    const userMessage = { type: "user", text: prompt };
    setMessages([...messages, userMessage]);

    setIsLoading(true); // Show loader
    setTimeout(() => {
      const aiMessage = {
        type: "ai",
        text:
          predefinedResponses[prompt] || "I'm not sure how to respond to that.",
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
      setIsLoading(false); // Hide loader
    }, 1500); // Simulate response delay
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between bg-blue-500 text-white px-4 py-2 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <img
            src={chatbotImage}
            alt="Chatbot"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="text-lg font-semibold">Skylar</h1>
        </div>
        <button
          onClick={closeChat}
          className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full flex lg:hidden"
        >
          <IoClose size={18} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start ${
              msg.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.type === "ai" && (
              <img
                src={chatbotImage}
                alt="Chatbot"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`p-3 rounded-lg ${
                msg.type === "user"
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {/* Loader for AI response */}
        {isLoading && (
          <div className="flex items-start justify-start">
            <img
              src={chatbotImage}
              alt="Chatbot"
              className="w-8 h-8 rounded-full mr-2"
            />
            <Loader />
          </div>
        )}
      </div>

      {/* Default Prompts */}
      <div className="flex flex-wrap gap-2 p-4 bg-gray-50 border-t">
        {Object.keys(predefinedResponses).map((prompt, index) => (
          <button
            key={index}
            onClick={() => handleDefaultPromptClick(prompt)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-lg"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex items-center border-t p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Add this line to handle Enter key press
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded-l-lg focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r-lg flex items-center justify-center"
        >
          <IoIosSend size={20}  />
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
