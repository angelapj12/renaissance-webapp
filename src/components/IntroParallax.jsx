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
    <section className="relative h-screen overflow-hidden bg-[#fefcf3] text-white">
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

      <div className="relative z-30 flex h-full w-full items-start justify-center px-6 pt-14 pb-10 sm:pt-20 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
          className="w-full max-w-3xl space-y-6 rounded-3xl bg-black/25 p-6 shadow-lg backdrop-blur-sm sm:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-white/70 sm:text-xs">✨ Welcome to the Renaissance</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-7xl">
            A new era of learning and teaching — where creativity meets technology,
            and passion turns into impact.
          </h1>
          <p className="text-sm leading-relaxed text-white/85 sm:text-base">
            This isn’t another education platform. This is a movement — a place where teaching feels alive again. Where
            instructors don’t just teach, they create experiences. And where every class becomes a spark that inspires
            growth — for both students and teachers alike.
          </p>

          <motion.button
            type="button"
            onClick={handlePrimaryClick}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-lg backdrop-blur-md transition hover:bg-white/25 sm:text-base"
          >
            🎇 Start the Magic →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroParallax;
