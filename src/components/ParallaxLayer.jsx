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
  active = true,
  containerRef,
}) => {
  const introY = useMotionValue(entryOffset);
  const introX = useMotionValue(entryOffsetX);
  
  // Use window scroll for parallax effect when section is in view
  // Track when the section enters and leaves the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });
  
  // Transform scroll progress to parallax movement
  // Background moves slower than scroll (typical parallax effect)
  // Use a small multiplier so parallax is subtle
  const parallaxOffset = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const combinedY = useTransform([parallaxOffset, introY], ([parallax, intro]) => {
    if (!active) return intro; // Only apply parallax when active
    return parallax + intro;
  });

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

  // Use min-height to allow content to expand, but maintain aspect ratio
  const heightValue = height || style.height || style.minHeight;
  const finalStyle = {
    y: combinedY,
    x: combinedX,
    ...style,
    ...(heightValue ? { minHeight: heightValue === '100vh' ? '100dvh' : heightValue } : {}),
  };

  return (
    <motion.img
      src={src}
      alt={alt}
      style={finalStyle}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: entryDuration, delay: entryDelay, ease: 'easeOut' }}
      className={`absolute pointer-events-none ${className}`}
      loading="lazy"
    />
  );
};

export default ParallaxLayer;
