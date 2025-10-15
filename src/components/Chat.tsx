"use client";

import React, { useState } from 'react';

interface Message {
  username: string;
  content: string;
  role: 'user' | 'assistant';
}

interface ChatProps {
  user: any;
  initialData: any[]; // Expecting an array now
  authToken: string | null;
}

const Chat = ({ user, initialData, authToken }: ChatProps) => {
  const [messages, setMessages] = useState<Message[]>(
    initialData && Array.isArray(initialData)
      ? initialData.map((msg: any) => ({
          username: msg.username,
          content: msg.content,
          role: msg.role,
        }))
      : []
  );
  const [newMessage, setNewMessage] = useState('');
  const [sendError, setSendError] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !authToken) return;

    setSendError(null);
    const messageToSend = newMessage;
    const optimisticMessage: Message = { username: user.username, content: messageToSend, role: 'user' };

    setMessages(prevMessages => [...prevMessages, optimisticMessage]);
    setNewMessage('');

    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authToken,
        },
        body: JSON.stringify({ text: messageToSend }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${errorText}`);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      setSendError('Failed to send message. Please try again.');
      // Revert the optimistic update
      setMessages(prevMessages => prevMessages.filter(msg => msg !== optimisticMessage));
      setNewMessage(messageToSend); // Restore the input
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg px-4 py-2 max-w-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
              <p className="font-bold text-sm">{msg.username}</p>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t">
        {sendError && <p className="text-red-500 text-sm mb-2">{sendError}</p>}
        <div className="flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-md text-black"
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
