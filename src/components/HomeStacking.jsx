'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollFloat from './ScrollFloat';
import CircularButton from './CircularButton';
import pic1 from '../assets/stackasset/1.png';
import pic2 from '../assets/stackasset/2.png';
import pic3 from '../assets/stackasset/3.png';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const HomeStacking = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Section animations for the sticky stacking effect
            const createSectionAnim = (triggerSelector, prevTextSelector, nextTextSelector) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerSelector,
                        start: "top 90%",
                        end: "top 10%",
                        scrub: true,
                    }
                });

                tl.to(prevTextSelector, { opacity: 0, y: "30%" }, "s")
                  .from(nextTextSelector, { opacity: 0, y: "-30%" }, "s");
            };

            createSectionAnim('.main-part-2', '.text-container-1', '.text-container-2');
            createSectionAnim('.main-part-3', '.text-container-2', '.text-container-3');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const sections = [
        {
            id: 1,
            heading: 'Business Consultation',
            description: 'We provide strategic guidance and expert advice to help your business achieve its full potential and navigate complex challenges.',
            img: pic1,
            bgColor: 'linear-gradient(135deg, #df1612 0%, #b7120e 100%)',
            mainClass: 'main-part-1',
            textClass: 'text-container-1',
            buttonText: 'BUSINESS CONSULTATION',
            link: '/services/business-consulting',
        },
        {
            id: 2,
            heading: 'IT Services',
            description: 'Our technical experts deliver robust IT solutions and infrastructure that power your digital transformation and operational excellence.',
            img: pic2,
            bgColor: 'linear-gradient(135deg, #b7120e 0%, #b52914 100%)',
            mainClass: 'main-part-2',
            textClass: 'text-container-2',
            buttonText: 'IT SERVICES',
            link: '/services/it-services',
        },
        {
            id: 3,
            heading: 'Digital Marketing',
            description: 'We craft data-driven digital strategies that align with your business goals and drive measurable results through multi-channel excellence.',
            img: pic3,
            bgColor: 'linear-gradient(135deg, #f2423e 0%, #df1612 50%, #b7120e 100%)',
            mainClass: 'main-part-3',
            textClass: 'text-container-3',
            buttonText: 'DIGITAL MARKETING',
            link: '/services/digital-marketing',
        },
    ];

    return (
        <section ref={containerRef} className="w-full relative z-10 font-sans">
            <div className="relative z-10">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className={`${section.mainClass} min-h-screen flex items-center justify-center sticky top-0`}
                        style={{ background: section.bgColor }}
                    >
                        <div className="container mx-auto px-6 py-16 md:py-20 w-full max-w-7xl">
                            
                            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-12 lg:gap-16`}>
                                
                                {/* Text Half */}
                                <div className={`${section.textClass} w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left`}>
                                    
                                    {/* Heading STILL HAS ScrollFloat */}
                                    <ScrollFloat
                                        containerClassName="mb-6 lg:mb-8 w-full"
                                        textClassName="text-5xl md:text-6xl lg:text-6xl xl:text-7xl text-white leading-[1.15] md:leading-[1.1] uppercase break-words"
                                        style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600, letterSpacing: '0.02em' }}
                                        animationDuration={0.8}
                                        stagger={0.02}
                                        scrollStart="top 95%"
                                        scrollEnd="bottom 10%"
                                    >
                                        {section.heading}
                                    </ScrollFloat>

                                    {/* Description NO LONGER has ScrollFloat */}
                                    <p 
                                        className="mb-8 w-full max-w-lg text-lg md:text-xl text-white/90 leading-relaxed"
                                        style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                                    >
                                        {section.description}
                                    </p>
                                </div>

                                {/* Image Half */}
                                <div className="w-full lg:w-1/2 relative group mt-8 lg:mt-0">
                                    <div
                                        className="absolute -inset-1 rounded-2xl opacity-70 blur-sm group-hover:opacity-100 transition-opacity duration-300"
                                        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%)' }}
                                    />
                                    <img
                                        src={typeof section.img === 'string' ? section.img : section.img.src}
                                        alt={section.heading}
                                        className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] xl:h-[600px] object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                                        style={{ boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.4)' }}
                                    />

                                    <div
                                        className="absolute inset-0 rounded-2xl opacity-20"
                                        style={{ background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%)' }}
                                    />

                                    <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 z-10">
                                        <CircularButton
                                            text={section.buttonText}
                                            href={section.link}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HomeStacking;