'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileSidebar } from './MobileSidebar';

export function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <Sidebar />
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>

      <MobileSidebar />
    </div>
  );
}
