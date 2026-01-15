'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import StaggeredMenu from '../../../components/StaggeredMenu';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import SplashScreen from '../../../components/SplashScreen';
import RoundButton from '../../../components/RoundButton';

export default function BusinessConsultationPage() {
    const [splashComplete, setSplashComplete] = useState(false);

    // Lock scroll during splash screen
    useEffect(() => {
        if (!splashComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';

            // Trigger GSAP Hero Animations matching Careers Page exactly
            const tl = gsap.timeline();

            tl.to('.hero-line-1', {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                delay: 0.2
            })
                .to('.hero-line-2', {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out"
                }, "<0.15")
                .to('.hero-line-3', {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out"
                }, "<0.15")
                .fromTo('.hero-desc',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
                    "-=1"
                )
                .fromTo('.hero-line-separator',
                    { width: 0, opacity: 0 },
                    { width: '4rem', opacity: 1, duration: 1, ease: "power2.out" },
                    "-=1"
                );
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [splashComplete]);

    const menuItems = [
        { label: "Home", link: "/" },
        { label: "About", link: "/about" },
        {
            label: "Services",
            subItems: [
                { label: "Business Consultation", link: "/services/business-consulting" },
                { label: "IT Services", link: "/services/it-services" },
                { label: "Digital Marketing", link: "/services/digital-marketing" },
            ]
        },
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const offerings = [
        {
            title: "Business Strategy",
            short: "Consulting",
            description: "Our business strategy consulting services help organizations define clear goals, identify growth opportunities, and build practical strategies for long-term success. We work closely with startups, SMEs, and enterprises to develop data-driven business strategies, market positioning plans, and scalable growth models.",
            detail: "By combining industry insights, competitor analysis, and operational planning, our business strategy consultants deliver actionable roadmaps that improve decision-making, optimize resources, and drive sustainable business growth.",
            bg: "bg-[#F8FAFC]",
            text: "text-[#0F172A]"
        },
        {
            title: "Startup",
            short: "Consulting",
            description: "Our startup consulting services help entrepreneurs turn ideas into scalable businesses with the right strategy, structure, and execution. We support startups at every stage from idea validation and business model development to go-to-market strategy and growth planning.",
            detail: "With expert startup consultants, market research, and data-driven insights, we help startups reduce risks, attract customers, and build sustainable business growth.",
            bg: "bg-[#0F172A]",
            text: "text-white"
        },
        {
            title: "Digital Business",
            short: "Consulting",
            description: "Our digital business consulting services help organizations leverage technology, data, and digital strategies to accelerate growth and improve operational efficiency. We guide businesses through digital transformation, online business strategy, automation, and technology adoption.",
            detail: "With expert digital business consultants, we create customized digital roadmaps that enhance customer experience, streamline processes, and drive measurable business results.",
            bg: "bg-[#F8FAFC]",
            text: "text-[#0F172A]"
        },
        {
            title: "IT Consulting",
            short: "Services",
            description: "Our IT consulting services help businesses plan, implement, and manage the right technology solutions to improve performance, security, and scalability. We provide expert guidance on IT infrastructure, software solutions, cloud adoption, and digital systems aligned with your business goals.",
            detail: "With experienced IT consultants and a strategic approach, we help organizations optimize technology investments, reduce risks, and support long-term digital growth.",
            bg: "bg-[#df1612]",
            text: "text-white"
        }
    ];

    return (
        <>
            <SmoothScroll />
            <SplashScreen onComplete={() => setSplashComplete(true)} />

            {/* Main Content Container - fades in after splash */}
            <div className={`w-full min-h-screen bg-white transition-opacity duration-700 ${splashComplete ? 'opacity-100' : 'opacity-0'}`}>
                <StaggeredMenu
                    items={menuItems}
                    socialItems={[
                        { label: "Instagram", link: "#" },
                        { label: "LinkedIn", link: "#" },
                        { label: "Twitter", link: "#" }
                    ]}
                    logoText="Archaelix"
                    menuButtonColor="#0F172A"
                    openMenuButtonColor="#0F172A"
                    accentColor="#df1612"
                />

                {/* Animated Hero Section */}
                <section className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-16 pb-20 pt-32 lg:pt-40 overflow-hidden">
                    <div className="container mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8">

                            {/* Title Column */}
                            <div className="w-full lg:w-3/4">
                                <h1 className="text-[16.5vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.75] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform" style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}>
                                    <div className="overflow-hidden">
                                        {/* Line 1: Slides UP from bottom (translate-y-full) */}
                                        <span className="hero-line-1 block translate-y-full opacity-0">
                                            Business
                                        </span>
                                    </div>
                                    <div className="overflow-hidden">
                                        {/* Line 2: Slides RIGHT from left (-translate-x-full) */}
                                        <span className="hero-line-2 block -translate-x-full opacity-0 text-[#df1612]">
                                            Optimization
                                        </span>
                                    </div>
                                    <div className="overflow-hidden">
                                        {/* Line 3: Slides UP from bottom (translate-y-full) */}
                                        <span className="hero-line-3 block translate-y-full opacity-0">
                                            Services
                                        </span>
                                    </div>
                                </h1>
                            </div>

                            {/* Description Column */}
                            <div className="w-full lg:w-1/4 pb-2">
                                <div className="hero-desc opacity-0">
                                    <div className="hero-line-separator h-0.5 bg-[#df1612] mb-6"></div>
                                    <p className="text-lg md:text-xl font-sans font-light text-[#0F172A] leading-relaxed max-w-sm">
                                        Our integrated digital marketing, IT, and business consulting services help organizations scale effectively through strategic planning and smart technology adoption.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Services Series */}
                <div className="flex flex-col">
                    {offerings.map((item, index) => (
                        <section
                            key={index}
                            className={`py-24 px-6 md:px-12 lg:px-16 ${item.bg} ${item.text}`}
                        >
                            <div className="container mx-auto">
                                <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
                                    <div className="lg:w-1/3">
                                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-heading font-bold uppercase leading-none opacity-90">
                                            {item.title}
                                            <span className="block text-3xl md:text-4xl mt-2 font-normal font-sans opacity-60 tracking-normal capitalize">
                                                {item.short}
                                            </span>
                                        </h2>
                                    </div>
                                    <div className="lg:w-2/3 lg:pt-4">
                                        <div className="max-w-3xl space-y-8">
                                            <p className="text-xl md:text-2xl font-sans font-light leading-relaxed border-l-2 border-current pl-6 opacity-90">
                                                {item.description}
                                            </p>
                                            <p className="text-lg md:text-xl font-sans opacity-75">
                                                {item.detail}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* CTA Section */}
                <section className="py-32 px-6 bg-[#0F172A] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#df1612] opacity-5 -skew-x-12 transform translate-x-1/4"></div>

                    <div className="container mx-auto relative z-10 text-center max-w-4xl">
                        <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8 uppercase">
                            Ready to Scale?
                        </h2>
                        <p className="text-xl md:text-2xl font-sans font-light text-white/80 mb-12 leading-relaxed">
                            Let's transform your vision into a sustainable reality with our expert consultation.
                        </p>

                        <div className="flex justify-center">
                            <RoundButton
                                href="/contact"
                                title="Start Your Transformation"
                                variant="white"
                            />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
