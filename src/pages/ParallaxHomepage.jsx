import React from 'react';
import DynamicParallaxSection from '../components/DynamicParallaxSection';
import layers from '../assets/layers.json';

const ParallaxHomepage = () => {
  return (
    <div className="relative">
      <DynamicParallaxSection layers={layers.hero} />

      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">Our Vision for Instructors</h2>
        <p className="max-w-3xl text-lg sm:text-xl text-gray-700">
          We\'re redefining education through immersive experiences and Renaissance-inspired learning. Join our
          platform and become a part of the next generation of transformative instructors.
        </p>
      </section>

      <DynamicParallaxSection layers={layers.section1} className="relative w-full min-h-screen overflow-hidden bg-white" />

      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-5xl font-bold mb-6">Bring Your Story to Life</h2>
        <p className="max-w-3xl text-lg sm:text-xl text-slate-200">
          Layered visuals and thoughtful motion help instructors stand out. These sections are data-driven via
          `layers.json`, so you can swap imagery without touching the layout.
        </p>
      </section>
    </div>
  );
};

export default ParallaxHomepage;
