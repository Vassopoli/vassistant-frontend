"use client";

import React, { useState } from 'react';

interface Message {
  username: string;
  text: string;
}

interface ChatProps {
  user: any;
  initialData: any;
}

const Chat = ({ user, initialData }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>(initialData ? [{ username: initialData.username, text: initialData.content }] : []);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { username: user.username, text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4">
            <span className="font-bold">{msg.username}: </span>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-r-md"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
