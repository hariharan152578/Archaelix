"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ArchaelixSplash = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);

  const brandName = "ARCHAELIX";
  const subText = "ENGINEERING THE BEYOND";

  const glyphs =
    "कनमस्तेഅആഇഉകखगघङచछजझञటఠడఢణతథదధనపఫబభమయరలవశషసह";

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      const chars = gsap.utils.toArray(".char-box");

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            delay: 2,
            ease: "power3.inOut",
            onComplete: () => {
              setIsVisible(false);
              if (onComplete) onComplete();
            },
          });
        },
      });

      // Initial State
      gsap.set(".sub-text", { opacity: 0, y: 20 });
      gsap.set(chars, { opacity: 0, scale: 0.8 });

      chars.forEach((char, index) => {
        const glyphElement = char.querySelector(".glyph");
        const finalLetter = brandName[index];
        const startTime = index * 0.5;

        // Reveal letter slot
        tl.to(
          char,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          startTime
        );

        // Morphing effect
        const morphObj = { value: 0 };
        tl.to(
          morphObj,
          {
            value: 20,
            duration: 2.5,
            ease: "none",
            onUpdate: () => {
              if (!glyphElement) return;

              if (morphObj.value < 19) {
                glyphElement.innerText =
                  glyphs[Math.floor(Math.random() * glyphs.length)];
                gsap.set(glyphElement, {
                  color: "#F2F2F2",
                  opacity: 0.9,
                });
              } else {
                glyphElement.innerText = finalLetter;
                gsap.set(glyphElement, {
                  color: "#F2F2F2",
                  opacity: 1,
                });
              }
            },
          },
          startTime
        );

        // Subtle lock effect
        tl.to(
          glyphElement,
          {
            scale: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
          },
          startTime + 2.4
        );
      });

      // Subtitle reveal
      tl.to(
        ".sub-text",
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.6em",
          duration: 1.5,
          ease: "power3.out",
        },
        "-=1"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#df1612] overflow-hidden"
    >
      <div className="relative z-10 flex flex-col items-center select-none">
        {/* Main Logo */}
        <div className="flex items-center justify-center space-x-1 md:space-x-4">
          {brandName.split("").map((_, i) => (
            <div
              key={i}
              className="char-box flex items-center justify-center"
            >
              <span
                className="glyph text-5xl md:text-8xl font-black text-[#F2F2F2]"
                style={{ minWidth: "1.1ch", textAlign: "center" }}
              >
                -
              </span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <div className="sub-text mt-10 text-[10px] md:text-sm font-bold text-[#F2F2F2] uppercase whitespace-nowrap">
          {subText}
        </div>
      </div>
    </div>
  );
};

export default ArchaelixSplash;
