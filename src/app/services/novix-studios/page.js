'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StaggeredMenu from '../../../components/StaggeredMenu';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import SplashScreen from '../../../components/SplashScreen';

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
        {
            label: "Services",
            subItems: [
                { label: "Digital Marketing", link: "/services/digital-marketing" },
                { label: "IT Services", link: "/services/it-services" },
                { label: "Novix Studios", link: "/services/novix-studios" },
            ]
        },
        { label: "Contact", link: "/contact" },
    ];

    const services = [
        {
            title: "Brand Identity",
            description: "Create a distinctive brand identity that sets you apart from the competition.",
            icon: "🎯",
        },
        {
            title: "Video Production",
            description: "Cinematic video content that tells your story and captivates your audience.",
            icon: "🎬",
        },
        {
            title: "Motion Graphics",
            description: "Dynamic animations and visual effects that bring your brand to life.",
            icon: "✨",
        },
        {
            title: "Photography",
            description: "Professional photography services for products, events, and brand imagery.",
            icon: "📸",
        },
        {
            title: "3D Visualization",
            description: "Stunning 3D renders and animations for products and architectural projects.",
            icon: "🎮",
        },
        {
            title: "Creative Direction",
            description: "Strategic creative guidance to ensure cohesive and impactful brand presence.",
            icon: "🎨",
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
                    logoText="archaelix"
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
                                    className="group p-8 rounded-2xl border border-gray-200 hover:border-[#df1612] transition-all duration-300 hover:shadow-xl"
                                >
                                    <span className="text-4xl mb-4 block">{service.icon}</span>
                                    <h3
                                        className="text-xl font-semibold text-[#0F172A] mb-3"
                                        style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p
                                        className="text-gray-600"
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
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#df1612] text-white rounded-full text-lg font-medium hover:bg-[#b7120e] transition-colors"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                        >
                            Start Your Project
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}

