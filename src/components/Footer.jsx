"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
    const footerRef = useRef(null);
    const bigTextRef = useRef(null);
    const lettersRef = useRef([]);
    const hasAnimatedRef = useRef(false);

    const brandName = "Archaelix";

    useEffect(() => {
        // Wait for refs to be populated
        if (!bigTextRef.current || lettersRef.current.length === 0) return;

        const ctx = gsap.context(() => {
            // Initial state - letters are hidden and positioned below
            gsap.set(lettersRef.current, {
                opacity: 0,
                y: 150,
                rotateX: -90,
                scale: 0.5,
                transformOrigin: "center bottom",
            });

            // Create the scroll trigger animation
            ScrollTrigger.create({
                trigger: bigTextRef.current,
                start: "top 90%",
                onEnter: () => {
                    if (!hasAnimatedRef.current) {
                        hasAnimatedRef.current = true;

                        // Liquid Wave Reveal Animation
                        gsap.to(lettersRef.current, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            scale: 1,
                            duration: 1.2,
                            ease: "elastic.out(1, 0.5)",
                            stagger: {
                                each: 0.08,
                                from: "start",
                            },
                            onComplete: () => {
                                // Add continuous subtle float animation after reveal
                                lettersRef.current.forEach((letter, index) => {
                                    if (letter) {
                                        gsap.to(letter, {
                                            y: "random(-5, 5)",
                                            duration: "random(2, 3)",
                                            ease: "sine.inOut",
                                            repeat: -1,
                                            yoyo: true,
                                            delay: index * 0.1,
                                        });
                                    }
                                });
                            }
                        });

                        // Add shimmer effect after main animation
                        gsap.to(lettersRef.current, {
                            textShadow: "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)",
                            duration: 0.5,
                            stagger: {
                                each: 0.05,
                                from: "start",
                                repeat: 1,
                                yoyo: true,
                            },
                            delay: 0.8,
                        });
                    }
                },
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    // Magnetic hover effect for each letter
    const handleMouseMove = (e, index) => {
        const letter = lettersRef.current[index];
        if (!letter) return;

        const rect = letter.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * 0.15;
        const deltaY = (e.clientY - centerY) * 0.15;

        gsap.to(letter, {
            x: deltaX,
            y: deltaY,
            scale: 1.1,
            color: "#ffffff",
            textShadow: "0 0 30px rgba(255,255,255,0.6)",
            duration: 0.3,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = (index) => {
        const letter = lettersRef.current[index];
        if (!letter) return;

        gsap.to(letter, {
            x: 0,
            scale: 1,
            color: "#ffffff",
            textShadow: "none",
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <footer ref={footerRef} className="w-full bg-[#df1612] text-white pt-32 pb-12 px-8 md:px-16 overflow-hidden">
            <div className="w-full">
                {/* Top Section with Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-32">
                    <div className="col-span-2 lg:col-span-3">
                        <div className="mb-8">
                            <span className="text-3xl font-bold font-heading">Archaelix</span>
                        </div>
                        <p className="text-white/80 max-w-md text-lg leading-relaxed font-sans">
                            We bridge the gap between imagination and reality, crafting digital experiences that resonate and inspire.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Resources</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="#" className="hover:text-white/60 transition-colors">Design Inspirations</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Channels</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">UI Libraries</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Open Source</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Company</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="#" className="hover:text-white/60 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Work</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Socials</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="#" className="hover:text-white/60 transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Twitter (X)</a></li>
                        </ul>
                    </div>
                </div>

                {/* Massive Brand Name Section with Liquid Wave Animation */}
                <div ref={bigTextRef} className="relative -mb-16 md:-mb-24 lg:-mb-40">
                    <h2
                        className="text-[22vw] font-bold leading-[0.7] font-heading uppercase select-none flex"
                        style={{ perspective: "1000px" }}
                    >
                        {brandName.split('').map((letter, index) => (
                            <span
                                key={index}
                                ref={el => lettersRef.current[index] = el}
                                className="inline-block cursor-default transition-colors duration-200"
                                style={{
                                    willChange: "transform, opacity",
                                    transformStyle: "preserve-3d",
                                }}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                {letter}
                            </span>
                        ))}
                    </h2>
                </div>

                {/* Bottom Bar */}
                <div className="mt-40 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-sans tracking-tight text-white/40">
                    <div className="flex items-center gap-8">
                        <p>© 2025 Archaelix. Digital Excellence.</p>
                        <a href="https://reactbits.dev" target="_blank" className="hover:text-white transition-colors">Built with ReactBits</a>
                    </div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Terms of Service</a>
                    </div>
                </div>
            </div>

            {/* Styles for the animation */}
            <style jsx>{`
                @keyframes letterGlow {
                    0%, 100% {
                        text-shadow: 0 0 10px rgba(255,255,255,0.3);
                    }
                    50% {
                        text-shadow: 0 0 30px rgba(255,255,255,0.6), 0 0 60px rgba(255,255,255,0.3);
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
