import React, { useCallback, useEffect, useRef } from 'react';
import { animate, useMotionValue, useScroll, useSpring } from 'framer-motion';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';

const imageLayers = [
  {
    src: '/img/parallax/6.1.png',
    speed: 0.02,
    className: 'top-0 left-0 w-full object-cover',
    style: { top: 0, height: '100vh' },
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
const PARALLAX_RANGE = [0, 1200];
const MIN_SCROLL = PARALLAX_RANGE[0];
const MAX_SCROLL = PARALLAX_RANGE[1];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ChapterThree = ({ onBack, onNext, isActive = true }) => {
  const virtualScroll = useMotionValue(0);
  const parallaxValue = useSpring(virtualScroll, { stiffness: 80, damping: 24, mass: 0.6 });
  const { scrollY } = useScroll();
  const touchStartY = useRef(null);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      virtualScroll.set(0);
    }
  }, [isActive, virtualScroll]);

  useEffect(() => {
    const cancel = scrollY.on('change', (value) => {
      if (!isActive) return;
      virtualScroll.stop();
      virtualScroll.set(clamp(value, MIN_SCROLL, MAX_SCROLL));
    });
    return () => cancel();
  }, [isActive, scrollY, virtualScroll]);

  useEffect(() => {
    if (!isActive) {
      if (autoScrollRef.current) {
        autoScrollRef.current.stop();
      }
      return;
    }

    const timer = setTimeout(() => {
      autoScrollRef.current = animate(virtualScroll, MAX_SCROLL / 2, {
        duration: 12,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse',
      });
    }, 2000);
    return () => {
      clearTimeout(timer);
      if (autoScrollRef.current) {
        autoScrollRef.current.stop();
      }
    };
  }, [isActive, virtualScroll]);

  const updateVirtualScroll = useCallback(
    (delta) => {
      virtualScroll.stop();
      virtualScroll.set(clamp(virtualScroll.get() + delta, MIN_SCROLL, MAX_SCROLL));
    },
    [virtualScroll]
  );

  const handleWheel = useCallback(
    (event) => {
      if (!isActive) return;
      updateVirtualScroll(event.deltaY);
    },
    [isActive, updateVirtualScroll]
  );

  const handlePointerMove = useCallback(
    (event) => {
      if (!isActive || touchStartY.current === null) return;
      const delta = touchStartY.current - event.clientY;
      updateVirtualScroll(delta * 1.5);
      touchStartY.current = event.clientY;
    },
    [isActive, updateVirtualScroll]
  );

  const handlePointerDown = useCallback((event) => {
    touchStartY.current = event.clientY;
  }, []);

  const handlePointerUp = useCallback(() => {
    touchStartY.current = null;
  }, []);

  const handleTouchStart = useCallback((event) => {
    if (event.touches.length > 0) {
      touchStartY.current = event.touches[0].clientY;
    }
  }, []);

  const handleTouchMove = useCallback(
    (event) => {
      if (!isActive || touchStartY.current === null) return;
      const current = event.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - current;
      updateVirtualScroll(delta * 1.5);
      touchStartY.current = current;
    },
    [isActive, updateVirtualScroll]
  );

  const handleTouchEnd = useCallback(() => {
    touchStartY.current = null;
  }, []);

  const handleCtaClick = useCallback(() => {
    if (typeof onNext === 'function') {
      onNext();
      return;
    }
  }, [onNext]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#fefcf3] text-slate-900 h-screen-safe"
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
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
          value={parallaxValue}
          range={PARALLAX_RANGE}
          active={isActive}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" aria-hidden="true" />

      <div className="relative z-30 flex h-full w-full items-center justify-center px-4 pt-20 pb-20 sm:px-6 sm:pt-24 sm:pb-24 md:py-32">
        <div className="w-full max-w-3xl space-y-3 rounded-2xl bg-black/25 p-4 shadow-lg backdrop-blur-sm sm:space-y-5 sm:rounded-3xl sm:p-6 md:p-8">
          <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-4xl md:text-5xl lg:text-7xl">
            Where Creativity Meets Technology
          </h1>
          <p className="text-base font-medium text-white/90 sm:text-lg md:text-xl">
            We built the system that lets great teachers focus on what they do best.
          </p>
          <div className="space-y-2 text-xs leading-relaxed text-white/85 sm:space-y-3 sm:text-sm md:text-base">
            <p className="font-semibold text-white/95">Smart Tools, Simple Flow: We handle the tech so you can focus on teaching.</p>
            <p className="font-semibold text-white/95">Engaged Students: Every class feels alive — fun, interactive, and addictive.</p>
            <p className="font-semibold text-white/95">Your Brand, Amplified: We promote you — your style, your story, your impact.</p>
            <p className="font-semibold text-white/95">Built for Growth: From marketing to automation, everything works behind the scenes to help you scale effortlessly.</p>
          </div>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            We make teaching smoother, smarter, and more inspiring than ever.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            We take care of the tech, so you can take care of your students.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-40 px-4 pb-3 sm:px-6 sm:pb-6 md:pb-10 md:px-8">
        <div className="mx-auto w-full max-w-4xl text-white/80">
          <button
            type="button"
            onClick={handleCtaClick}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-md transition hover:bg-black/55 sm:gap-3 sm:px-6 sm:py-3 sm:text-xs md:px-8 md:py-4 md:text-sm"
            aria-label="But how do we make that happen"
          >
            but how do we make that happen
            <ArrowDownRight className="size-3.5 transition-transform group-hover:translate-y-1 group-hover:translate-x-1 sm:size-4 md:size-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChapterThree;

