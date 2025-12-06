// ChatApp.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Message from '../Components/Message';
import ChatInput from '@/Pages/ChatInput';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  // 1. Add state to track if the request is running
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (text) => {
    // Prevent sending if already running
    if (isLoading) return;

    const userMsg = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);

    // 2. Start "Running" state
    setIsLoading(true);

    try {
      const res = await axios.post('/api/chat', { message: text });
      const aiMsg = { role: 'assistant', content: res.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Optional: Add an error message to the chat
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }]);
    } finally {
      // 3. Stop "Running" state (runs whether successful or failed)
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      
      {/* Message List */}
      <div style={{ marginBottom: '20px', minHeight: '300px' }}>
        {messages.map((msg, idx) => (
          <Message key={idx} role={msg.role} content={msg.content} />
        ))}

        {/* 4. Simple "Running" Indicator Bubble */}
        {isLoading && (
          <div style={{ opacity: 0.7, padding: '10px' }}>
            <em>AI is typing...</em>
          </div>
        )}
      </div>

      {/* 5. Progress / Running Bar */}
      {isLoading && (
        <div style={{ width: '100%', height: '4px', backgroundColor: '#f0f0f0', marginBottom: '10px', overflow: 'hidden' }}>
          <div className="progress-bar" style={{
            height: '100%',
            backgroundColor: '#007bff',
            width: '50%',
            animation: 'running-progress 1s infinite linear'
          }}></div>
        </div>
      )}

      {/* 6. Pass disabled state to input so user can't spam clicks */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />

      {/* Simple CSS for the running animation */}
      <style>{`
        @keyframes running-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default ChatApp;