import React, { useCallback, useEffect, useMemo, useState } from 'react';
import IntroParallax from '../components/IntroParallax';
import HomeParallax from '../components/HomeParallax';
import ChapterTwo from '../components/ChapterTwo';
import ChapterThree from '../components/ChapterThree';
import ChapterFour from '../components/ChapterFour';
import ChapterFive from '../components/ChapterFive';
import ChapterSix from '../components/ChapterSix';
import ApplicationForm from '../components/ApplicationForm';
import { setViewportHeight } from '../utils/viewportFix';

const sections = [IntroParallax, HomeParallax, ChapterTwo, ChapterThree, ChapterFour, ChapterFive, ChapterSix, ApplicationForm];

const StoryApp = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [formStep, setFormStep] = useState(1);
  const totalFormSteps = 8;

  const goToChapter = useCallback((index) => {
    const clamped = Math.max(0, Math.min(index, sections.length - 1));

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    requestAnimationFrame(() => {
      setCurrentIndex(clamped);
      if (clamped !== sections.length - 1) {
        setFormStep(1); // Reset form step when leaving form
      }
    });
  }, []);

  const handleFormNext = useCallback(() => {
    if (formStep < totalFormSteps) {
      setFormStep((prev) => prev + 1);
    }
  }, [formStep, totalFormSteps]);

  const handleFormBack = useCallback(() => {
    if (formStep > 1) {
      setFormStep((prev) => prev - 1);
    } else {
      goToChapter(sections.length - 2); // Go back to Chapter 6
    }
  }, [formStep, goToChapter]);

  // Ensure viewport height is set correctly after render
  useEffect(() => {
    setViewportHeight();
    const timer = setTimeout(() => {
      setViewportHeight();
    }, 100);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const renderedSections = useMemo(() => {
    return sections.map((Component, index) => {
      const isActive = index === currentIndex;
      const isFormPage = index === sections.length - 1;
      
      // For inactive sections, use absolute positioning with visibility hidden to remove from flow
      // For active sections, use relative positioning to allow natural flow and scrolling
      // Form page should fill exactly 100dvh, other pages can expand when content overflows
      const sectionProps = {
        style: {
          pointerEvents: isActive ? 'auto' : 'none',
          opacity: isActive ? 1 : 0,
          transition: 'opacity 600ms ease',
          position: isActive ? 'relative' : 'absolute',
          top: isActive ? 'auto' : 0,
          left: 0,
          right: 0,
          bottom: isActive ? 'auto' : 0,
          width: '100%',
          minHeight: '100dvh',
          maxWidth: '100vw',
          // Form page should be exactly 100dvh, other pages can expand
          height: isActive && isFormPage ? '100dvh' : (isActive ? 'auto' : '100dvh'),
          // Form page handles its own scrolling, content pages scroll naturally when content overflows
          overflowY: isActive && isFormPage ? 'hidden' : 'visible',
          overflowX: 'hidden',
        },
        'aria-hidden': !isActive,
        tabIndex: isActive ? 0 : -1,
        'data-chapter-index': index,
      };

      const componentProps = (() => {
        const base = { isActive };
        if (index === 0) return { ...base, onPrimaryAction: () => goToChapter(1) };
        if (index === sections.length - 1) {
          // ApplicationForm - last page
          return {
            ...base,
            onBack: handleFormBack,
            onNext: handleFormNext,
            currentStep: formStep,
            totalSteps: totalFormSteps,
          };
        }
        return {
          ...base,
          onBack: () => goToChapter(index - 1),
          onNext: () => goToChapter(index + 1),
        };
      })();

      return (
        <section key={index} {...sectionProps}>
          <Component {...componentProps} />
        </section>
      );
    });
  }, [currentIndex, formStep, goToChapter, handleFormNext, handleFormBack, totalFormSteps]);

  return (
    <main 
      className="relative w-full bg-[#fefcf3]"
      style={{
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        overflowY: 'visible',
        minHeight: '100dvh',
      }}
    >
      {renderedSections}
    </main>
  );
};

export default StoryApp;
