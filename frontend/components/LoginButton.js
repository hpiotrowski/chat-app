'use client';

import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <motion.button
      onClick={() => loginWithRedirect()}
      className="inline-flex h-12 items-center justify-center rounded-xl px-8 text-base font-medium transition-all
        bg-[#FFB800] hover:bg-[#FFB800]/90 text-black shadow-lg shadow-[#FFB800]/20 
        hover:shadow-xl hover:shadow-[#FFB800]/30 hover:scale-105
        border-2 border-[#FFB800] relative group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="relative z-10">Get Started</span>
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFB800] to-[#FFB800]/80 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
    </motion.button>
  );
}