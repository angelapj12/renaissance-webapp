import React, { useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';

const layers = [
  {
    src: '/img/parallax/1.1.png',
    speed: 0.02,
    className: 'top-0 left-0 h-full w-full object-cover',
    style: { top: 0, minHeight: '100dvh' },
    entryOffset: -240,
    entryDelay: 0,
  },
];

const chapterLabels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'];

const IntroParallax = ({ onPrimaryAction, isActive = true }) => {
  const containerRef = useRef(null);

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
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#fefcf3] text-white overflow-x-hidden"
      style={{
        width: '100%',
        minHeight: '100dvh',
        maxWidth: '100%',
        position: 'relative',
      }}
    >
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
          active={isActive}
          containerRef={containerRef}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" aria-hidden="true" style={{ minHeight: '100dvh' }} />

      <div className="relative z-30 w-full px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12 md:px-6 md:pt-12 md:pb-16" style={{ paddingTop: 'calc(2rem + env(safe-area-inset-top, 0px))', paddingBottom: 'calc(3rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="mx-auto w-full max-w-3xl space-y-6 pt-16 pb-8 sm:pt-20 sm:pb-12 md:pt-24 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
            className="space-y-2 rounded-2xl bg-black/25 p-4 shadow-lg backdrop-blur-sm sm:space-y-3 sm:rounded-3xl sm:p-5 md:space-y-4 md:p-6 lg:space-y-5 lg:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-sm md:text-base leading-tight">✨ Welcome to the Renaissance</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
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
              className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md transition hover:bg-white/25 sm:px-5 sm:py-3.5 sm:text-sm md:px-6 md:py-4 md:text-base"
            >
              🎇 Start the Magic →
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default IntroParallax;
