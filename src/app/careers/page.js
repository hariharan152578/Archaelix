'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import StaggeredMenu from '../../components/StaggeredMenu';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import SplashScreen from '../../components/SplashScreen';
import ScrollFloat from '../../components/ScrollFloat';
import RoundButton from '../../components/RoundButton';

export default function CareersPage() {
    const [hoveredPosition, setHoveredPosition] = useState(null);
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
                { label: "Business Consultation", link: "/services/business-consulting" },
                { label: "IT Services", link: "/services/it-services" },
                { label: "Digital Marketing", link: "/services/digital-marketing" },
            ]
        },
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const culturePoints = [
        {
            title: "Collaborative Environment",
            description: "A collaborative and supportive work environment where every voice is heard.",
            icon: "🤝"
        },
        {
            title: "Growth & Development",
            description: "Opportunities for skill development and career progression tailored to you.",
            icon: "📈"
        },
        {
            title: "Innovation Driven",
            description: "Innovation that drives real business results and challenges the status quo.",
            icon: "💡"
        },
        {
            title: "Work-Life Balance",
            description: "A balanced and healthy work-life culture that prioritizes your well-being.",
            icon: "⚖️"
        }
    ];

    const positions = [
        {
            title: "Engineering & Development",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop"
        },
        {
            title: "Digital Marketing & SEO",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
        },
        {
            title: "Business & Client Services",
            image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop"
        },
        {
            title: "IT & Software Solutions",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
        },
        {
            title: "Consulting & Strategy",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        },
        {
            title: "Support & Operations",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop"
        }
    ];

    const journeySteps = [
        { title: "Onboarding", desc: "Structured onboarding programs" },
        { title: "Mentorship", desc: "Mentorship and skill building" },
        { title: "Feedback", desc: "Performance feedback and career pathways" },
        { title: "Exposure", desc: "Cross-functional project exposure" }
    ];

    return (
        <>
            <SmoothScroll />
            <SplashScreen onComplete={() => setSplashComplete(true)} />

            <div className="w-full min-h-screen bg-white text-[#0F172A]">
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
                <section className="relative min-h-[90vh] flex flex-col justify-end px-6 pb-20 pt-32 bg-white text-[#0F172A]">
                    <div className="container mx-auto max-w-[95%] relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                            <div className="w-full lg:w-3/4">
                                <h1 className="text-[13vw] sm:text-[11vw] leading-[0.8] font-semibold uppercase mb-6" style={{ fontFamily: "'FoundersGrotesk', sans-serif", letterSpacing: '0.001em' }}>
                                    <span className="block overflow-hidden">
                                        <span className="block">Grow Your</span>
                                    </span>
                                    <span className="block overflow-hidden">
                                        <span className="block italic text-[#df1612]">Career</span>
                                    </span>
                                    <span className="block overflow-hidden">
                                        <span className="block">At Archaelix</span>
                                    </span>
                                </h1>
                            </div>
                            <div className="w-full lg:w-1/4 pb-4 hidden md:block">
                                <p className="text-xl leading-relaxed font-medium mb-8 max-w-xs ml-auto" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    Join a forward-thinking team defining the future of digital business.
                                </p>
                                <div className="flex justify-end">
                                    <div className="animate-bounce">
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#df1612]">
                                            <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="w-full h-[50vh] md:h-[70vh] rounded-[2rem] overflow-hidden relative group">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop"
                                alt="Archaelix Team"
                                className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                            />
                        </div>
                    </div>
                </section>

                {/* Introduction Text Section */}
                <section className="py-32 px-6 bg-white">
                    <div className="container mx-auto max-w-4xl text-center">
                        <ScrollFloat
                            containerClassName="mb-0"
                            textClassName="text-3xl md:text-5xl text-[#0F172A] leading-tight font-medium"
                            style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                            animationDuration={0.8}
                            stagger={0.01}
                            scrollStart="top 80%"
                            scrollEnd="bottom 40%"
                        >
                            At Archaelix, we are building a dynamic, forward-thinking team that excels in digital marketing, IT services, and business consulting. Join us in delivering meaningful business impact.
                        </ScrollFloat>
                    </div>
                </section>

                {/* Why Work With Us Section */}
                <section className="py-24 px-6 bg-white border-t border-gray-100">
                    <div className="container mx-auto max-w-6xl">
                        <div className="flex flex-col md:flex-row gap-16 items-start">
                            <div className="md:w-1/3 sticky top-32">
                                <h2 className="text-5xl md:text-6xl font-semibold mb-6 tracking-tight uppercase" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                                    Why With Us?
                                </h2>
                                <p className="text-lg text-gray-600 mb-8" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    At Archaelix, we believe that our people are our greatest strength. We foster a people-centric work environment.
                                </p>
                                <RoundButton
                                    href="#open-positions"
                                    title="View Openings"
                                    variant="dark"
                                />
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {culturePoints.map((point, i) => (
                                    <div key={i} className="p-8 rounded-2xl bg-gray-50 hover:bg-[#df1612] hover:text-white transition-all duration-500 group border border-gray-100">
                                        <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{point.icon}</div>
                                        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>{point.title}</h3>
                                        <p className="text-gray-600 group-hover:text-white/90" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>{point.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Journey Section (Horizontal Scroll or Steps) */}
                <section className="py-24 px-6 bg-[#f8f8f8]">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-5xl md:text-6xl font-semibold mb-16 tracking-tight uppercase text-center" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                            Your Journey With Us
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 justify-between relative">
                            {/* Connector Line (Desktop) */}
                            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-200 -z-0"></div>

                            {journeySteps.map((step, i) => (
                                <div key={i} className="relative z-10 flex-1 flex flex-col items-center text-center group">
                                    <div className="w-24 h-24 rounded-full bg-white border-2 border-[#df1612] flex items-center justify-center text-2xl font-bold text-[#df1612] mb-6 group-hover:bg-[#df1612] group-hover:text-white transition-colors duration-300 shadow-lg">
                                        {i + 1}
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>{step.title}</h3>
                                    <p className="text-gray-600 px-4" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>{step.desc}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-center mt-16 text-xl text-gray-500 max-w-2xl mx-auto" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                            We focus on building careers, not just filling roles. We support you from onboarding to continuous learning and leadership development.
                        </p>
                    </div>
                </section>

                {/* Open Positions Section */}
                <section id="open-positions" className="py-32 px-6 bg-white relative overflow-hidden min-h-[60vh]">
                    {/* Background "Diagonal Stick" Image Reveal */}
                    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                        {positions.map((pos, i) => (
                            <div
                                key={i}
                                className={`absolute h-[600px] w-[150%] bg-cover bg-center transition-all duration-700 ease-out origin-center ${hoveredPosition === i
                                        ? 'opacity-50 rotate-[25deg]'
                                        : 'opacity-0 rotate-[25deg]'
                                    }`}
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.8) 100%), url(${pos.image})`,
                                    clipPath: hoveredPosition === i ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                                }}
                            />
                        ))}
                    </div>

                    <div className="container mx-auto max-w-5xl relative z-10">
                        <h2 className="text-5xl md:text-7xl font-semibold mb-16 tracking-tight uppercase text-center" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                            Open Positions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {positions.map((pos, i) => (
                                <div
                                    key={i}
                                    onMouseEnter={() => setHoveredPosition(i)}
                                    onMouseLeave={() => setHoveredPosition(null)}
                                    className="group p-8 bg-white border border-gray-100 rounded-xl transition-all duration-300 cursor-pointer flex justify-between items-center shadow-md hover:shadow-2xl hover:-translate-y-1"
                                >
                                    <span className="text-xl md:text-2xl font-light transition-colors" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                        {pos.title}
                                    </span>
                                    <div className="bg-gray-50 p-2 rounded-full group-hover:bg-[#df1612] group-hover:text-white transition-all duration-300">
                                        <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-16 text-center">
                            <p className="text-gray-500 mb-6 text-lg">Don't see a perfect fit? We're always looking for talent.</p>
                            <a href="mailto:hello@archaelix.design" className="inline-block border-b border-[#df1612] text-xl text-[#0F172A] hover:text-[#df1612] transition-colors pb-1">
                                Send us your resume at hello@archaelix.design
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
