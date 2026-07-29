"use client";
import React from "react";
import { motion } from "framer-motion";

export const Reveal = ({ children, delay = 0, scale = false }: { children: React.ReactNode, delay?: number, scale?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: scale ? 0 : 30, scale: scale ? 0.95 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};
