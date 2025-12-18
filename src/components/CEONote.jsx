"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const CEONote = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const imageRevealRef = useRef(null);
    const textContentRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const ctx = gsap.context(() => {
            // Background reveal animation
            gsap.fromTo(containerRef.current,
                { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                }
            );

            // Title movement
            gsap.fromTo(titleRef.current,
                { x: -100, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 40%",
                    }
                }
            );

            // Image reveal from center
            gsap.fromTo(imageRevealRef.current,
                { scale: 1.5, opacity: 0 },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 2,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 30%",
                    }
                }
            );

            // Staggered text reveal
            const items = textContentRef.current.children;
            gsap.fromTo(items,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 20%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full h-screen bg-white overflow-hidden flex items-center justify-center font-sans"
        >
            <div
                ref={containerRef}
                className="absolute inset-0 bg-[#f73b20] z-0"
            />

            <div className="relative w-full h-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center z-10 px-8 md:px-20">

                {/* BIG BACKDROP TEXT */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none overflow-hidden opacity-10">
                    <h2 className="text-[35vw] font-bold font-heading leading-none text-white whitespace-nowrap uppercase italic tracking-tighter">
                        VISIONARY
                    </h2>
                </div>

                {/* LEFT DECOR - BIG NUMBER */}
                <div className="hidden lg:block lg:col-span-2 relative">
                    <div className="flex flex-col items-center">
                        <span className="text-[12vw] font-bold font-heading text-white/20 leading-none">01</span>
                        <div className="w-[1px] h-32 bg-white/30 my-8" />
                        <span className="[writing-mode:vertical-rl] text-white/50 uppercase tracking-[0.5em] text-xs font-bold">Archaelix Spirit</span>
                    </div>
                </div>

                {/* CENTER - IMAGE BOX */}
                <div className="col-span-1 lg:col-span-5 relative flex justify-center">
                    <div
                        ref={imageRevealRef}
                        className="relative w-[320px] h-[450px] md:w-[480px] md:h-[650px] overflow-hidden rounded-[2rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] bg-white p-4"
                    >
                        <div className="w-full h-full rounded-[1.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
                                alt="CEO"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute bottom-12 -right-8 bg-white text-[#f73b20] py-6 px-10 rounded-2xl shadow-xl transform rotate-3">
                            <p className="text-4xl font-bold font-heading leading-none">CEO</p>
                            <p className="text-[10px] uppercase font-bold tracking-widest mt-1">Founder Note</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT - CONTENT */}
                <div className="col-span-1 lg:col-span-5 relative z-10 lg:pl-12 mt-12 lg:mt-0">
                    <div ref={textContentRef} className="flex flex-col gap-10">

                        <div className="flex flex-col gap-4">
                            <h3 className="text-white text-base font-bold uppercase tracking-[0.3em]">The Philosophy</h3>
                            <div className="w-20 h-[2px] bg-white opacity-40" />
                        </div>

                        <h2
                            ref={titleRef}
                            className="text-[8vw] lg:text-[5vw] font-bold text-white leading-[0.9] font-heading uppercase italic"
                        >
                            Defining <br />
                            <span className="text-[#0F172A] mix-blend-overlay">The Digital</span> <br />
                            Standard.
                        </h2>

                        <div className="flex flex-col gap-8 max-w-md">
                            <p className="text-white/90 text-lg md:text-xl font-sans leading-relaxed tracking-tight">
                                "We don't just build websites; we architect emotional connections in a digital landscape that often feels too cold."
                            </p>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-white text-3xl font-bold font-heading uppercase leading-none tracking-tight">Vikashuvi</span>
                                    <span className="text-white/60 text-xs font-bold uppercase tracking-widest mt-2">Visionary & Founder</span>
                                </div>
                            </div>
                        </div>

                        {/* ACTION - SIGNATURE STYLE */}
                        <div className="mt-4">
                            <div className="inline-flex items-center gap-4 group cursor-pointer">
                                <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white transition-all duration-300">
                                    <svg className="w-6 h-6 text-white group-hover:text-[#f73b20] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </div>
                                <span className="text-white uppercase font-bold tracking-widest text-xs group-hover:translate-x-2 transition-transform duration-300">Read Full Story</span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

            {/* DECORATIVE ELEMENTS */}
            <div className="absolute top-12 right-12 w-32 h-32 border-[1px] border-white/10 rounded-full animate-spin-slow hidden lg:block" />

            <style jsx>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
        </section>
    );
};

export default CEONote;
