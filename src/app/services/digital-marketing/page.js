'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import StaggeredMenu from '../../../components/StaggeredMenu';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import SplashScreen from '../../../components/SplashScreen';
import RoundButton from '../../../components/RoundButton';

export default function DigitalMarketingPage() {
    const [splashComplete, setSplashComplete] = useState(false);

    // Lock scroll during splash screen
    useEffect(() => {
        if (!splashComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';

            // Trigger GSAP Hero Animations matching Business Consultation Page exactly
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
           //  {label: "Ceo", link: "/ceo" },
        {label:"Client" ,link:"/client"},
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const offerings = [
        {
            title: "SEO",
            short: "Optimization",
            description: "Our SEO optimization services help businesses improve search engine rankings, increase organic traffic, and attract the right audience. We use proven SEO strategies including keyword research, on-page optimization, technical SEO, and content optimization to ensure your website is easily discoverable on search engines.",
            detail: "By focusing on search intent, website performance, and data-driven improvements, our SEO experts deliver long-term visibility, higher engagement, and measurable online growth.",
            bg: "bg-[#F8FAFC]",
            text: "text-[#0F172A]"
        },
        {
            title: "Social Media",
            short: "Marketing",
            description: "Our social media marketing services help businesses build brand awareness, engage the right audience, and generate consistent leads across major platforms. We create data-driven social media strategies, high-quality content, and targeted ad campaigns to maximize reach and conversions.",
            detail: "By combining creativity, analytics, and platform-specific optimization, we help brands grow their online presence and achieve measurable social media results.",
            bg: "bg-[#0F172A]",
            text: "text-white"
        },
        {
            title: "Content",
            short: "Marketing",
            description: "Our content marketing services help businesses attract, engage, and convert audiences through valuable, relevant, and consistent content. We create SEO-optimized content strategies including blogs, website content, social media creatives, and marketing copy that build brand authority and drive organic growth.",
            detail: "By aligning content with user intent and business goals, we deliver content marketing solutions that improve visibility, increase engagement, and support long-term digital success.",
            bg: "bg-[#F8FAFC]",
            text: "text-[#0F172A]"
        },
        {
            title: "PPC",
            short: "Advertising",
            description: "Our PPC advertising services help businesses drive instant traffic, generate qualified leads, and achieve measurable ROI through highly targeted paid advertising campaigns. We plan, manage, and optimize pay-per-click ads across Google Ads and leading social media platforms to reach the right audience at the right time.",
            detail: "Using data-driven keyword research, precise audience targeting, and continuous performance optimization, we ensure your PPC advertising campaigns deliver maximum visibility, higher conversions, and cost-effective results.",
            bg: "bg-[#df1612]",
            text: "text-white"
        },
        {
            title: "Email",
            short: "Marketing",
            description: "Our email marketing services help businesses build strong customer relationships, nurture leads, and increase conversions through personalized and targeted email campaigns. We design, automate, and optimize email marketing strategies that deliver the right message to the right audience at the right time.",
            detail: "By using data-driven segmentation, engaging content, and performance tracking, we ensure your email marketing campaigns achieve higher open rates, improved engagement, and measurable business growth.",
            bg: "bg-[#0F172A]",
            text: "text-white"
        },
        {
            title: "Conversion",
            short: "Rate Optimization",
            description: "Our conversion rate optimization services help businesses turn website visitors into leads and customers by improving user experience, design, and performance. We analyze user behavior, landing pages, and conversion funnels to identify opportunities that increase engagement and conversions.",
            detail: "Using data-driven testing, UX improvements, and continuous optimization, we ensure higher conversion rates, better user journeys, and measurable business growth.",
            bg: "bg-[#F8FAFC]",
            text: "text-[#0F172A]"
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
                        { label: "LinkedIn", link: "#" }
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
                                            Digital
                                        </span>
                                    </div>
                                    <div className="overflow-hidden">
                                        {/* Line 2: Slides RIGHT from left (-translate-x-full) */}
                                        <span className="hero-line-2 block -translate-x-full opacity-0 text-[#df1612]">
                                            Marketing
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
                                        We craft comprehensive digital strategies to boost visibility, engage audiences, and drive measurable online growth for your business.
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
                            Ready to Grow?
                        </h2>
                        <p className="text-xl md:text-2xl font-sans font-light text-white/80 mb-12 leading-relaxed">
                            Let's maximize your digital potential with our data-driven marketing solutions.
                        </p>

                        <div className="flex justify-center">
                            <RoundButton
                                href="/contact"
                                title="Start Your Growth"
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

