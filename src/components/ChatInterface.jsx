import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ChatInterface = () => {
  const { messages, setMessages } = useContext(AppContext);
  const [input, setInput] = useState('');

  const predefinedResponses = {
    "What is this document about?": "This document provides information about the uploaded content.",
    "Who created this document?": "The document was created by a sample user for demonstration purposes.",
    "What is my name?": "Hello Shakil How are you?",
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { type: 'user', text: input };
      const aiMessage = {
        type: 'ai',
        text: predefinedResponses[input] || "I'm not sure how to respond to that.",
      };
      setMessages([...messages, userMessage, aiMessage]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto bg-white p-2 rounded mb-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.type === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
