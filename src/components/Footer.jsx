"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from "lucide-react"; // Added Users icon
import RoundButton from './RoundButton';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
    const footerRef = useRef(null);
    const bigTextRef = useRef(null);
    const lettersRef = useRef([]);
    const hasAnimatedRef = useRef(false);
    const communityRef = useRef(null); // Ref for new community element
    const [mounted, setMounted] = useState(false);

    const brandName = "Archaelix";

    useEffect(() => {
        setMounted(true);
        if (!bigTextRef.current || lettersRef.current.length === 0) return;

        const ctx = gsap.context(() => {
            // Existing Big Text Animation
            gsap.set(lettersRef.current, {
                opacity: 0,
                y: 150,
                rotateX: -90,
                scale: 0.5,
                transformOrigin: "center bottom",
            });

            ScrollTrigger.create({
                trigger: bigTextRef.current,
                start: "top 90%",
                onEnter: () => {
                    if (!hasAnimatedRef.current) {
                        hasAnimatedRef.current = true;

                        gsap.to(lettersRef.current, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            scale: 1,
                            duration: 1.2,
                            ease: "elastic.out(1, 0.5)",
                            stagger: { each: 0.08, from: "start" },
                            onComplete: () => {
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

                        gsap.to(lettersRef.current, {
                            textShadow: "0 0 40px rgba(255,255,255,0.8), 0 0 80px rgba(255,255,255,0.4)",
                            duration: 0.5,
                            stagger: { each: 0.05, repeat: 1, yoyo: true },
                            delay: 0.8,
                        });
                    }
                },
            });

            // Subtle floating animation for the Community Badge
            gsap.to(communityRef.current, {
                y: -10,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e, index) => {
        const letter = lettersRef.current[index];
        if (!letter) return;
        const rect = letter.getBoundingClientRect();
        const deltaX = (e.clientX - (rect.left + rect.width / 2)) * 0.15;
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) * 0.15;

        gsap.to(letter, {
            x: deltaX,
            y: deltaY,
            scale: 1.1,
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
            textShadow: "none",
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return (
        <footer ref={footerRef} className="w-full bg-[#df1612] text-white pt-32 pb-12 px-8 md:px-16 overflow-hidden">
            <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-32">
                    <div className="col-span-2 lg:col-span-3">
                        <p className="text-white/80 max-w-md text-lg leading-relaxed font-sans mb-8">
                            We bridge the gap between imagination and reality, crafting digital experiences that resonate and inspire.
                        </p>

                        {/* --- NEW Community Link Component ---
                        <div className="mb-12 group">
                            <a 
                                href="/community" 
                                ref={communityRef}
                                className="inline-flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/20 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 group-hover:border-white/40"
                            >
                                <div className="bg-white text-[#df1612] p-2 rounded-full group-hover:rotate-12 transition-transform duration-500">
                                    <Users size={18} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Join the Circle</span>
                                    <span className="text-sm font-medium flex items-center gap-2">
                                        Archaelix Community <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            </a>
                        </div> */}
                        {/* ------------------------------------ */}

                        <div className="group relative inline-block">
                            <RoundButton
                                href="/community"
                                title="Archaelix Community"
                                variant="primary1"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Services</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="/services/business-consulting" className="hover:text-white/60 transition-colors">Business Consultation</a></li>
                            <li><a href="/services/it-services" className="hover:text-white/60 transition-colors">IT Services</a></li>
                            <li><a href="/services/digital-marketing" className="hover:text-white/60 transition-colors">Digital Marketing</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Company</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="/" className="hover:text-white/60 transition-colors">Home</a></li>
                            <li><a href="/about" className="hover:text-white/60 transition-colors">About</a></li>
                            <li><a href="/contact" className="hover:text-white/60 transition-colors">Contact</a></li>
                            <li><a href="/careers" className="hover:text-white/60 transition-colors">Careers</a></li>
                            <li><a href="/client" className="hover:text-white/60 transition-colors">Clients</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Socials</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="#" className="hover:text-white/60 transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Instagram</a></li>
                        </ul>
                    </div>
                </div>

                <div ref={bigTextRef} className="relative -mb-16 md:-mb-24 lg:-mb-40">
                    <h2 className="text-[22vw] font-bold leading-[0.7] font-heading uppercase select-none flex" style={{ perspective: "1000px" }}>
                        {brandName.split('').map((letter, index) => (
                            <span
                                key={index}
                                ref={el => lettersRef.current[index] = el}
                                className="inline-block cursor-default"
                                style={{ willChange: "transform, opacity", transformStyle: "preserve-3d" }}
                                onMouseMove={(e) => handleMouseMove(e, index)}
                                onMouseLeave={() => handleMouseLeave(index)}
                            >
                                {letter}
                            </span>
                        ))}
                    </h2>
                </div>

                <div className="mt-40 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-sans text-white/40">
                    <p>© 2026 Archaelix. Digital Excellence.</p>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;