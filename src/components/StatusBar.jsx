import React from 'react';
import { motion } from 'framer-motion';

const StatusBar = ({
  labels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'],
  currentIndex = 1,
}) => {
  const total = labels.length;
  const clampedIndex = Math.min(Math.max(currentIndex, 0), total - 1);
  const progress = ((clampedIndex + 1) / total) * 100;

  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-5 pt-6 sm:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60 sm:text-xs">
          <span>{labels[clampedIndex]}</span>
        </div>
        <div className="relative mt-3 h-1 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-white/80 via-white to-amber-200"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          />
        </div>
      </div>
    </header>
  );
};

export default StatusBar;
