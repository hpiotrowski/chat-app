'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { io } from "socket.io-client";
import { useAuth0 } from "@auth0/auth0-react";

let socket = null;

const ChatContext = createContext({});

export function ChatProvider({ children }) {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  console.log('ChatProvider rendering');
  const [rooms] = useState([
    { id: 1, name: 'General' },
    { id: 2, name: 'Random' },
    { id: 3, name: 'Tech' },
  ]);

  const [messages, setMessages] = useState({});
  const [currentRoom, setCurrentRoom] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectSocket = async () => {
      if (!isAuthenticated) return;

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "http://localhost:4000/api"
          }
        });

        socket = io("http://localhost:4000", {
          auth: { token }
        });

        socket.on('connect', () => {
          console.log('Connected to socket');
          setConnected(true);
        });

        socket.on('disconnect', () => {
          setConnected(false);
        });

        socket.on('receive-message', (data) => {
          console.log('Received message:', data);
          if (data.roomId && data.message) {
            setMessages(prev => {
              const newMessages = {
                ...prev,
                [data.roomId]: [...(prev[data.roomId] || []), data.message]
              };
              localStorage.setItem('chat_messages', JSON.stringify(newMessages));
              return newMessages;
            });
          }
        });

      } catch (error) {
        console.error('Socket connection error:', error);
      }
    };

    connectSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  const sendMessage = (roomId, content) => {
    if (!socket?.connected || !content.trim()) return;
    socket.emit('send-message', roomId, content);
  };

  const joinRoom = (roomId) => {
    if (!socket?.connected) return;
    socket.emit('join-room', roomId);
  };

  const getRoomMessages = (roomId) => {
    return messages[roomId] || [];
  };

  return (
    <ChatContext.Provider value={{
      rooms,
      currentRoom,
      setCurrentRoom,
      sendMessage,
      joinRoom,
      getRoomMessages,
      connected
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);