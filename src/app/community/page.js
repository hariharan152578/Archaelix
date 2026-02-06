"use client";

import React, { useState, useRef } from "react";
import StaggeredMenu from "../../components/StaggeredMenu";
import SmoothScroll from "../../components/SmoothScroll";
import SplashScreen from "../../components/SplashScreen";
import Footer from "../../components/Footer";

const Intro = () => {
  const [splashComplete, setSplashComplete] = useState(false);
  const [activePurpose, setActivePurpose] = useState(1);
  const sectionRef = useRef(null);

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

  const purposes = [
    {
      id: 1,
      tag: "SKILL TRAINING",
      title: "Career Guidance & Performance Opportunities",
      content: "Focusing on real skills, execution, and outcomes rather than degrees. We provide domain alignment followed by a free 3-month internship where learning starts from fundamentals.",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 2,
      tag: "ENTREPRENEURSHIP",
      title: "Idea Execution, Guidance & Support",
      content: "Designed for individuals with startup ideas stuck at ideation. We assess feasibility, create structured action plans, and provide mentorship to convert concepts into real outcomes.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 3,
      tag: "DIGITAL LEARNING",
      title: "Skill Sharing Through Social Media",
      content: "Ensuring accessibility for learners unable to attend in-person. We deliver high-quality content across Marketing, Design, Software Development, and AI through digital platforms.",
      img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: 4,
      tag: "BUSINESS GROWTH",
      title: "Performance-Based Business Sales",
      content: "A result-oriented model that evaluates real ability through revenue outcomes. Prove capability through a one-month contract, with salary decided strictly by demonstrated value.",
      img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <SmoothScroll />
      <SplashScreen onComplete={() => setSplashComplete(true)} />

      <div className={`w-full bg-[#fcfcfc] ${!splashComplete ? "overflow-hidden h-screen" : ""}`}>
        <StaggeredMenu
          items={menuItems}
          socialItems={[{ label: "LinkedIn", link: "#" }]}
          logoText="Archaelix"
          menuButtonColor="#0F172A"
          openMenuButtonColor="#0F172A"
          accentColor="#df1612"
        />

        <section ref={sectionRef} className="relative w-full flex flex-col pt-24 overflow-hidden">
          
          {/* HEADER SECTION */}
          <div className="px-8 md:px-20 mb-16 max-w-5xl">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#df1612] mb-4">
              Real Skills • Real Execution • Real Outcomes
            </p>
            <h2 className="text-[11vw] md:text-[9vw] lg:text-[5vw] font-bold leading-[0.9] text-[#0F172A] uppercase" 
                style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
              Archaelix <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#df1612] to-red-400">Initiatives.</span>
            </h2>
          </div>

          {/* INTERACTIVE BENTO GRID */}
          <div className="flex flex-col lg:flex-row gap-4 px-6 md:px-12 w-full h-auto lg:min-h-[600px] items-stretch">
            {purposes.map((p) => {
              const isActive = activePurpose === p.id;

              return (
                <div
                  key={p.id}
                  onClick={() => setActivePurpose(p.id)}
                  className={`relative rounded-[32px] md:rounded-[40px] p-7 md:p-10 cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex-grow overflow-hidden
                    ${isActive 
                      ? "lg:flex-[4] bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100" 
                      : "lg:flex-1 bg-[#F1F1F1] hover:bg-[#EAEAEA]"
                    }
                  `}
                >
                  <div className="relative z-20 h-full flex flex-col justify-between">
                    
                    <div className={`transition-all duration-500 ${isActive ? 'lg:max-w-[50%]' : 'max-w-full'}`}>
                      <span className={`text-[10px] font-black tracking-widest uppercase mb-6 md:mb-8 block transition-colors ${isActive ? 'text-[#df1612]' : 'text-gray-400'}`}>
                        Purpose 0{p.id}
                      </span>

                      <h3 className={`font-bold leading-[1.1] transition-all duration-500 uppercase italic ${isActive ? 'text-2xl md:text-4xl text-[#0F172A]' : 'text-lg md:text-xl text-gray-400'}`}
                          style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                        {p.title}
                      </h3>

                      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isActive ? 'max-h-[1200px] opacity-100 mt-6 md:mt-8' : 'max-h-0 opacity-0'}`}>
                        <div className="w-12 h-[2px] bg-[#df1612] mb-6" />
                        <p className="text-gray-600 text-base md:text-lg text-justify leading-relaxed font-medium">
                          {p.content}
                        </p>

                        {/* MOBILE ONLY IMAGE - Appears inside the flow, not as background */}
                        <div className="lg:hidden mt-8 w-full aspect-video overflow-hidden rounded-2xl">
                          <img 
                            src={p.img} 
                            alt={p.tag} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-8">
                      <span className={`text-[10px] font-bold uppercase tracking-widest transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                        Read Initiative Details
                      </span>
                      
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-sm
                        ${isActive ? "bg-[#df1612] text-white scale-110" : "bg-white text-[#0F172A]"}
                      `}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
                          className={`transition-transform duration-500 ${isActive ? "rotate-0" : "-rotate-45"}`}>
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP ONLY IMAGE - Slides in from side */}
                  <div className={`hidden lg:block absolute top-0 right-0 h-full w-[50%] z-10 pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
                  `}>
                    <div className="relative w-full h-full p-6">
                        <img
                        src={p.img}
                        alt={p.tag}
                        className="w-full h-full object-cover rounded-[32px] shadow-2xl"
                        />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* JOIN COMMUNITY SECTION */}
          <div className="px-6 md:px-12 mt-20 mb-12">
             <div className="bg-[#0F172A] rounded-[32px] md:rounded-[48px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#df1612] blur-[120px] opacity-20 pointer-events-none" />

                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
                    <div className="w-32 h-32 bg-white p-3 rounded-[24px] shadow-inner flex-shrink-0">
                        <img 
                            src="https://res.cloudinary.com/dlb52kdyx/image/upload/v1770291379/WhatsApp_Image_2026-02-05_at_16.41.57_be8h4k.jpg" 
                            alt="WhatsApp QR" 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="max-w-md">
                        <h4 className="text-white font-bold text-2xl md:text-3xl leading-tight uppercase mb-2" style={{ fontFamily: "'FoundersGrotesk', sans-serif" }}>
                            Join Our <span className="text-[#df1612]">WhatsApp</span> <br /> Growth Community
                        </h4>
                        <p className="text-gray-400 text-sm font-medium leading-relaxed">
                            Scan the QR code or click the button to get real-time updates, exclusive career roadmaps, and mentorship guidance directly from the Archaelix team.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 w-full md:w-auto">
                    <a 
                        href="https://chat.whatsapp.com/ItNy10K1SrLG80nv7pJjpV?mode=gi_t" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block bg-[#df1612] hover:bg-white hover:text-[#0F172A] text-white font-bold px-10 py-5 rounded-full transition-all duration-500 text-center uppercase text-sm tracking-[0.2em]"
                    >
                        Join Now
                    </a>
                </div>
            </div>
          </div>

          {/* FOOTER DISCLAIMER */}
          <div className="px-8 md:px-20 mb-24">
            <p className="text-gray-400 font-medium text-[10px] md:text-xs tracking-widest uppercase">
                * All initiatives are performance-driven. Strictly No shortcuts.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Intro;