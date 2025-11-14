/**
 * iOS Safari viewport height fix
 * Handles the dynamic viewport height when address bar shows/hides
 * Uses Visual Viewport API when available (most accurate for iOS)
 */

export const setViewportHeight = () => {
  // Use Visual Viewport API if available (more accurate for iOS Safari)
  const vh = window.visualViewport 
    ? window.visualViewport.height * 0.01
    : window.innerHeight * 0.01;
  
  const actualHeight = window.visualViewport 
    ? window.visualViewport.height 
    : window.innerHeight;
  
  // Set CSS custom property
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  document.documentElement.style.setProperty('--actual-vh', `${actualHeight}px`);
  
  // Set directly on html/body/root for all devices (especially important for iOS)
  // This ensures the height is set correctly even if CSS hasn't loaded
  document.documentElement.style.setProperty('height', `${actualHeight}px`, 'important');
  document.documentElement.style.setProperty('min-height', `${actualHeight}px`, 'important');
  document.documentElement.style.setProperty('max-height', `${actualHeight}px`, 'important');
  
  document.body.style.setProperty('height', `${actualHeight}px`, 'important');
  document.body.style.setProperty('min-height', `${actualHeight}px`, 'important');
  document.body.style.setProperty('max-height', `${actualHeight}px`, 'important');
  
  const root = document.getElementById('root');
  if (root) {
    root.style.setProperty('height', `${actualHeight}px`, 'important');
    root.style.setProperty('min-height', `${actualHeight}px`, 'important');
    root.style.setProperty('max-height', `${actualHeight}px`, 'important');
  }
  
  // Also set on main element if it exists
  const main = document.querySelector('main.h-screen-safe');
  if (main) {
    main.style.setProperty('height', `${actualHeight}px`, 'important');
    main.style.setProperty('min-height', `${actualHeight}px`, 'important');
    main.style.setProperty('max-height', `${actualHeight}px`, 'important');
  }
  
  // Set on all section elements
  const sections = document.querySelectorAll('section[data-chapter-index]');
  sections.forEach((section) => {
    section.style.setProperty('height', `${actualHeight}px`, 'important');
    section.style.setProperty('min-height', `${actualHeight}px`, 'important');
    section.style.setProperty('max-height', `${actualHeight}px`, 'important');
  });
};

// Store handlers to prevent duplicate listeners
let handlers = null;
let isInitialized = false;

export const initViewportFix = () => {
  // Prevent duplicate initialization
  if (isInitialized) {
    setViewportHeight();
    return;
  }
  
  isInitialized = true;
  
  // Set initial height
  setViewportHeight();
  
  // Wait for DOM to be ready and set again
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setViewportHeight();
    });
  }
  
  // Handle resize events (iOS Safari address bar show/hide)
  let resizeTimer;
  const handleResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setViewportHeight();
    }, 50);
  };
  
  // Handle orientation change
  const handleOrientationChange = () => {
    // iOS needs more time after orientation change
    setTimeout(() => {
      setViewportHeight();
    }, 500);
  };
  
  // Handle visual viewport changes (most accurate for iOS)
  const handleVisualViewportResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setViewportHeight();
    }, 50);
  };
  
  const handleVisualViewportScroll = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setViewportHeight();
    }, 50);
  };
  
  // Also handle scroll events (iOS Safari address bar)
  let scrollTimer;
  const handleScroll = () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      setViewportHeight();
    }, 100);
  };
  
  // Store handlers for cleanup
  handlers = {
    handleResize,
    handleOrientationChange,
    handleVisualViewportResize,
    handleVisualViewportScroll,
    handleScroll,
  };
  
  // Add event listeners
  window.addEventListener('resize', handleResize, { passive: true });
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Use Visual Viewport API if available (most accurate for iOS)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleVisualViewportResize, { passive: true });
    window.visualViewport.addEventListener('scroll', handleVisualViewportScroll, { passive: true });
  }
  
  // Also set height after React renders (with delay)
  setTimeout(() => {
    setViewportHeight();
  }, 300);
  
  setTimeout(() => {
    setViewportHeight();
  }, 1000);
};

