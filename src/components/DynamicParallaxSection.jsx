import React from 'react';
import ParallaxLayer from './ParallaxLayer';

const resolveSrc = (src) => {
  if (!src) return src;
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return `${import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}${src}`;
  return src;
};

const DynamicParallaxSection = ({ layers, className = 'relative w-full min-h-screen overflow-hidden' }) => {
  const renderGroup = (group = []) =>
    group.map((layer, index) => (
      <ParallaxLayer
        key={`${layer.src}-${index}`}
        src={resolveSrc(layer.src)}
        speed={layer.speed}
        alt={layer.alt || ''}
        className={layer.className || ''}
        style={layer.style || {}}
      />
    ));

  return (
    <section className={className}>
      {renderGroup(layers?.background)}
      {renderGroup(layers?.midground)}
      {renderGroup(layers?.foreground)}
    </section>
  );
};

export default DynamicParallaxSection;
