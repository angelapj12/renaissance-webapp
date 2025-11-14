import React, { useCallback, useEffect, useRef } from 'react';
import { animate, useMotionValue, useScroll, useSpring } from 'framer-motion';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';

const imageLayers = [
  {
    src: '/img/parallax/7.1.png',
    speed: 0.02,
    className: 'top-0 left-0 w-full object-cover',
    style: { top: 0, height: '100vh' },
    entryOffset: -240,
    entryDelay: 0,
  },
  {
    src: '/img/parallax/7.2.png',
    speed: 0.1,
    className: 'bottom-0 left-0 object-contain',
    style: { bottom: '2vh', left: 0, height: 'auto', maxHeight: '45vh' },
    entryOffset: 280,
    entryDelay: 0.25,
  },
];

const chapterLabels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'];
const PARALLAX_RANGE = [0, 1200];
const MIN_SCROLL = PARALLAX_RANGE[0];
const MAX_SCROLL = PARALLAX_RANGE[1];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ChapterFour = ({ onBack, onNext, isActive = true }) => {
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
      <StatusBar labels={chapterLabels} currentIndex={4} />

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
          key={`${layer.src}-${layer.speed}`}
          src={layer.src}
          speed={layer.speed}
          height={layer.height}
          className={layer.className}
          style={layer.style}
          entryOffset={layer.entryOffset}
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
            Focus on What You Love — We'll Handle the Rest
          </h1>
          <p className="text-base font-medium text-white/90 sm:text-lg md:text-xl">
            This isn't just a platform. It's your creative playground.
          </p>
          <p className="text-xs leading-relaxed text-white/85 sm:text-sm md:text-base">
            At Renaissance, teaching isn't another job — it's your art form.
          </p>
          <p className="text-sm leading-relaxed text-white/85 sm:text-base">
            We give you freedom, tools, and a creative community to turn your expertise into transformative experiences.
          </p>
          <p className="text-sm leading-relaxed text-white/85 sm:text-base">
            You design your classes, your way.
          </p>
          <p className="text-sm leading-relaxed text-white/85 sm:text-base">
            We handle the rest: marketing, tech, operations, and support.
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            The result?
          </p>
          <p className="text-sm leading-relaxed text-white/80 sm:text-base">
            Instructors who love teaching again — and students who can't wait for their next class.
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-40 px-4 pb-3 sm:px-6 sm:pb-6 md:pb-10 md:px-8">
        <div className="mx-auto w-full max-w-4xl text-white/80">
          <button
            type="button"
            onClick={handleCtaClick}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/80 backdrop-blur-md transition hover:bg-black/55 sm:gap-3 sm:px-6 sm:py-3 sm:text-xs md:px-8 md:py-4 md:text-sm"
            aria-label="What's it like teaching here"
          >
            what's it like teaching here?
            <ArrowDownRight className="size-3.5 transition-transform group-hover:translate-y-1 group-hover:translate-x-1 sm:size-4 md:size-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChapterFour;

