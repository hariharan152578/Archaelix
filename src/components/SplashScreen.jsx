"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const SplashScreen = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const pathRef = useRef(null);
    const wrapperRef = useRef(null);
    const logoRef = useRef(null);

    // SVG path definitions for the wave morph animation
    // Starting with full screen coverage, then morphing to reveal
    const paths = {
        // Full screen - covers everything (starts here)
        initial: "M 0 0 V 100 Q 50 100 100 100 V 0 z",
        // Curved wave going up (the squish effect)
        step1: "M 0 0 V 50 Q 50 0 100 50 V 0 z",
        // Fully retracted to top
        final: "M 0 0 V 0 Q 50 0 100 0 V 0 z",
    };

    useEffect(() => {
        const path = pathRef.current;
        const logo = logoRef.current;
        const wrapper = wrapperRef.current;

        if (!path || !wrapper) return;

        // Create the animation timeline
        const tl = gsap.timeline({
            onComplete: () => {
                setTimeout(() => {
                    setIsVisible(false);
                    if (onComplete) onComplete();
                }, 100);
            },
        });

        // Set initial state - full screen visible immediately
        gsap.set(path, { attr: { d: paths.initial } });
        gsap.set(logo, { opacity: 0, scale: 0.8, y: 20 });

        // Animation sequence
        tl
            // Logo fades in
            .to(logo, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            })
            // Hold for a moment to let user see
            .to({}, { duration: 1 })
            // Fade out logo
            .to(logo, {
                opacity: 0,
                scale: 0.9,
                duration: 0.4,
                ease: "power2.in"
            })
            // Start the wave animation - curve up (squish effect)
            .to(path, {
                attr: { d: paths.step1 },
                duration: 0.5,
                ease: "power2.in",
            }, "-=0.2")
            // Complete the wave - flatten at top (reveal complete)
            .to(path, {
                attr: { d: paths.final },
                duration: 0.4,
                ease: "power2.out",
            });

        return () => {
            tl.kill();
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ pointerEvents: "none" }}
        >
            {/* SVG Wave Transition - starts covering full screen */}
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient
                        id="splash-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#ff6347" />
                        <stop offset="50%" stopColor="#f73b20" />
                        <stop offset="100%" stopColor="#d63118" />
                    </linearGradient>
                </defs>
                <path
                    ref={pathRef}
                    fill="url(#splash-gradient)"
                    d={paths.initial}
                />
            </svg>

            {/* Logo/Brand in center */}
            <div
                ref={logoRef}
                className="relative z-10 flex flex-col items-center justify-center"
            >
                {/* Brand Text - Using FoundersGrotesk for heading */}
                <h1
                    className="text-4xl md:text-7xl font-bold font-heading text-white"
                    style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                >
                    archaelix
                </h1>
            </div>
        </div>
    );
};

export default SplashScreen;
