import { animate, motion, useMotionValue, useScroll, useTransform } from 'framer-motion';
import React, { useEffect } from 'react';

const DEFAULT_RANGE = [0, 1000];

const ParallaxLayer = ({
  src,
  speed = 0.1,
  className = '',
  alt = '',
  style = {},
  height,
  entryOffset = 0,
  entryOffsetX = 0,
  entryDelay = 0,
  entryDuration = 1.2,
  value,
  range = DEFAULT_RANGE,
  active = true,
}) => {
  const { scrollY } = useScroll();
  const motionSource = value ?? scrollY;
  const [, maxInput] = range;

  const parallaxY = useTransform(motionSource, range, [0, maxInput * speed]);
  const introY = useMotionValue(entryOffset);
  const introX = useMotionValue(entryOffsetX);
  const combinedY = useTransform([parallaxY, introY], ([parallax, intro]) => parallax + intro);

  useEffect(() => {
    if (!active) return;
    
    introY.set(entryOffset);
    introX.set(entryOffsetX);
    const controlsY = animate(introY, 0, {
      duration: entryDuration,
      delay: entryDelay,
      ease: 'easeOut',
    });
    const controlsX = animate(introX, 0, {
      duration: entryDuration,
      delay: entryDelay,
      ease: 'easeOut',
    });
    return () => {
      controlsY.stop();
      controlsX.stop();
    };
  }, [active, entryDelay, entryDuration, entryOffset, entryOffsetX, introY, introX]);

  const needsCentering = className.includes('left-1/2');
  const combinedX = needsCentering ? '-50%' : introX;

  return (
    <motion.img
      src={src}
      alt={alt}
      style={{ 
        y: combinedY, 
        x: combinedX, 
        ...(height ? { height } : {}), 
        ...style 
      }}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: entryDuration, delay: entryDelay, ease: 'easeOut' }}
      className={`absolute pointer-events-none ${className}`}
      loading="lazy"
    />
  );
};

export default ParallaxLayer;
