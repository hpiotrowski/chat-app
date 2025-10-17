'use client';

import { useChat } from "@/contexts/ChatContext";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";
import { cn } from "@/lib/utils";

export function MessageList() {
  const { currentRoom, getRoomMessages } = useChat();
  const { user } = useAuth0();
  const messages = currentRoom ? getRoomMessages(currentRoom.id) : [];

  if (!currentRoom) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <h3 className="text-lg font-medium">Welcome to Chat</h3>
          <p className="text-sm">Select a room to start chatting</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm p-2 -mx-2 mb-4">
          <h2 className="text-lg font-semibold">#{currentRoom.name}</h2>
        </div>

        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isMyMessage = message.userId === user?.sub;
              
              return (
                <div 
                  key={message.id} 
                  className={cn(
                    "flex flex-col max-w-[80%] space-y-2",
                    isMyMessage ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className="flex items-center gap-x-2 text-sm">
                    <span className="font-medium">{message.userName}</span>
                    <span className="text-muted-foreground">
                      {format(new Date(message.timestamp), 'HH:mm')}
                    </span>
                  </div>
                  
                  <div className={cn(
                    "rounded-lg px-4 py-2",
                    isMyMessage 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted"
                  )}>
                    {message.content}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}