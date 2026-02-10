'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import StaggeredMenu from '../../components/StaggeredMenu';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import SplashScreen from '../../components/SplashScreen';
import ScrollFloat from '../../components/ScrollFloat';
import RoundButton from '../../components/RoundButton';

// React Icons
import { HiOutlineUserGroup, HiOutlineTrendingUp, HiOutlineLightBulb, HiOutlineScale } from 'react-icons/hi';

export default function CareersPage() {
    const [hoveredPosition, setHoveredPosition] = useState(null);
    const [splashComplete, setSplashComplete] = useState(false);
    
    // Form & Modal States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

    // Lock scroll during splash screen
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
                .to('.hero-line-3', {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power4.out"
                }, "<0.15")
                .to('.hero-scale-anim', {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out"
                }, "-=1")
                .to('.hero-fade-anim', {
                    opacity: 1,
                    duration: 1,
                    stagger: 0.2
                }, "-=0.8");
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [splashComplete]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formData = new FormData(e.currentTarget);

        try {
            // Adjust the endpoint to your actual mailer API
            const response = await fetch('/api/submit-resume', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setSubmitStatus('success');
                setTimeout(() => {
                    setIsModalOpen(false);
                    setSubmitStatus(null);
                }, 3000);
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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
        {label:"Clients" ,link:"/clients"},
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const culturePoints = [
        {
            title: "Collaborative Environment",
            description: "A collaborative and supportive work environment where every voice is heard.",
            Icon: HiOutlineUserGroup
        },
        {
            title: "Growth & Development",
            description: "Opportunities for skill development and career progression tailored to you.",
            Icon: HiOutlineTrendingUp
        },
        {
            title: "Innovation Driven",
            description: "Innovation that drives real business results and challenges the status quo.",
            Icon: HiOutlineLightBulb
        },
        {
            title: "Work-Life Balance",
            description: "A balanced and healthy work-life culture that prioritizes your well-being.",
            Icon: HiOutlineScale
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
                    socialItems={[{ label: "LinkedIn", link: "#" }]}
                    logoText="Archaelix"
                    menuButtonColor="#0F172A"
                    openMenuButtonColor="#0F172A"
                    accentColor="#df1612"
                />

                {/* Hero Section */}
                <section className="relative min-h-[90vh] flex flex-col justify-end px-6 pb-20 pt-32 bg-white text-[#0F172A]">
                    <div className="container mx-auto max-w-[95%] relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                            <div className="w-full lg:w-3/4">
                                <div className="mb-6">
                                    <h1 className="text-[16.5vw] sm:text-[14vw] md:text-[11vw] lg:text-[10vw] leading-[0.75] tracking-tight text-[#0F172A] uppercase font-semibold will-change-transform" style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600 }}>
                                        <div className="overflow-hidden">
                                            <span className="hero-line-1 block translate-y-full opacity-0">Grow Your</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className="hero-line-2 block -translate-x-full opacity-0 italic text-[#df1612]">Career</span>
                                        </div>
                                        <div className="overflow-hidden">
                                            <span className="hero-line-3 block translate-y-full opacity-0">At Archaelix</span>
                                        </div>
                                    </h1>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/4 pb-4 hidden md:block">
                                <p className="text-xl leading-relaxed font-medium mb-8 max-w-xs ml-auto opacity-0 hero-fade-anim" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    Join a forward-thinking team defining the future of digital business.
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

                        <div className="w-full h-[50vh] md:h-[70vh] rounded-[2rem] overflow-hidden relative group opacity-0 hero-scale-anim">
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
                        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                            <div className="w-full md:w-1/3 md:sticky md:top-32 md:self-start mb-12 md:mb-0 z-10">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight uppercase" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                                    Why With Us?
                                </h2>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    At Archaelix, we believe that our people are our greatest strength. We foster a people-centric work environment.
                                </p>
                                <RoundButton
                                    href="#open-positions"
                                    title="View Openings"
                                    variant="dark"
                                />
                            </div>
                            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 relative z-0">
                                {culturePoints.map((point, i) => (
                                    <div key={i} className="p-6 sm:p-8 rounded-2xl bg-gray-50 hover:bg-[#df1612] hover:text-white transition-all duration-500 group border border-gray-100 h-full">
                                        <div className="w-10 h-10 md:w-12 md:h-12 mb-4 text-[#df1612] group-hover:text-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center">
                                            <point.Icon className="w-8 h-8 md:w-10 md:h-10" />
                                        </div>
                                        <h3 className="text-2xl font-semibold mb-3 group-hover:text-white" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>{point.title}</h3>
                                        <p className="text-gray-600 group-hover:text-white/90 leading-relaxed" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>{point.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Journey Section */}
                <section className="py-24 px-6 bg-[#f8f8f8]">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-5xl md:text-6xl font-semibold mb-16 tracking-tight uppercase text-center" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                            Your Journey With Us
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 justify-between relative">
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
                <section id="open-positions" className="py-24 md:py-32 px-6 bg-white relative overflow-hidden">
                    <div className="container mx-auto max-w-5xl relative z-10">
                        <h2 className="text-5xl md:text-7xl font-semibold mb-16 tracking-tight uppercase text-center" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                            Open Positions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {positions.map((pos, i) => (
                                <div
                                    key={i}
                                    onClick={() => setIsModalOpen(true)}
                                    onMouseEnter={() => setHoveredPosition(i)}
                                    onMouseLeave={() => setHoveredPosition(null)}
                                    className="group p-8 bg-white border border-gray-100 rounded-xl transition-all duration-300 cursor-pointer flex justify-between items-center shadow-sm hover:shadow-xl hover:bg-[#df1612] hover:border-[#df1612] hover:-translate-y-1"
                                >
                                    <span className="text-xl md:text-2xl font-light transition-colors group-hover:text-white" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                        {pos.title}
                                    </span>
                                    <div className="bg-gray-50 text-black p-2 rounded-full group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                                        <svg   onClick={() => setIsModalOpen(true)} className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-16 text-center">
                            <p className="text-gray-500 mb-6 text-lg">Don't see a perfect fit? We're always looking for talent.</p>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="inline-block border-b border-[#df1612] text-xl text-[#0F172A] hover:text-[#df1612] transition-colors pb-1 cursor-pointer outline-none"
                            >
                                Send us your resume at Archaelix
                            </button>
                        </div>
                    </div>
                </section>

                {/* APPLICATION MODAL */}
               {isModalOpen && (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
        ></div>

        {/* Modal Container */}
        <div className="relative bg-white w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Scrollable Content Area */}
            <div className="overflow-y-auto pr-2 custom-scrollbar">
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-10"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-2xl md:text-3xl font-semibold mb-2" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                    Apply Now
                </h3>
                <p className="text-gray-500 mb-8" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                    Let's build something great together.
                </p>

                {submitStatus === 'success' ? (
                    <div className="py-12 text-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <p className="text-xl font-medium">Application Sent!</p>
                        <p className="text-gray-500">We'll get back to you shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <input 
                                required 
                                name="name" 
                                placeholder="Name" 
                                className="w-full bg-gray-50 border-none p-4 rounded-xl outline-[#df1612]" 
                            />
                            <input 
                                required 
                                name="email" 
                                type="email" 
                                placeholder="Email Address" 
                                className="w-full bg-gray-50 border-none p-4 rounded-xl outline-[#df1612]" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm text-gray-500 mb-2 ml-1">Resume (PDF)</label>
                            <input 
                                required 
                                name="resume" 
                                type="file" 
                                accept=".pdf" 
                                className="w-full bg-gray-50 border-none p-4 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#df1612]/10 file:text-[#df1612] hover:file:bg-[#df1612]/20" 
                            />
                        </div>

                        <textarea 
                            name="message" 
                            rows="3" 
                            placeholder="Tell us about yourself..." 
                            className="w-full bg-gray-50 border-none p-4 rounded-xl outline-[#df1612]"
                        ></textarea>
                        
                        {submitStatus === 'error' && (
                            <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                        )}

                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-[#0F172A] text-white py-4 rounded-xl font-semibold hover:bg-[#df1612] transition-colors disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Send Application"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    </div>
)}
                <Footer />
            </div>
        </>
    );
}