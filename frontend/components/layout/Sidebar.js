'use client';

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { rooms, currentRoom, setCurrentRoom, joinRoom } = useChat();
  console.log('Sidebar rendering, rooms:', rooms);

  return (
    <div className="h-full border-r bg-background">
      <div className="flex flex-col h-full">
        <div className="h-14 flex items-center px-4">
          <h2 className="text-lg font-semibold">Rooms</h2>
        </div>
        <Separator />

        <div className="flex-1 overflow-y-auto p-3">
          <nav className="flex flex-col gap-y-1">
            {rooms?.map((room) => (
              <Button
                key={room.id}
                variant={currentRoom?.id === room.id ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  currentRoom?.id === room.id && "bg-muted"
                )}
                onClick={() => {
                  setCurrentRoom(room);
                  joinRoom(room.id);
                }}
              >
                # {room.name}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}