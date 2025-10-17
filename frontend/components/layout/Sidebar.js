'use client';

import { Separator } from "@/components/ui/separator";

export function Sidebar() {
  return (
    <div className="h-full border-r bg-background">
      <div className="flex flex-col h-full">
        <div className="h-14 flex items-center px-4">
          <h2 className="text-lg font-semibold">Rooms</h2>
        </div>
        <Separator />

        <div className="flex-1 overflow-y-auto p-3">
          <nav className="flex flex-col gap-y-2">
            {/* Room list będzie tutaj */}
          </nav>
        </div>

        <div className="p-4 border-t">
          {/* User profile */}
        </div>
      </div>
    </div>
  );
}
