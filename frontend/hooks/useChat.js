'use client';

import { useState, useEffect } from 'react';

export function useChat() {
  const [rooms] = useState([
    { id: 1, name: 'General' },
    { id: 2, name: 'Random' },
    { id: 3, name: 'Tech' },
  ]);

  const [messages, setMessages] = useState({});
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const addMessage = (roomId, message) => {
    const newMessages = {
      ...messages,
      [roomId]: [...(messages[roomId] || []), {
        id: Date.now(),
        content: message,
        timestamp: new Date().toISOString(),
      }]
    };
    
    setMessages(newMessages);
    localStorage.setItem('chat_messages', JSON.stringify(newMessages));
  };

  const getRoomMessages = (roomId) => {
    return messages[roomId] || [];
  };

  return {
    rooms,
    currentRoom,
    setCurrentRoom,
    addMessage,
    getRoomMessages,
  };
}
