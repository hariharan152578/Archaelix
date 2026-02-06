"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RoundButton from "../../components/RoundButton";
import StaggeredMenu from "../../components/StaggeredMenu";
import SmoothScroll from "../../components/SmoothScroll";
import SplashScreen from "../../components/SplashScreen";
import Footer from "../../components/Footer";

const CEONote = () => {
    const [splashComplete, setSplashComplete] = useState(false);
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const imageRevealRef = useRef(null);

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


    useEffect(() => {
        if (!splashComplete) return;

        if (typeof window !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);
        }

        const ctx = gsap.context(() => {
            // 1. Initial Hero Animations
            gsap.fromTo(".animate-title", 
                { y: 50, opacity: 0 }, 
                {
                    y: 0, opacity: 1, duration: 1.2, ease: "power4.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
                }
            );

            gsap.fromTo(imageRevealRef.current, 
                { scale: 0.9, opacity: 0, y: 30 }, 
                {
                    scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "expo.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 50%" }
                }
            );

            // 2. Parallax Filler Elements (Replacing the road)
            gsap.to(".filler-text", {
                y: -150,
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });

            gsap.to(".filler-line", {
                height: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 40%",
                    end: "bottom 60%",
                    scrub: 0.5
                }
            });

            gsap.fromTo(".reveal-item", 
                { y: 30, opacity: 0 }, 
                {
                    y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 45%",
                    }
                }
            );

        }, sectionRef);

        return () => ctx.revert();
    }, [splashComplete]);

    return (
        <>
            <SmoothScroll />
            <SplashScreen onComplete={() => setSplashComplete(true)} />
            
            <div className={`w-full bg-[#F2F2F2] ${!splashComplete ? 'overflow-hidden h-screen' : ''}`}>
                <StaggeredMenu
                    items={menuItems}
                    logoText="Archaelix"
                    menuButtonColor="#0F172A"
                    openMenuButtonColor="#0F172A"
                    accentColor="#df1612"
                />

                <section ref={sectionRef} className="relative w-full min-h-screen font-sans py-32 overflow-hidden px-8 md:px-20">
                    <div className="max-w-[1800px] mx-auto relative z-10">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32">
                            <div className="col-span-1 lg:col-span-4 flex justify-center">
                                <div ref={imageRevealRef} className="relative w-full max-w-[450px] aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] bg-white p-3">
                                    <div className="w-full h-full rounded-[2rem] overflow-hidden">
                                        <img 
                                            src="https://res.cloudinary.com/dlb52kdyx/image/upload/v1770377344/IMG_1584.JPG_glzool.jpg" 
                                            alt="CEO" 
                                            className="w-full h-full object-cover" 
                                        />
                                    </div>
                                    <div className="absolute bottom-10 -right-6 bg-[#df1612] text-white py-4 px-8 rounded-2xl shadow-2xl transform rotate-2">
                                        <p className="text-3xl font-bold leading-none" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>CEO</p>
                                        <p className="text-[8px] uppercase font-bold tracking-[0.2em] mt-1 opacity-70">Archaelix</p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 lg:col-span-8 flex flex-col justify-center">
                                <div className="reveal-item flex flex-col gap-4 mb-8">
                                    <h3 className="text-[#0F172A] text-xs font-bold uppercase tracking-[0.4em] opacity-60">The Journey</h3>
                                    <div className="w-16 h-[2px] bg-[#df1612]" />
                                </div>

                                <h2 className="animate-title text-[10vw] lg:text-[5vw] font-bold text-[#0F172A] leading-[0.85] uppercase italic mb-10" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                                    CEO's Story - <br /> Archaelix Ventures
                                </h2>

                                <div className="reveal-item text-[#0F172A]/90 text-2xl md:text-3xl font-normal leading-[1.2] tracking-tight max-w-4xl" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    <p>
                                        Archaelix Tech Ventures was not born in a boardroom, a conference hall, or through
                                        long corporate discussions. It was born in a hospital bed out of pain, reflection, and
                                        an unshakable determination to build something meaningful.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div ref={contentRef} className="relative flex flex-col gap-24 max-w-5xl lg:ml-[33.33%]">
                            
                            {/* --- FILLER DESIGN ELEMENTS --- */}
                            <div className="absolute top-0 -left-[25%] h-full w-[20%] hidden lg:flex flex-col items-center z-0 pointer-events-none">
                                {/* Vertical Progressive Line */}
                                <div className="w-[1px] h-full bg-[#0F172A]/10 relative">
                                    <div className="filler-line absolute top-0 left-0 w-full bg-[#df1612] h-0" />
                                </div>
                                
                                {/* Floating Large Background Text */}
                                <div className="absolute top-10 left-0 filler-text">
                                    <h2 className="text-[12rem] font-bold text-[#0F172A]/50 rotate-90 origin-left whitespace-nowrap" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                                        RESILIENCE
                                    </h2>
                                </div>

                                <div className="absolute bottom-130 left-0 filler-text">
                                    <h2 className="text-[12rem] font-bold text-[#0F172A]/50 rotate-90 origin-left whitespace-nowrap" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                                        INNOVATION
                                    </h2>
                                </div>

                                {/* Abstract Geometry */}
                                <div className="absolute top-1/2 -translate-y-1/2 w-40 h-40 border border-[#0F172A]/10 rounded-full flex items-center justify-center">
                                     <div className="w-[80%] h-[80%] border border-[#df1612]/20 rounded-full animate-pulse" />
                                </div>
                            </div>

                            {/* Chapter 1: The Catalyst */}
                            <div className="reveal-item group border-t border-[#0F172A]/10 pt-16 flex flex-col gap-8 relative">
                                <h4 className="text-[#0F172A] text-2xl font-bold uppercase italic" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>The Catalyst</h4>
                                <div className="flex flex-col gap-6 text-[#0F172A]/70 text-lg md:text-xl leading-relaxed">
                                    <p>While working at my previous organization, I was traveling for a routine client visit
                                        when a major accident changed everything. The injuries were severe. I underwent
                                        plastic surgery on my forehead, received nearly 20-25 stitches on my hand, and had
                                        three K-wires inserted. What was expected to be a short recovery turned into a long
                                        and uncertain journey. I spent nearly 30 days confined to a hospital bed, with
                                        doctors estimating it could extend to two full months.
                                    </p>
                                    <p className="font-semibold text-[#0F172A] border-l-4 border-[#df1612] pl-6 italic">
                                        That period of forced stillness became the most transformative phase of my life.
                                        While my body was healing, my mind was relentlessly working. From that hospital
                                        bed, I began asking myself the hardest questions: What should I do next? What kind
                                        of company should I build? Who should this company be for? And most importantly,
                                        what problem should it solve?
                                    </p>
                                    <p>I reflected deeply on students both past graduates and those currently studying
                                        individuals who possess interest, basic skills, and genuine curiosity, yet struggle to
                                        find real opportunities to apply their knowledge. Many have the passion, but lack
                                        exposure, guidance, and practical experience. I envisioned a company that would
                                        become a platform for such individuals a place where learning meets real-world
                                        execution, where employees gain experience, confidence, and purpose.</p>
                                </div>
                            </div>

                            {/* Chapter 2: The Vision */}
                            <div className="reveal-item group border-t border-[#0F172A]/10 pt-16 flex flex-col gap-8 relative">
                                <h4 className="text-[#0F172A] text-2xl font-bold uppercase italic" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>Archaelix Vision</h4>
                                <div className="flex flex-col gap-6 text-[#0F172A]/70 text-lg md:text-xl leading-relaxed">
                                    <p>What started as a thought during recovery has today evolved into a multi-vertical
                                        organization operating across three core domains: Digital Marketing, Software
                                        Development, and Artificial Intelligence. Each vertical is designed not just to deliver
                                        services, but to create opportunities, nurture talent, and bridge the gap between
                                        education and industry expectations.</p>
                                    <p>Archaelix Tech Ventures stands as proof that setbacks can become foundations, and
                                        adversity can give birth to purpose. This company is a reminder that even from a
                                        hospital bed, with limited physical movement, powerful ideas can rise ideas strong
                                        enough to build organizations, create impact, and shape futures.</p>
                                </div>
                            </div>

                            {/* Chapter 3: Today */}
                            <div className="reveal-item group border-t border-[#0F172A]/10 pt-16 flex flex-col gap-8 mb-20 relative">
                                <h4 className="text-[#df1612] text-2xl font-bold uppercase italic" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>The Launchpad</h4>
                                <div className="flex flex-col gap-6 text-[#0F172A]/70 text-lg md:text-xl leading-relaxed">
                                    <p>Archaelix Tech Ventures is not merely a company in the conventional sense; it is a
                                        launchpad for individuals who aspire to build meaningful careers through real-world exposure, accountability, and continuous learning. It exists for those willing to put in
                                        the work but seeking direction, structure, and an opportunity to prove themselves.
                                        During my recovery, this vision did not take shape in isolation. The unwavering
                                        support of my loved ones and the dedication of a small but committed team gave
                                        this idea momentum even when my physical capacity was limited. Their belief,
                                        collaboration, and persistence ensured that Archaelix Tech Ventures moved forward
                                        not despite adversity, but because of it.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        <RoundButton title="Get In Touch" href="/contact" variant="dark" />
                                        <RoundButton title="View Careers" href="/careers" variant="outline" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full pointer-events-none overflow-hidden opacity-[0.03]">
                        <h2 className="text-[35vw] font-bold leading-none text-[#0F172A] whitespace-nowrap uppercase italic tracking-tighter" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                            VISIONARY
                        </h2>
                    </div> */}
                </section>
                
                <Footer />
            </div>
        </>
    );
};

export default CEONote;