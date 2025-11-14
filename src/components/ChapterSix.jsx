import React, { useCallback, useRef } from 'react';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';

const imageLayers = [
  {
    src: '/img/parallax/10.1.png',
    speed: 0.02,
    className: 'top-0 left-0 w-full object-cover',
    style: { top: 0, minHeight: '100dvh' },
    entryOffset: -240,
    entryDelay: 0,
  },
];

const chapterLabels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'];

const ChapterSix = ({ onBack, onNext, isActive = true }) => {
  const containerRef = useRef(null);

  const handleCtaClick = useCallback(() => {
    if (typeof onNext === 'function') {
      onNext();
      return;
    }
  }, [onNext]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#fefcf3] text-slate-900 overflow-x-hidden"
      style={{
        width: '100%',
        minHeight: '100dvh',
        maxWidth: '100%',
        position: 'relative',
      }}
    >
      <StatusBar labels={chapterLabels} currentIndex={6} />

      {typeof onBack === 'function' && (
        <button
          type="button"
          onClick={onBack}
          className="absolute top-4 left-4 z-50 inline-flex items-center justify-center text-white/80 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label="Go back"
        >
          <ArrowLeft className="size-4 transition-transform hover:-translate-x-1 sm:size-6" />
        </button>
      )}

      {imageLayers.map((layer) => (
        <ParallaxLayer
          key={layer.src}
          src={layer.src}
          speed={layer.speed}
          height={layer.height}
          className={layer.className}
          style={layer.style}
          entryOffset={layer.entryOffset}
          entryDelay={layer.entryDelay}
          active={isActive}
          containerRef={containerRef}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" aria-hidden="true" style={{ minHeight: '100dvh' }} />

      <div className="relative z-30 w-full px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12 md:px-6 md:pt-12 md:pb-16" style={{ paddingTop: 'calc(2rem + env(safe-area-inset-top, 0px))', paddingBottom: 'calc(3rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="mx-auto w-full max-w-3xl space-y-6 pt-16 pb-8 sm:pt-20 sm:pb-12 md:pt-24 md:pb-16">
          <div className="space-y-2 rounded-2xl bg-black/25 p-4 shadow-lg backdrop-blur-sm sm:space-y-3 sm:rounded-3xl sm:p-5 md:space-y-4 md:p-6 lg:space-y-5 lg:p-8">
            <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
              Be Part of the Renaissance
            </h1>
            <p className="text-sm font-medium text-white/90 sm:text-base md:text-lg leading-snug">
              Let's reinvent what it means to teach — together.
            </p>
            <p className="text-xs leading-relaxed text-white/85 sm:text-sm md:text-base">
              We're inviting instructors from every discipline — from performance arts to design, movement, music, and more.
            </p>
            <p className="text-xs leading-relaxed text-white/85 sm:text-sm md:text-base">
              If you believe that teaching can be joyful, dynamic, and full of possibility, you belong here.
            </p>
            <p className="text-xs leading-relaxed text-white/80 sm:text-sm md:text-base">
              Apply now — or just say hello. Let's explore what we can create together.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={handleCtaClick}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition hover:bg-black/55 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-sm md:px-6 md:py-4 md:text-base"
            aria-label="Join the movement"
          >
            join the movement
            <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1 sm:size-5 md:size-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChapterSix;
