'use client';

import React, { useState, useEffect } from 'react';
import StaggeredMenu from '../../../components/StaggeredMenu';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import SplashScreen from '../../../components/SplashScreen';
import RoundButton from '../../../components/RoundButton';

// React Icons
import {
    HiOutlineSparkles,
    HiOutlineFilm,
    HiOutlineStar,
    HiOutlineCamera,
    HiOutlineCube,
    HiOutlineColorSwatch
} from 'react-icons/hi';

export default function NovixStudiosPage() {
    const [splashComplete, setSplashComplete] = useState(false);

    // Lock scroll during splash screen
    useEffect(() => {
        if (!splashComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
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

    const services = [
        {
            title: "Brand Identity",
            description: "Create a distinctive brand identity that sets you apart from the competition.",
            Icon: HiOutlineSparkles,
        },
        {
            title: "Video Production",
            description: "Cinematic video content that tells your story and captivates your audience.",
            Icon: HiOutlineFilm,
        },
        {
            title: "Motion Graphics",
            description: "Dynamic animations and visual effects that bring your brand to life.",
            Icon: HiOutlineStar,
        },
        {
            title: "Photography",
            description: "Professional photography services for products, events, and brand imagery.",
            Icon: HiOutlineCamera,
        },
        {
            title: "3D Visualization",
            description: "Stunning 3D renders and animations for products and architectural projects.",
            Icon: HiOutlineCube,
        },
        {
            title: "Creative Direction",
            description: "Strategic creative guidance to ensure cohesive and impactful brand presence.",
            Icon: HiOutlineColorSwatch,
        },
    ];

    return (
        <>
            <SmoothScroll />

            {/* Splash Screen */}
            <SplashScreen onComplete={() => setSplashComplete(true)} />

            <div className="w-full min-h-screen bg-white">
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

                {/* Hero Section */}
                <section
                    className="min-h-screen flex items-center justify-center relative overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #f2423e 0%, #df1612 50%, #b7120e 100%)' }}
                >
                    <div className="container mx-auto px-6 py-20 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                            Back to Home
                        </Link>

                        <h1
                            className="text-[12vw] md:text-[10vw] lg:text-[8vw] text-white leading-[0.9] tracking-tight uppercase mb-8"
                            style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}
                        >
                            Novix<br />Studios
                        </h1>

                        <p
                            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                        >
                            We scale your digital presence with premium creative production and visual storytelling to maximize your impact.
                        </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
                </section>

                {/* Services Grid */}
                <section className="py-20 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl text-[#0F172A] text-center mb-16"
                            style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}
                        >
                            Our Services
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className="group p-8 rounded-2xl border border-gray-200 hover:border-[#df1612] hover:bg-[#df1612] transition-all duration-300 hover:shadow-xl"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 mb-4 text-[#df1612] group-hover:text-white transition-colors duration-300 flex items-center justify-center">
                                        <service.Icon className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <h3
                                        className="text-xl font-semibold text-[#0F172A] group-hover:text-white mb-3 transition-colors duration-300"
                                        style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p
                                        className="text-gray-600 group-hover:text-white/90 transition-colors duration-300"
                                        style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                                    >
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6 bg-[#0F172A]">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl text-white mb-8"
                            style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}
                        >
                            Create Something Amazing
                        </h2>
                        <p
                            className="text-xl text-white/80 mb-12"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                        >
                            Let's bring your creative vision to life with stunning visuals and compelling stories.
                        </p>
                        <div className="flex justify-center">
                            <RoundButton
                                href="/contact"
                                title="Start Your Project"
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

