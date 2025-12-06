'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  direction = 'up',
  className = ''
}: AnimatedSectionProps) {
  const directions = {
    up: { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } }
  };

  return (
    <motion.div
      className={className}
      initial={directions[direction].initial}
      whileInView={directions[direction].animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}
