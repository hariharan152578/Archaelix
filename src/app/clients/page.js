"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import RoundButton from "../../components/RoundButton";
import StaggeredMenu from "../../components/StaggeredMenu";
import SmoothScroll from "../../components/SmoothScroll";
import SplashScreen from "../../components/SplashScreen";
import Footer from "../../components/Footer";

const ClientSection = () => {
    const [splashComplete, setSplashComplete] = useState(false);
    const [flippedCards, setFlippedCards] = useState({});
    const containerRef = useRef(null);

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
        { label: "Client", link: "/client" },
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const partners = [
        {
            name: "Velora",
            tag: "End-to-End Brand Development",
            shortDesc: "A research-driven approach to building a consumer brand from the ground up.",
            fullDesc: "Velora is an emerging consumer brand with a strong long-term vision. Over the past 6–8 months, Archaelix has been closely working with the Velora team to build the brand from the ground up through a structured, research-driven approach. Our engagement began with in-depth R&D and documentation, focusing on defining the brand’s identity, positioning, and long-term roadmap. We are handling visual design systems, product concepts, and digital experience strategy.",
            color: "#df1612"
        },
        {
            name: "Elavarasi Foods",
            tag: "Ongoing Brand Transformation",
            shortDesc: "Comprehensive rebranding and digital evolution for a leading Kerala brand.",
            fullDesc: "Elavarasi Foods is currently partnering with us for a comprehensive rebranding. Over several months, we have been engaged in brand redesign, e-commerce development, and strategic marketing. Our work involves in-depth research to determine optimal locations for new retail outlets and crafting targeted offline/online marketing strategies.",
            color: "#0F172A"
        },
        {
            name: "LAP",
            tag: "Revolutionizing Technology",
            shortDesc: "Bringing a new evolution of technology to students across various educational fields.",
            fullDesc: "LAP is an innovative software project designed to enhance the learning experience through cutting-edge technology. Whether for arts, engineering, medical colleges, or schools, LAP aims to empower students with seamless access to educational tools. Our team is dedicated to developing a robust, user-friendly platform that caters to diverse needs.",
            color: "#df1612"
        },
        {
            name: "Aurli Rue",
            tag: "Women's Accessories",
            shortDesc: "Comprehensive end-to-end brand development for elegant jewelry and accessories.",
            fullDesc: "Aurli Rue specializes in elegant jewelry. Over the past five months, we have collaborated closely to deliver thorough R&D, brand redesign, and a robust digital presence. We are focused on creating a cohesive brand identity and an intuitive e-commerce platform that reflects the brand’s essence.",
            color: "#0F172A"
        },
        {
            name: "RM Construction",
            tag: "Construction & Infrastructure",
            shortDesc: "End-to-end digital branding and website development for a modern construction company.",
            fullDesc: "For RM Construction, we delivered a complete digital transformation focused on building a strong and professional online presence. Our work included brand positioning, website design, and development tailored to showcase their construction expertise, project portfolio, and service offerings. We crafted a clean, structured, and performance-optimized website that reflects their commitment to quality, durability, and precision,It generate qualified client inquiries through a seamless and user-friendly experience.",
            color: "#1E293B"
        }

    ];

    const toggleFlip = (index) => {
        const card = document.querySelector(`.card-inner-${index}`);
        const isFlipped = flippedCards[index];

        gsap.to(card, {
            rotateY: isFlipped ? 0 : 180,
            duration: 0.8,
            ease: "back.out(1.2)"
        });

        setFlippedCards({ ...flippedCards, [index]: !isFlipped });
    };

    useEffect(() => {
        if (!splashComplete) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.from(".client-sticky-content", {
                opacity: 0, x: -60, duration: 1.2, ease: "power4.out",
                scrollTrigger: { trigger: ".client-sticky-content", start: "top 85%" }
            });

            gsap.utils.toArray(".client-card-wrapper").forEach((card) => {
                gsap.from(card, {
                    y: 100, opacity: 0, duration: 1, ease: "power3.out",
                    scrollTrigger: { trigger: card, start: "top 90%" }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, [splashComplete]);

    return (
        <>
            <SmoothScroll />
            <SplashScreen onComplete={() => setSplashComplete(true)} />
            
            <div ref={containerRef} className={`w-full bg-[#F2F2F2] transition-opacity duration-1000 ${!splashComplete ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
                <StaggeredMenu items={menuItems} logoText="Archaelix" menuButtonColor="#0F172A" openMenuButtonColor="#0F172A" accentColor="#df1612" />

                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                    <h1 className="bg-watermark text-[25vw] font-black text-black/[0.02] leading-none uppercase italic">Archaelix</h1>
                </div>

                <main className="relative z-10 max-w-[1800px] mx-auto px-6 md:px-12 lg:px-20 pt-48 pb-32">
                    <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
                        
                        <div className="lg:w-2/5 lg:sticky lg:top-40 h-auto client-sticky-content">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="h-[2px] w-12 bg-[#df1612]"></span>
                                <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-[#0F172A]">Partners</h3>
                            </div>
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#0F172A] leading-[0.85] uppercase italic mb-8" style={{ fontFamily: "var(--font-founders, sans-serif)" }}>
                                Strategic <br /> Partners.
                            </h2>
                            <p className="text-xl text-[#0F172A]/70 leading-relaxed mb-10 max-w-sm">
                                We act as a strategic partner to transform ambitious ideas into launch-ready, scalable brands.
                            </p>
                            <RoundButton title="Start a Project" href="/contact" />
                        </div>

                        <div className="lg:w-3/5 w-full">
                            {/* Fixed grid: added row-gap for mobile to prevent overlap */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-6 lg:gap-10">
                                {partners.map((partner, index) => (
                                    <div 
                                        key={index} 
                                        className={`client-card-wrapper perspective-1000 h-[500px] md:h-[550px] lg:h-[600px] w-full ${index % 2 !== 0 ? 'md:translate-y-24' : ''}`}
                                    >
                                        <div className={`card-inner-${index} relative w-full h-full transition-all duration-500 preserve-3d`}>
                                            
                                            {/* FRONT FACE */}
                                            <div className={`absolute inset-0 backface-hidden p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between shadow-xl
                                                ${index % 2 !== 0 ? 'bg-[#0F172A] text-white' : 'bg-white text-[#0F172A]'}`}>
                                                <div>
                                                    <span className={`text-[9px] inline-block uppercase font-bold tracking-widest px-4 py-2 rounded-full border ${index % 2 !== 0 ? 'border-white/20' : 'border-[#0F172A]/10'}`}>
                                                        {partner.tag}
                                                    </span>
                                                    <h4 className="text-3xl md:text-4xl font-bold italic mt-8 md:mt-10 mb-6 uppercase" style={{ fontFamily: "var(--font-founders, sans-serif)" }}>{partner.name}</h4>
                                                    <p className="text-base md:text-lg opacity-70 leading-snug">{partner.shortDesc}</p>
                                                </div>
                                                <button onClick={() => toggleFlip(index)} className="group flex justify-between items-end w-full outline-none mt-4">
                                                    <span className="text-xs font-bold uppercase tracking-widest opacity-40">View Case Study</span>
                                                    <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all group-hover:bg-[#df1612] group-hover:border-[#df1612] ${index % 2 !== 0 ? 'border-white/20' : 'border-[#0F172A]/20'}`}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                                                    </div>
                                                </button>
                                            </div>

                                            {/* BACK FACE */}
                                            <div className={`absolute inset-0 backface-hidden p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] flex flex-col justify-between shadow-xl rotate-y-180
                                                ${index % 2 !== 0 ? 'bg-white text-[#0F172A]' : 'bg-[#0F172A] text-white'}`}>
                                                <div className="overflow-y-auto custom-scrollbar pr-2">
                                                    <h4 className="text-2xl font-bold uppercase mb-4 italic" style={{ fontFamily: "var(--font-founders, sans-serif)" }}>Project Details</h4>
                                                    <p className="text-sm md:text-base leading-relaxed text-justify opacity-90">{partner.fullDesc}</p>
                                                </div>
                                                <button onClick={() => toggleFlip(index)} className="mt-6 text-xs font-bold uppercase tracking-[0.2em] underline decoration-[#df1612] decoration-2 underline-offset-4 self-start">
                                                    Back to Overview
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-32 md:mt-48 p-8 md:p-16 bg-[#df1612] rounded-[2.5rem] md:rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
                                <div className="relative z-10 text-center md:text-left">
                                    <h3 className="text-4xl md:text-5xl font-bold italic mb-4 uppercase" style={{ fontFamily: "var(--font-founders, sans-serif)" }}>Ready to scale?</h3>
                                    <p className="text-white/80 text-lg">Let's build your brand's digital legacy together.</p>
                                </div>
                                <div className="relative z-10">
                                    <RoundButton title="View All Works" href="/projects" variant="light" />
                                </div>
                                <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>

            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .preserve-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #df1612; border-radius: 10px; }
            `}</style>
        </>
    );
};

export default ClientSection;