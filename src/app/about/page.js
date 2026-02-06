'use client';

import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import StaggeredMenu from '../../components/StaggeredMenu';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import SplashScreen from '../../components/SplashScreen';
import ScrollFloat from '../../components/ScrollFloat';
import RoundButton from '../../components/RoundButton';

// React Icons
import {
    HiOutlineChartBar,
    HiOutlineSearch,
    HiOutlineShare,
    HiOutlineDocumentText,
    HiOutlineCurrencyDollar,
    HiOutlineCode,
    HiOutlineDeviceMobile,
    HiOutlineCloud,
    HiOutlineCog,
    HiOutlineLightBulb
} from 'react-icons/hi';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function AboutPage() {
    const [splashComplete, setSplashComplete] = useState(false);
    const servicesRef = useRef(null);

    useEffect(() => {
        if (!splashComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';

            // Trigger Hero Animations
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
                .to('.hero-fade-anim', {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2
                }, "-=0.8");

            // Services cards animation
            const ctx = gsap.context(() => {
                gsap.fromTo('.service-card',
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: servicesRef.current,
                            start: "top 70%",
                        }
                    }
                );
            });

            return () => ctx.revert();
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
        //  {label: "Ceo", link: "/ceo" },
        {label:"Client" ,link:"/client"},
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const services = [
        { title: "Digital Marketing", Icon: HiOutlineChartBar },
        { title: "SEO", Icon: HiOutlineSearch },
        { title: "Social Media Marketing", Icon: HiOutlineShare },
        { title: "Content Marketing", Icon: HiOutlineDocumentText },
        { title: "PPC Advertising", Icon: HiOutlineCurrencyDollar },
        { title: "Web Development", Icon: HiOutlineCode },
        { title: "Mobile App Development", Icon: HiOutlineDeviceMobile },
        { title: "Cloud Solutions", Icon: HiOutlineCloud },
        { title: "DevOps & CI/CD", Icon: HiOutlineCog },
        { title: "IT Consulting", Icon: HiOutlineLightBulb },
    ];

    return (
        <>
            <SmoothScroll />
            <SplashScreen onComplete={() => setSplashComplete(true)} />

            <div className="w-full min-h-screen bg-white text-[#0F172A]">
                <StaggeredMenu
                    items={menuItems}
                    socialItems={[
                        { label: "LinkedIn", link: "#" }
                    ]}
                    logoText="Archaelix"
                    menuButtonColor="#0F172A"
                    openMenuButtonColor="#0F172A"
                    accentColor="#df1612"
                />

                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex flex-col justify-end px-6 pb-16 pt-32 bg-white text-[#0F172A]">
                    <div className="container mx-auto max-w-[95%] relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
                            <div className="w-full lg:w-3/4">
                                <div className="mb-6">
                                    <h1 className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[9vw] leading-[0.8] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform" style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}>
                                        <div className="overflow-hidden">
                                            <span className="hero-line-1 block translate-y-full opacity-0">About</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className="hero-line-2 block -translate-x-full opacity-0 italic text-[#df1612]">Archaelix</span>
                                        </div>
                                    </h1>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 pb-4 hidden md:block">
                                <p className="text-xl leading-relaxed font-medium mb-8 max-w-xs ml-auto opacity-0 hero-fade-anim" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    Results-driven digital solutions for the modern business landscape.
                                </p>
                                <div className="flex justify-end opacity-0 hero-fade-anim">
                                    <div className="animate-bounce">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#df1612]">
                                            <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Main About Content - Using ONLY the provided content */}
                <section className="py-20 md:py-32 px-6 bg-white">
                    <div className="container mx-auto max-w-5xl">
                        {/* Paragraph 1 */}
                        <ScrollFloat
                            containerClassName="mb-16"
                            textClassName="text-2xl md:text-3xl lg:text-4xl text-[#0F172A] leading-snug font-medium"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                            animationDuration={0.8}
                            stagger={0.01}
                            scrollStart="top 80%"
                            scrollEnd="bottom 40%"
                        >
                            Archaelix is a results-driven digital marketing, IT services, and business consulting company helping businesses grow, scale, and succeed in the digital era.
                        </ScrollFloat>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                            <div className="flex flex-col gap-8">
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    We specialize in delivering SEO-optimized digital strategies, advanced technology solutions, and strategic consulting services tailored to business goals.
                                </p>
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    As a trusted digital solutions company, Archaelix works with startups, small and medium businesses, and enterprises to strengthen their online presence, improve operational efficiency, and achieve measurable business growth.
                                </p>
                            </div>
                            <div className="flex flex-col gap-8">
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    Our approach combines data-driven marketing, innovative technology, and strategic planning to create long-term value.
                                </p>
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    At Archaelix, we believe that successful digital transformation begins with understanding business challenges. Our team of experienced digital marketing experts, SEO specialists, developers, and business consultants collaborates closely with clients to build scalable, secure, and performance-focused digital ecosystems.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid with React Icons */}
                <section ref={servicesRef} className="py-20 md:py-32 px-6 bg-[#f8f8f8]">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight uppercase mb-6" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                                Our <span className="italic text-[#df1612]">Services</span>
                            </h2>
                            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                We offer a comprehensive range of services. Each solution is designed to align with customer needs, market trends, and performance metrics.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
                            {services.map((service, i) => (
                                <div
                                    key={i}
                                    className="service-card group p-6 md:p-8 bg-white rounded-2xl hover:bg-[#df1612] transition-all duration-500 cursor-pointer border border-gray-100 hover:border-[#df1612] hover:-translate-y-1 hover:shadow-xl flex flex-col items-center text-center"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 mb-4 text-[#df1612] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                                        <service.Icon className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <h3 className="text-sm md:text-base font-semibold text-[#0F172A] group-hover:text-white transition-colors leading-tight" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                                        {service.title}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Commitment Section - Using ONLY the provided content */}
                <section className="py-20 md:py-32 px-6 bg-[#df1612] relative overflow-hidden">
                    {/* Background Text */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none overflow-hidden opacity-5">
                        <h2
                            className="text-[30vw] font-bold leading-none text-white whitespace-nowrap uppercase italic tracking-tighter"
                            style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                        >
                            ARCHAELIX
                        </h2>
                    </div>

                    <div className="container mx-auto max-w-4xl relative z-10 text-center">
                        <ScrollFloat
                            containerClassName="mb-12"
                            textClassName="text-2xl md:text-3xl lg:text-4xl text-white leading-snug font-medium"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                            animationDuration={0.8}
                            stagger={0.01}
                            scrollStart="top 80%"
                            scrollEnd="bottom 40%"
                        >
                            Our commitment is to deliver measurable results, transparent communication, and continuous optimization. Whether it is improving search engine rankings, generating qualified leads, optimizing technology infrastructure, or building a strong digital brand — Archaelix partners with businesses at every stage of growth.
                        </ScrollFloat>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <RoundButton
                                title="Get In Touch"
                                href="/contact"
                                variant="darkWhite"
                            />
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
