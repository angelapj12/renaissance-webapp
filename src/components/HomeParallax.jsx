import React, { useCallback, useRef } from 'react';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';

const imageLayers = [
  {
    src: '/img/parallax/8.1.png',
    speed: 0.02,
    className: 'top-0 left-0 w-full object-cover',
    style: { top: 0, minHeight: '100dvh' },
    entryOffset: -240,
    entryDelay: 0,
  },
];

const chapterLabels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'];

const HomeParallax = ({ onBack, onNext, isActive = true }) => {
  const containerRef = useRef(null);

  const handleCtaClick = useCallback(() => {
    if (typeof onNext === 'function') {
      onNext();
      return;
    }

    const nextSection = document.querySelector('[data-next-chapter]');
    if (nextSection instanceof HTMLElement) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
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
      <StatusBar labels={chapterLabels} currentIndex={1} />

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
          <div className="space-y-5 rounded-2xl bg-black/25 p-5 shadow-lg backdrop-blur-sm sm:space-y-6 sm:rounded-3xl sm:p-6 md:space-y-7 md:p-8 lg:space-y-8 lg:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              Welcome to the Renaissance
            </h1>
            <p className="text-base font-medium text-white/90 sm:text-lg md:text-xl leading-snug pt-1">
              Because when teaching is fun, learning becomes unforgettable.
            </p>
            <div className="space-y-4 pt-2">
              <p className="text-sm leading-relaxed text-white/85 sm:text-base md:text-lg">
                You didn't choose to teach for routine. You chose it to inspire, connect, and share your craft with passion.
                At Renaissance, we believe teaching should spark joy — not burnout.
              </p>
              <p className="text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
                We're building a new kind of platform where instructors feel energized, creative, and fully supported to do
                what they love: create meaningful learning experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 md:px-8">
          <button
            type="button"
            onClick={handleCtaClick}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition hover:bg-black/55 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-sm md:px-6 md:py-4 md:text-base"
            aria-label="Show me how"
          >
            show me how
            <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1 sm:size-5 md:size-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeParallax;
