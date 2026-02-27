"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Users } from "lucide-react";
import RoundButton from './RoundButton';
import logo from '../assets/logo/NOVI.png';
import logo1 from '../assets/logo/NOVI1.png';
import Link from 'next/link';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const Footer = () => {
    const footerRef = useRef(null);
    const bigTextRef = useRef(null);
    const lettersRef = useRef([]);
    const hasAnimatedRef = useRef(false);
    const [mounted, setMounted] = useState(false);

    const brandName = "Archaelix";

    useEffect(() => {
        setMounted(true);
        if (!bigTextRef.current || lettersRef.current.length === 0) return;

        const ctx = gsap.context(() => {
            // Big Text Animation Initial State
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
                    }
                },
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
        <footer ref={footerRef} className="w-full bg-[#df1612] text-white pt-20 pb-12 px-8 md:px-16 overflow-hidden">
            <div className="w-full flex flex-col gap-24">
                
                {/* TOP SECTION: Split Left and Right */}
                <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-24">
                    
                    {/* LEFT COLUMN: Branding & Intro */}
                    <div className="flex-1 flex flex-col items-start gap-5 ">
                        {/* Enlarged Logo Container */}
                       <div className="flex items-center justify-center">
  <div className="flex items-center gap-8 px-8 py-6 bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-black/5">

    <img
      src={logo.src}
      alt="Archaelix Logo"
      className="h-20 md:h-32 w-auto object-contain scale-150 transition-transform duration-300"
    />

    <div className="h-16 md:h-24 w-px bg-gradient-to-b from-transparent via-black/40 to-transparent"></div>

    <img
      src={logo1.src}
      alt="Partner Logo"
      className="h-20 md:h-32 w-auto object-contain transition-transform duration-300 hover:scale-105"
    />

  </div>
</div>

                        
                        <p className="text-white/80 max-w-md text-xl leading-relaxed font-sans">
                            We bridge the gap between imagination and reality, crafting digital experiences that resonate and inspire.
                        </p>

                        <div className="group relative">
                            <RoundButton
                                href="/community"
                                title="Join Community"
                                variant="primary1"
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Navigation Links */}
                    <div className="flex-[1.2] grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12 lg:pt-6">
                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] md:text-[25px] font-bold uppercase tracking-[0.3em] text-white/40 font-sans">Services</h4>
                            <ul className="flex flex-col gap-4 font-sans text-sm font-medium">
                                <li><Link href="/services/business-consulting" className="hover:text-white/60 transition-colors">Business Consultation</Link></li>
                                <li><Link href="/services/it-services" className="hover:text-white/60 transition-colors">IT Services</Link></li>
                                <li><Link href="/services/digital-marketing" className="hover:text-white/60 transition-colors">Digital Marketing</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] md:text-[25px] font-bold uppercase tracking-[0.3em] text-white/40 font-sans">Company</h4>
                            <ul className="flex flex-col gap-4 font-sans text-sm font-medium">
                                <li><Link href="/" className="hover:text-white/60 transition-colors">Home</Link></li>
                                <li><Link href="/about" className="hover:text-white/60 transition-colors">About</Link></li>
                                <li><Link href="/careers" className="hover:text-white/60 transition-colors">Careers</Link></li>
                                <li><Link href="/contact" className="hover:text-white/60 transition-colors">Contact</Link></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-6">
                            <h4 className="text-[10px] md:text-[25px] font-bold uppercase tracking-[0.3em] text-white/40 font-sans">Socials</h4>
                            <ul className="flex flex-col gap-4 font-sans text-sm font-medium">
                                <li><Link href="#" className="hover:text-white/60 transition-colors">LinkedIn</Link></li>
                                <li><Link href="#" className="hover:text-white/60 transition-colors">Instagram</Link></li>
                                <li><Link href="#" className="hover:text-white/60 transition-colors">X / Twitter</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MIDDLE SECTION: Big Animated Text */}
                <div ref={bigTextRef} className="relative -mb-12 md:-mb-20 lg:-mb-32 flex justify-center">
                    <h2 className="text-[23vw] font-bold leading-[0.75] font-heading uppercase select-none flex" style={{ perspective: "1000px" }}>
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

                {/* BOTTOM SECTION: Copyright & Legal */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-widest uppercase font-sans text-white/30">
                    <p>© 2026 Archaelix. Digital Excellence.</p>
                    <div className="flex gap-10">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;