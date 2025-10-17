'use client';

import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "@/components/LoginButton";
import { MainLayout } from "@/components/layout/MainLayout";
import { MessageList } from "@/components/chat/MessageList";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";

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
    return <LoginButton />;
  }

  return (
    <MainLayout>
      <div className="h-[calc(100vh-4rem)] flex flex-col">
        <MessageList />
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 rounded-md border bg-background px-3 py-2"
              disabled={!currentRoom}
            />
            <Button type="submit" disabled={!currentRoom}>Send</Button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}