import React, { useCallback, useEffect, useRef } from 'react';
import { animate, useMotionValue, useScroll, useSpring } from 'framer-motion';
import ParallaxLayer from './ParallaxLayer';
import StatusBar from './StatusBar';
import { ArrowDownRight, ArrowLeft } from 'lucide-react';

const imageLayers = [
  {
    src: '/img/parallax/2.1.png',
    speed: 0.02,
    className: 'top-0 left-0 w-full object-cover',
    style: { top: 0, height: '100vh' },
    entryOffset: -240,
    entryDelay: 0,
  },
  {
    src: '/img/parallax/2.2.png',
    speed: 0.06,
    className: 'bottom-0 left-1/2 object-contain',
    style: { bottom: 0, height: 'auto', width: 'auto', maxHeight: '70vh', maxWidth: '100vw' },
    entryOffset: 320,
    entryDelay: 0.18,
  },
  {
    src: '/img/parallax/2.3.png',
    speed: 0.12,
    className: 'bottom-0 right-0 w-auto max-w-none object-contain',
    style: { bottom: '4vh', right: '6vw', height: '44vh' },
    entryOffset: -280,
    entryDelay: 0.3,
  },
];

const chapterLabels = ['Intro', 'Chapter 1', 'Chapter 2', 'Chapter 3', 'Chapter 4', 'Chapter 5', 'Chapter 6', 'Chapter 7'];
const PARALLAX_RANGE = [0, 1200];
const MIN_SCROLL = PARALLAX_RANGE[0];
const MAX_SCROLL = PARALLAX_RANGE[1];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const ChapterFive = ({ onBack, onNext, isActive = true }) => {
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
      className="relative w-full h-full overflow-hidden bg-[#fefcf3] text-slate-900"
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <StatusBar labels={chapterLabels} currentIndex={5} />

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
          value={parallaxValue}
          range={PARALLAX_RANGE}
          active={isActive}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" aria-hidden="true" />

      <div className="absolute inset-0 z-30 flex flex-col justify-between px-4 pt-8 pb-10 sm:px-6 sm:pt-10 sm:pb-12 md:px-6 md:pt-12 md:pb-16" style={{ paddingTop: 'calc(2rem + env(safe-area-inset-top, 0px))', paddingBottom: 'calc(3rem + env(safe-area-inset-bottom, 0px))' }}>
        <div className="flex-1 flex items-center justify-center overflow-hidden min-h-0">
          <div className="w-full max-w-3xl space-y-2 rounded-2xl bg-black/25 p-4 shadow-lg backdrop-blur-sm sm:space-y-3 sm:rounded-3xl sm:p-5 md:space-y-4 md:p-6 lg:space-y-5 lg:p-8">
            <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl lg:text-6xl leading-tight">
              Does This Sound Like You?
            </h1>
            <p className="text-sm font-medium text-white/90 sm:text-base md:text-lg leading-snug">
              We're looking for passionate instructors who believe learning should be alive.
            </p>
            <p className="text-xs leading-relaxed text-white/85 sm:text-sm md:text-base">
              You might be perfect for Renaissance if you:
            </p>
            <ul className="space-y-1 pl-4 text-xs leading-relaxed text-white/85 marker:text-white/60 sm:space-y-1.5 sm:pl-5 sm:text-sm md:text-base">
              <li className="list-disc">Love teaching and want to keep it exciting</li>
              <li className="list-disc">Care deeply about your students' growth</li>
              <li className="list-disc">Have creative ideas and want to bring them to life</li>
              <li className="list-disc">Believe teaching is an experience — not a job</li>
              <li className="list-disc">Want to grow your personal brand while doing what you love</li>
            </ul>
            <p className="text-xs leading-relaxed text-white/80 sm:text-sm md:text-base">
              If you're ready to create classes that students remember for life, we'd love to meet you.
            </p>
          </div>
        </div>

        <div className="flex-shrink-0 px-4 sm:px-6 md:px-8">
          <div className="mx-auto w-full max-w-4xl text-white/80">
            <button
              type="button"
              onClick={handleCtaClick}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-black/40 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md transition hover:bg-black/55 sm:gap-2.5 sm:px-5 sm:py-3.5 sm:text-sm md:px-6 md:py-4 md:text-base"
              aria-label="Could this be me"
            >
              could this be me?
              <ArrowDownRight className="size-4 transition-transform group-hover:translate-y-1 group-hover:translate-x-1 sm:size-5 md:size-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterFive;

