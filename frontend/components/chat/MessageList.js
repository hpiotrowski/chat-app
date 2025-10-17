'use client';

import { useChat } from "@/contexts/ChatContext";
import { format } from "date-fns";
import { useAuth0 } from "@auth0/auth0-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function MessageList() {
  const { currentRoom, getRoomMessages } = useChat();
  const { user } = useAuth0();
  const messages = currentRoom ? getRoomMessages(currentRoom.id) : [];

  if (!currentRoom) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="w-24 h-24 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-4xl">💭</span>
          </div>
          <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Select a Room
          </h3>
          <p className="text-muted-foreground">
            Choose a room to start chatting
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm p-2 -mx-2 mb-4">
          <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            #{currentRoom.name}
          </h2>
        </div>

        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-8"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-muted-foreground">
                Start the conversation!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, i) => {
                const isMyMessage = message.userId === user?.sub;
                
                return (
                  <motion.div 
                    key={message.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={cn(
                      "flex flex-col max-w-[80%] space-y-2",
                      isMyMessage ? "ml-auto items-end" : "items-start"
                    )}
                  >
                    <div className="flex items-center gap-x-2 text-sm">
                      <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                        {message.userName}
                      </span>
                      <span className="text-muted-foreground">
                        {format(new Date(message.timestamp), 'HH:mm')}
                      </span>
                    </div>
                    
                    <div className={cn(
                      "rounded-lg px-4 py-2 relative group transition-all duration-200",
                      isMyMessage 
                        ? "bg-primary/10 hover:bg-primary/20" 
                        : "bg-muted hover:bg-muted/80"
                    )}>
                      <div className="relative z-10">
                        {message.content}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}