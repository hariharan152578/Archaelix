"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoundButton from "./RoundButton";

const CEONote = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const imageRevealRef = useRef(null);
    const textContentRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const ctx = gsap.context(() => {
            // Title animation - clean slide up
            gsap.fromTo(titleRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                    }
                }
            );

            // Image reveal - subtle scale and fade
            gsap.fromTo(imageRevealRef.current,
                { scale: 0.9, opacity: 0, y: 30 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 50%",
                    }
                }
            );

            // Staggered text content reveal
            const items = textContentRef.current.children;
            gsap.fromTo(items,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 40%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen bg-white overflow-hidden flex items-center justify-center font-sans py-20"
        >
            <div className="relative w-full h-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-center z-10 px-8 md:px-20 gap-12 lg:gap-0">


                {/* BIG BACKDROP TEXT */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none overflow-hidden opacity-5">
                    <h2
                        className="text-[35vw] font-bold leading-none text-[#df1612] whitespace-nowrap uppercase italic tracking-tighter"
                        style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                    >
                        VISIONARY
                    </h2>
                </div>

                {/* LEFT DECOR - BIG NUMBER */}
                <div className="hidden lg:block lg:col-span-2 relative">
                    <div className="flex flex-col items-center">
                        <span className="text-[10vw] font-bold text-white/10 leading-none" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>01</span>
                        <div className="w-[1px] h-32 bg-white/20 my-8" />
                        <span className="[writing-mode:vertical-rl] text-white/40 uppercase tracking-[0.5em] text-[10px] font-bold font-sans">Archaelix Spirit</span>
                    </div>
                </div>

                {/* CENTER - IMAGE BOX */}
                <div className="col-span-1 lg:col-span-5 relative flex justify-center">
                    <div
                        ref={imageRevealRef}
                        className="relative w-[300px] h-[420px] md:w-[450px] md:h-[600px] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] bg-white p-3"
                    >
                        <div className="w-full h-full rounded-[2rem] overflow-hidden  hover:grayscale-0 transition-all duration-1000">
                            <img
                                src="https://res.cloudinary.com/dlb52kdyx/image/upload/v1770294950/IMG_1585.JPG_qucalm.jpg"
                                alt="CEO"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div
                            className="absolute bottom-10 -right-6 bg-white text-[#df1612] py-5 px-8 rounded-2xl shadow-2xl transform rotate-2"
                            style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                        >
                            <p className="text-4xl font-bold leading-none">CEO</p>
                            <p className="text-[9px] uppercase font-bold tracking-[0.2em] mt-2 opacity-70">Founder Note</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT - CONTENT */}
                <div className="col-span-1 lg:col-span-5 relative z-10 lg:pl-16">
                    <div ref={textContentRef} className="flex flex-col gap-10">

                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#df1612] text-xs md:text-sm font-bold uppercase tracking-[0.4em] opacity-80">The Journey</h3>
                            <div className="w-16 h-[2px] bg-white opacity-30" />
                        </div>

                        <h2
                            ref={titleRef}
                            className="text-[10vw] lg:text-[5vw] font-bold text-[#df1612] leading-[0.85] uppercase italic"
                            style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                        >
                            CEO's Story - Archaelix Ventures
                        </h2>


                        <div className="flex flex-col gap-8 max-w-lg">
                            <p className="text-[#000000] text-lg md:text-xl text-justify font-medium leading-relaxed tracking-tight" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                "Archaelix Tech Ventures was not born in a boardroom, a conference hall, or through long corporate discussions. It was born in a hospital bed out of pain, reflection, and an unshakable determination to build something meaningful.."
                            </p>

                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[#df1612] text-2xl md:text-3xl font-bold uppercase leading-none tracking-tight" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>Tharun  Ravichandran</span>
                                    <span className="text-[#df1612]/50 text-[10px] uppercase font-bold tracking-[0.3em] mt-3">Visionary & Founder</span>
                                </div>
                            </div>
                        </div>

                        {/* ACTION - Standardized RoundButton */}
                        <div className="mt-8">
                            <RoundButton
                                title="Read Full Story"
                                href="/ceo"
                                variant="darkWhite"
                            />
                        </div>

                    </div>
                </div>

            </div>

            <style jsx>{`
                .animate-spin-slow {
                    animation: spin 25s linear infinite;
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

