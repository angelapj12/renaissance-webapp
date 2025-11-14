import React, { useCallback, useRef } from 'react';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';

const imageLayers = [
  {
    src: '/img/parallax/6.1.png',
    speed: 0.02,
    className: 'top-0 left-0 w-full object-cover',
    style: { top: 0, minHeight: '100dvh' },
    entryOffset: -240,
    entryDelay: 0,
  },
  {
    src: '/img/parallax/6.2.png',
    speed: 0.12,
    className: 'bottom-0 right-0 w-auto max-w-none object-contain',
    style: { bottom: '2vh', right: 0, height: 'auto', maxHeight: '50vh' },
    entryOffset: 0,
    entryOffsetX: 300,
    entryDelay: 0.2,
  },
];

const chapterLabels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'];

const ChapterThree = ({ onBack, onNext, isActive = true }) => {
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
      <StatusBar labels={chapterLabels} currentIndex={3} />

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
          entryOffsetX={layer.entryOffsetX}
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
              Where Creativity Meets Technology
            </h1>
            <p className="text-sm font-medium text-white/90 sm:text-base md:text-lg leading-snug">
              We built the system that lets great teachers focus on what they do best.
            </p>
            <div className="space-y-1.5 text-xs leading-relaxed text-white/85 sm:space-y-2 sm:text-sm md:text-base">
              <p className="font-semibold text-white/95">Smart Tools, Simple Flow: We handle the tech so you can focus on teaching.</p>
              <p className="font-semibold text-white/95">Engaged Students: Every class feels alive — fun, interactive, and addictive.</p>
              <p className="font-semibold text-white/95">Your Brand, Amplified: We promote you — your style, your story, your impact.</p>
              <p className="font-semibold text-white/95">Built for Growth: From marketing to automation, everything works behind the scenes to help you scale effortlessly.</p>
            </div>
            <p className="text-xs leading-relaxed text-white/80 sm:text-sm md:text-base">
              We make teaching smoother, smarter, and more inspiring than ever.
            </p>
            <p className="text-xs leading-relaxed text-white/80 sm:text-sm md:text-base">
              We take care of the tech, so you can take care of your students.
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={handleCtaClick}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition hover:bg-black/55 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-sm md:px-6 md:py-4 md:text-base"
            aria-label="But how do we make that happen"
          >
            but how do we make that happen
            <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1 sm:size-5 md:size-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChapterThree;
