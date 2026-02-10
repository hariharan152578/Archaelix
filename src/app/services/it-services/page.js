'use client';

import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import StaggeredMenu from '../../../components/StaggeredMenu';
import Footer from '../../../components/Footer';
import SmoothScroll from '../../../components/SmoothScroll';
import SplashScreen from '../../../components/SplashScreen';
import RoundButton from '../../../components/RoundButton';

export default function ITServicesPage() {
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
        {label:"Clients" ,link:"/clients"},
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const offerings = [
        {
            title: "Web",
            short: "Development",
            description: "Our web development services help businesses build fast, secure, and user-friendly websites that drive engagement and conversions. We design and develop responsive websites, landing pages, and web applications optimized for performance, SEO, and user experience.",
            detail: "By combining modern technologies, clean design, and scalable architecture, we deliver web development solutions that support business growth and long-term digital success.",
            bg: "bg-[#F8FAFC]",
            text: "text-[#0F172A]"
        },
        {
            title: "Mobile App",
            short: "Development",
            description: "Our mobile app development services help businesses build high-performance, secure, and user-friendly mobile applications for Android and iOS platforms. We design and develop custom mobile apps tailored to your business needs, user experience, and scalability requirements.",
            detail: "By combining modern technologies, intuitive UI/UX design, and robust backend systems, we deliver mobile app development solutions that enhance customer engagement and support long-term business growth.",
            bg: "bg-[#0F172A]",
            text: "text-white"
        },
        {
            title: "Cloud",
            short: "Solutions",
            description: "Our cloud solutions help businesses securely store, manage, and scale their data and applications with high availability and performance. We provide cloud consulting, deployment, migration, and management services tailored to your business requirements.",
            detail: "By leveraging modern cloud technologies, we help organizations improve flexibility, reduce infrastructure costs, enhance security, and support scalable digital growth.",
            bg: "bg-[#F8FAFC]",
            text: "text-[#0F172A]"
        },
        {
            title: "UI/UX",
            short: "Design",
            description: "Our UI/UX design services focus on creating intuitive, visually appealing, and user-centered digital experiences. We design user interfaces and user journeys that improve usability, increase engagement, and enhance customer satisfaction across websites and mobile applications.",
            detail: "By combining user research, wireframing, and data-driven design principles, we deliver UI/UX design solutions that support higher conversions and long-term business success.",
            bg: "bg-[#df1612]",
            text: "text-white"
        },
        {
            title: "DevOps",
            short: "& CI/CD",
            description: "Our DevOps and CI/CD services help businesses streamline software development, deployment, and infrastructure management for faster and more reliable releases. We implement automated CI/CD pipelines, infrastructure as code, and monitoring solutions to improve efficiency, scalability, and system stability.",
            detail: "By integrating development and operations with continuous integration and continuous delivery practices, we enable faster deployments, reduced downtime, and improved application performance.",
            bg: "bg-[#0F172A]",
            text: "text-white"
        },
        {
            title: "IT",
            short: "Consulting",
            description: "Our IT consulting services help businesses align technology with their goals to improve efficiency, security, and scalability. We provide expert guidance on IT infrastructure, software solutions, cloud adoption, and digital transformation strategies.",
            detail: "By assessing your current systems and future requirements, our IT consultants deliver practical, cost-effective technology solutions that support long-term business growth.",
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
                                            IT
                                        </span>
                                    </div>
                                    <div className="overflow-hidden">
                                        {/* Line 2: Slides RIGHT from left (-translate-x-full) */}
                                        <span className="hero-line-2 block -translate-x-full opacity-0 text-[#df1612]">
                                            Services
                                        </span>
                                    </div>
                                    <div className="overflow-hidden">
                                        {/* Line 3: Slides UP from bottom (translate-y-full) */}
                                        <span className="hero-line-3 block translate-y-full opacity-0">
                                            Solutions
                                        </span>
                                    </div>
                                </h1>
                            </div>

                            {/* Description Column */}
                            <div className="w-full lg:w-1/4 pb-2">
                                <div className="hero-desc opacity-0">
                                    <div className="hero-line-separator h-0.5 bg-[#df1612] mb-6"></div>
                                    <p className="text-lg md:text-xl font-sans font-light text-[#0F172A] leading-relaxed max-w-sm">
                                        We provide cutting-edge technology solutions that drive digital transformation and sustainable business growth.
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
                            Let's Build Together
                        </h2>
                        <p className="text-xl md:text-2xl font-sans font-light text-white/80 mb-12 leading-relaxed">
                            Transform your ideas into powerful digital solutions with our expert team.
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

