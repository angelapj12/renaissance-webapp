import React, { useCallback } from 'react';
import { motion, useScroll } from 'framer-motion';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';

const layers = [
  {
    src: '/img/parallax/1.1.png',
    speed: 0.02,
    className: 'top-0 left-0 h-full w-full object-cover',
    entryOffset: -240,
    entryDelay: 0,
  },
];

const chapterLabels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'];

const IntroParallax = ({ onPrimaryAction }) => {
  useScroll();

  const handlePrimaryClick = useCallback(() => {
    if (typeof onPrimaryAction === 'function') {
      onPrimaryAction();
      return;
    }

    const nextChapter = document.querySelector('[data-chapter-index="1"]');
    if (nextChapter instanceof HTMLElement) {
      nextChapter.scrollIntoView({ behavior: 'smooth' });
    }
  }, [onPrimaryAction]);

  return (
    <section className="relative w-full overflow-hidden bg-[#fefcf3] text-white h-screen-safe">
      <StatusBar labels={chapterLabels} currentIndex={0} />

      {layers.map((layer) => (
        <ParallaxLayer
          key={layer.src}
          src={layer.src}
          speed={layer.speed}
          className={layer.className}
          style={layer.style}
          entryOffset={layer.entryOffset}
          entryDelay={layer.entryDelay}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" aria-hidden="true" />

      <div className="relative z-30 flex h-full w-full items-center justify-center px-4 pt-20 pb-20 sm:px-6 sm:pt-24 sm:pb-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
          className="w-full max-w-3xl space-y-3 rounded-2xl bg-black/25 p-4 shadow-lg backdrop-blur-sm sm:space-y-5 sm:rounded-3xl sm:p-6 md:p-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-xs">✨ Welcome to the Renaissance</p>
          <h1 className="text-xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-5xl lg:text-7xl">
            A new era of learning and teaching — where creativity meets technology,
            and passion turns into impact.
          </h1>
          <p className="text-xs leading-relaxed text-white/85 sm:text-sm md:text-base">
            This isn't another education platform. This is a movement — a place where teaching feels alive again. Where
            instructors don't just teach, they create experiences. And where every class becomes a spark that inspires
            growth — for both students and teachers alike.
          </p>

          <motion.button
            type="button"
            onClick={handlePrimaryClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md transition hover:bg-white/25 sm:px-6 sm:py-3 sm:text-sm"
          >
            🎇 Start the Magic →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroParallax;
