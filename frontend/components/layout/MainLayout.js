'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileSidebar } from './MobileSidebar';
import { motion } from 'framer-motion';

export function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Desktop Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="hidden md:flex w-80 flex-col fixed inset-y-0"
      >
        <div className="bg-background/80 backdrop-blur-sm h-full border-r">
          <Sidebar />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="md:pl-80 flex flex-col flex-1">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Header />
        </motion.div>

        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-hidden relative"
        >
          <div className="absolute inset-0">
            {children}
          </div>
        </motion.main>
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar />

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  );
}