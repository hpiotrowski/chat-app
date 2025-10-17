'use client';

import { motion } from "framer-motion";
import LoginButton from "./LoginButton";

export function HeroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
         
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Connect & Chat in Real-Time
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Join our modern chat platform with instant messaging, real-time updates, and a seamless user experience.
            </p>
            <div className="space-y-6 sm:space-y-0 sm:space-x-6 sm:flex items-center mt-8">
              <LoginButton />
              <button className="inline-flex h-12 items-center justify-center rounded-xl px-8 text-base font-medium 
                bg-black/20 hover:bg-black/40 text-[#FFB800] border border-[#FFB800]/20 
                transition-all hover:border-[#FFB800]/40 hover:shadow-lg hover:shadow-[#FFB800]/5">
                Learn More
              </button>
            </div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                title: "Real-time Chat",
                description: "Instant messaging with live updates",
                icon: "⚡"
              },
              {
                title: "Multiple Rooms",
                description: "Join different chat rooms",
                icon: "🚪"
              },
              {
                title: "Secure",
                description: "End-to-end encryption for privacy",
                icon: "🔒"
              },
              {
                title: "Modern UI",
                description: "Clean and intuitive interface",
                icon: "✨"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="relative group overflow-hidden rounded-lg border bg-background p-4"
              >
                <div className="space-y-2">
                  <div className="text-2xl">{feature.icon}</div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
