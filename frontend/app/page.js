'use client';

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { MessageList } from "@/components/chat/MessageList";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";
import { HeroPage } from "@/components/HeroPage";
import { SendHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { isAuthenticated } = useAuth0();
  const { currentRoom, sendMessage } = useChat();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentRoom || !message.trim()) return;

    sendMessage(currentRoom.id, message);
    setMessage("");
  };

  if (!isAuthenticated) {
    return <HeroPage />;
  }

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <MessageList />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border-t border-[#FFB800]/20 bg-black/80 backdrop-blur-xl shadow-lg"
        >
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-4">
            <div className="flex gap-2 items-center bg-black rounded-xl p-3 focus-within:ring-2 ring-[#FFB800] border border-[#FFB800] shadow-sm">
              <input
                type="text"
                placeholder={currentRoom ? "Type a message..." : "Select a room to start chatting"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-transparent border-0 focus:outline-none placeholder:text-[#FFB800] text-[#FFB800] caret-[#FFB800] text-lg"
                disabled={!currentRoom}
              />
              <Button 
                type="submit" 
                size="sm"
                disabled={!currentRoom || !message.trim()}
                className="bg-[#FFB800] hover:bg-[#FFB800]/90 text-black font-medium shadow-[#FFB800]/20 shadow-lg"
              >
                <SendHorizontal className="w-4 h-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
}