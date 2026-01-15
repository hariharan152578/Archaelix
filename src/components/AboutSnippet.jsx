'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import RoundButton from './RoundButton';
import { HiOutlineChartBar, HiOutlineCode, HiOutlineTrendingUp } from 'react-icons/hi';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AboutSnippet = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Content fade in
            gsap.fromTo(contentRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

            // Cards stagger animation
            const cards = cardsRef.current?.querySelectorAll('.highlight-card');
            if (cards?.length) {
                gsap.fromTo(cards,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsRef.current,
                            start: "top 80%",
                        }
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const highlights = [
        {
            title: "Digital Marketing",
            desc: "SEO, Social Media & PPC",
            Icon: HiOutlineChartBar
        },
        {
            title: "IT Services",
            desc: "Web, Mobile & Cloud",
            Icon: HiOutlineCode
        },
        {
            title: "Business Consulting",
            desc: "Strategy & Growth",
            Icon: HiOutlineTrendingUp
        },
    ];

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 md:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white overflow-hidden"
        >
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23df1612' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-7xl relative z-10">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Left - Text Content */}
                    <div ref={contentRef} className="lg:col-span-5 flex flex-col gap-6">
                        {/* Label */}
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-[2px] bg-[#df1612]" />
                            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[#df1612]">
                                About Us
                            </span>
                        </div>

                        {/* Heading */}
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[0.95] tracking-tight uppercase"
                            style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                        >
                            Results-Driven <br />
                            <span className="italic text-[#df1612]">Digital Solutions</span>
                        </h2>

                        {/* Description */}
                        <p
                            className="text-lg md:text-xl text-gray-600 leading-relaxed"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                        >
                            Archaelix is a results-driven digital marketing, IT services, and business consulting company helping businesses grow, scale, and succeed in the digital era.
                        </p>

                        {/* CTA Button */}
                        <div className="mt-2">
                            <RoundButton
                                title="Learn More"
                                href="/about"
                                variant="dark"
                            />
                        </div>
                    </div>

                    {/* Right - Highlight Cards */}
                    <div ref={cardsRef} className="lg:col-span-7">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                            {highlights.map((item, i) => (
                                <div
                                    key={i}
                                    className="highlight-card group relative p-6 md:p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#df1612]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl cursor-default"
                                >
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#df1612]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative z-10">
                                        {/* Icon */}
                                        <div className="w-12 h-12 md:w-14 md:h-14 mb-5 text-[#df1612] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                                            <item.Icon className="w-10 h-10 md:w-12 md:h-12" />
                                        </div>

                                        {/* Title */}
                                        <h3
                                            className="text-xl md:text-2xl font-semibold text-[#0F172A] mb-2"
                                            style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                                        >
                                            {item.title}
                                        </h3>

                                        {/* Description */}
                                        <p
                                            className="text-gray-500 text-sm md:text-base"
                                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                                        >
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Decorative corner accent */}
                                    <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                                        <div className="absolute -top-8 -right-8 w-16 h-16 bg-[#df1612]/5 rotate-45 group-hover:bg-[#df1612]/10 transition-colors duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quote Section - Light Design */}
                        <div className="mt-6 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 relative overflow-hidden">
                            {/* Decorative accent line */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#df1612] to-[#df1612]/30" />

                            <div className="pl-4 md:pl-6">
                                <p
                                    className="text-gray-700 text-base md:text-lg leading-relaxed italic"
                                    style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                                >
                                    "We believe that successful digital transformation begins with understanding business challenges. Our team collaborates closely with clients to build scalable, secure, and performance-focused digital ecosystems."
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <div className="w-8 h-[1px] bg-[#df1612]" />
                                    <span className="text-[#df1612] text-xs uppercase tracking-widest font-semibold">Archaelix Philosophy</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutSnippet;
