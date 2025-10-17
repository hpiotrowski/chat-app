'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth0 } from "@auth0/auth0-react";
import ThemeToggle from "../ThemeToggle";

export function Header() {
  const { user } = useAuth0();

  return (
    <header className="border-b h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-x-4">
        <h1 className="text-xl font-semibold">Chat App</h1>
      </div>

      <div className="flex items-center gap-x-4">
        <ThemeToggle />
        <Avatar>
          <AvatarImage src={user?.picture} />
          <AvatarFallback>{user?.name?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
