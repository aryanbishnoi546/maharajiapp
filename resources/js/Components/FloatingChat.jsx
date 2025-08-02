import React, { useState } from 'react';
// Remove or keep this based on your setup
// import { X } from 'lucide-react';
import ChatApp from '@/Pages/ChatApp';
import { FaWhatsapp, FaComments } from "react-icons/fa";

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
  

      <div className="fixed bottom-6 right-6">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 bg-[#f5d6ca] text-[#2f362b] px-6 py-3 rounded-full shadow-md hover:bg-[#f3cbbc] transition">
          <FaComments className="text-xl" />
          Let's Chat!
        </button>
      </div>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 max-h-[90vh] bg-white shadow-2xl border border-gray-200 rounded-xl z-50 flex flex-col animate-fadeIn">
          {/* Header */}
          <div className="bg-[#2c2b2a] text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold text-lg">Chat Assistant</span>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-700 p-1 rounded transition"
            >
              {/* Replace with Lucide X if installed */}
              ✕
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            <ChatApp />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChat;
