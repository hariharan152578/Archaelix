'use client';

import React, { useEffect, useState, useRef } from 'react';
import RoundButton from './RoundButton';
import img1 from "../assets/CTA/1.png";
import img2 from "../assets/CTA/2.png";
import img3 from "../assets/CTA/3.png";
import img4 from "../assets/CTA/4.png";
import img5 from "../assets/CTA/5.png";
import img6 from "../assets/CTA/6.png";
import img7 from "../assets/CTA/7.png";
import img8 from "../assets/CTA/8.png";
const CTA = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldSpread, setShouldSpread] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅ added
  const [isMounted, setIsMounted] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  const sectionRef = useRef(null);
  const lastScrollTop = useRef(0);
  const scrollPosition = useRef(0);
  const modalRef = useRef();

  const students = [
    { id: 1, name: 'Team 1', image: img1 },
    { id: 2, name: 'Team 2', image: img2 },
    { id: 3, name: 'Team 3', image: img3 },
    { id: 4, name: 'Team 4', image: img4 },
    { id: 5, name: 'Team 5', image: img5 },
    { id: 6, name: 'Team 6', image: img6 },
    { id: 7, name: 'Team 7', image: img7 },
    { id: 8, name: 'Team 8', image: img8 },
  ];

  const presetPositions = [
    { x: -25, y: -25, scale: 0.75 },
    { x: 30, y: -25, scale: 0.4 },
    { x: 8, y: -30, scale: 0.8 },
    { x: -36, y: 10, scale: 0.6 },
    { x: 0, y: 35, scale: 0.8 },
    { x: 20, y: 30, scale: 0.5 },
    { x: -20, y: 25, scale: 0.4 },
    { x: 35, y: 5, scale: 0.75 },
  ];

  useEffect(() => {
    setIsMounted(true);

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      const viewportHeight = window.innerHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      const currentScrollingDown = scrollTop > lastScrollTop.current;
      setIsScrollingDown(currentScrollingDown);
      lastScrollTop.current = scrollTop;

      if (sectionTop <= viewportHeight && sectionTop > -sectionHeight) {
        setIsVisible(true);
        const scrolledPastSection = Math.max(0, viewportHeight - sectionTop);
        const progress = Math.min(1, scrolledPastSection / (sectionHeight + viewportHeight));
        setScrollProgress(progress);
        setShouldSpread(progress > 0.1);
      } else {
        setIsVisible(false);
        setScrollProgress(0);
        setShouldSpread(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  const getCardPosition = (index) => {
    // ✅ SSR safety
    if (!isMounted) {
      return {
        transform: 'translate3d(0px, 0px, 0px) scale(0.6)',
        opacity: 0,
      };
    }

    const { x, y, scale } = presetPositions[index % presetPositions.length];
    const spreadFactor = 1 + (shouldSpread ? scrollProgress * 2 : 0);

    const xPixels = (x / 100) * viewport.width * scrollProgress * spreadFactor;
    const yPixels = (y / 100) * viewport.height * scrollProgress * spreadFactor;
    const z = 50 * scrollProgress;

    const minScale = 0.4;
    const currentScale = scale - (scale - minScale) * (scrollProgress * 1.2);

    return {
      transform: `translate3d(${xPixels}px, ${yPixels}px, ${z}px) scale(${currentScale})`,
      opacity: 1,
    };
  };

  const calculateOpacity = (progress) => {
    if (!isScrollingDown) return Math.max(0, progress - 0.3);
    return Math.min(1, progress * 2);
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center py-16 px-8 bg-white relative min-h-screen overflow-hidden"
    >
      {/* Center Content */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-center z-10">
        <h2
          className="text-2xl md:text-4xl lg:text-5xl text-[#0F172A] max-w-4xl font-medium mb-8"
          style={{
            opacity: calculateOpacity(scrollProgress),
            fontFamily: "'NeueMontreal', sans-serif",
          }}
        >
          Launch Your Digital & Business Growth Project
        </h2>

        <RoundButton
          title="Start Your Project"
          href="/contact"
          variant="primary"
          className="scale-90 sm:scale-100"
        />
      </div>

      {/* Cards */}
      <div className="relative w-[200px] h-[200px]" style={{ perspective: '1000px' }}>
        {isMounted &&
          students.map((student, index) => (
            <div
              key={student.id}
              className="absolute w-[200px] h-[200px] rounded-3xl overflow-hidden transition-all duration-400 ease-out hover:scale-110 hover:z-20"
              style={{
                ...getCardPosition(index),
                zIndex: students.length - index,
                backfaceVisibility: 'hidden',
              }}
            >
             <img
  src={student.image.src || student.image} // Added .src fallback
  alt={student.name}
  className="w-full h-full object-cover"
/>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CTA;
