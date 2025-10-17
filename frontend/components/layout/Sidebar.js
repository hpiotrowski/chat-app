'use client';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Sidebar() {
  const { rooms, currentRoom, setCurrentRoom, joinRoom } = useChat();
  console.log('Sidebar rendering, rooms:', rooms);

  return (
    <div className="h-full flex flex-col">
      <div className="h-14 flex items-center px-4">
        <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Chat Rooms
        </h2>
      </div>
      <Separator className="opacity-50" />

      <div className="flex-1 overflow-y-auto p-3">
        <nav className="grid gap-1">
          {rooms?.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Button
                variant={currentRoom?.id === room.id ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start relative group",
                  currentRoom?.id === room.id && "bg-primary/10"
                )}
                onClick={() => {
                  setCurrentRoom(room);
                  joinRoom(room.id);
                }}
              >
                <span className="relative z-10">
                  # {room.name}
                </span>
                {currentRoom?.id === room.id && (
                  <motion.div
                    layoutId="activeRoom"
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-md"
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </nav>
      </div>

      <div className="p-4 mt-auto">
        <div className="rounded-lg bg-primary/5 p-4">
          <p className="text-sm text-primary/80">
            Connected and ready to chat
          </p>
        </div>
      </div>
    </div>
  );
}