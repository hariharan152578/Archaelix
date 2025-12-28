"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import RoundButton from "./RoundButton";

const HomeHero = ({ startAnimation }) => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const bottomRef = useRef(null);

  // Set initial state immediately
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hide all lines vertically first
      gsap.set([
        line1Ref.current.querySelector('h1'),
        line2Ref.current.querySelector('h1'),
        line3Ref.current.querySelector('h1')
      ], {
        y: "115%",
        opacity: 0
      });

      // Special state for line 2 badge - zero width
      gsap.set(line2Ref.current.querySelector('.badge-element'), {
        width: 0,
        opacity: 0,
        marginRight: 0
      });

      gsap.set(bottomRef.current, {
        y: 20,
        opacity: 0
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Trigger animation when startAnimation becomes true
  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Reveal all text lines vertically
      tl.to([
        line1Ref.current.querySelector('h1'),
        line2Ref.current.querySelector('h1'),
        line3Ref.current.querySelector('h1')
      ], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
      })
        // 2. Expand the badge which pushes the text to the right
        .to(line2Ref.current.querySelector('.badge-element'), {
          width: "clamp(60px, 12vw, 180px)", // Dynamic width based on screen size
          opacity: 1,
          marginRight: "1rem",
          duration: 1,
          ease: "power4.inOut",
        }, "-=0.5")
        // 3. Show the bottom bar
        .to(bottomRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }, "-=0.5")
        .from(bottomRef.current.querySelectorAll('p, .order-3'), {
          opacity: 0,
          y: 10,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out"
        }, "-=0.4");
    }, heroRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col"
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-start md:justify-center px-[5vw] md:px-12 lg:px-20 pt-[20vh] md:pt-24 pb-6 md:pb-8">
        {/* Hero Typography */}
        <div className="w-full">
          {/* Line 1 */}
          <div ref={line1Ref} className="overflow-hidden py-1">
            <h1
              className="text-[16.5vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.75] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform"
              style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}
            >
              We Create
            </h1>
          </div>

          {/* Line 2 - with video/badge element */}
          <div ref={line2Ref} className="overflow-hidden flex items-center py-1">
            {/* Small video badge */}
            <div
              className="badge-element relative h-[10vw] sm:h-[8.5vw] md:h-[7vw] lg:h-[6.5vw] rounded-md overflow-hidden flex-shrink-0 will-change-[width,opacity]"
              style={{ marginTop: 'calc(0.5vw + 1px)' }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                src="https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4"
              />
            </div>
            <h1
              className="text-[16.5vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.75] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform"
              style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}
            >
              Eye-Opening
            </h1>
          </div>

          {/* Line 3 */}
          <div ref={line3Ref} className="overflow-hidden py-1">
            <h1
              className="text-[16.5vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.75] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform"
              style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}
            >
              Experiences
            </h1>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        ref={bottomRef}
        className="w-full border-t border-gray-200 px-[5vw] md:px-12 lg:px-20 py-5 md:py-6 will-change-transform opacity-0"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-4">
          {/* Left tagline */}
          <p
            className="text-[15px] md:text-base text-[#475569] order-1 sm:order-1 leading-relaxed"
            style={{ fontFamily: "'NeueMontreal', sans-serif", fontWeight: 400 }}
          >
            For brands that want to stand out
          </p>

          {/* Center tagline */}
          <p
            className="text-[15px] md:text-base text-[#475569] order-2 leading-relaxed"
            style={{ fontFamily: "'NeueMontreal', sans-serif", fontWeight: 400 }}
          >
            From concept to conversion
          </p>

          {/* CTA Button */}
          <div className="order-3 sm:order-3 w-full sm:w-auto">
            <RoundButton
              title="Start The Project"
              href="/contact"
              variant="primary"
              className="scale-90 sm:scale-100"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
