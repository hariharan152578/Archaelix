"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import RoundButton from "./RoundButton";
import Threads from "./Threads";

const HomeHero = ({ startAnimation }) => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const bottomRef = useRef(null);

  // Set initial state immediately
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([
        line1Ref.current.querySelector('h1'),
        line2Ref.current.querySelector('h1'),
        line3Ref.current.querySelector('h1')
      ], {
        y: "115%",
        opacity: 0
      });

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

  // Trigger animation
  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

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
      .to(line2Ref.current.querySelector('.badge-element'), {
        width: "clamp(60px, 12vw, 180px)",
        opacity: 1,
        marginRight: "1rem",
        duration: 1,
        ease: "power4.inOut",
      }, "-=0.5")
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
      className="relative w-full min-h-[90vh] md:min-h-screen bg-white overflow-hidden flex flex-col"
    >
      {/* BACKGROUND LAYER */}
      {/* <div className="absolute inset-0 z-0 pointer-events-none">
        <Threads 
              amplitude={1.2} 
              distance={0.3} 
              color={[0.87, 0.08, 0.07]} // Matches #df1612 roughly in RGB
            />
      </div> */}

      {/* CONTENT LAYER */}
      <div className="relative z-10 flex-1 flex flex-col justify-start md:justify-center px-[5vw] md:px-12 lg:px-20 pt-[20vh] md:pt-24 pb-6 md:pb-8">
        <div className="w-full">
          {/* Line 1 */}
          <div ref={line1Ref} className="overflow-hidden py-1">
            <h1
              className="text-[16.5vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.75] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform"
              style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
            >
              introducing
            </h1>
          </div>

          {/* Line 2 */}
          <div ref={line2Ref} className="overflow-hidden flex items-center py-1">
            <div
              className="badge-element relative h-[10vw] sm:h-[8.5vw] md:h-[7vw] lg:h-[6.5vw] rounded-md overflow-hidden flex-shrink-0 will-change-[width,opacity] bg-slate-100"
              style={{ marginTop: 'calc(1vw + 2px)' }}
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
              style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
            >
              Archaelix
            </h1>
          </div>

          {/* Line 3 */}
          <div ref={line3Ref} className="overflow-hidden py-1">
            <h1
              className="text-[16.5vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.75] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform"
              style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
            >
              A <span className="text-[#df1612]"> new Way </span> Forward
            </h1>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR LAYER */}
      <div
        ref={bottomRef}
        className="relative z-10 w-full border-t border-gray-200/50 px-[5vw] md:px-12 lg:px-20 py-5 md:py-6 will-change-transform opacity-0"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[15px] md:text-base text-[#475569] leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
            For brands that want to stand out
          </p>

          <p className="text-[15px] md:text-base text-[#475569] leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
            From concept to conversion
          </p>

          <div className="w-full sm:w-auto">
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