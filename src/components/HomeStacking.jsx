


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

            // Section animations
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

            // Section 2 Trigger
            createSectionAnim('.main-part-2', '.text-container-1', '.text-container-2');

            // Section 3 Trigger
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
                        <div className="container mx-auto px-6 py-16 md:py-20 max-w-7xl">
                            
                            {/* Alternating Flex Container */}
                            <div className={`${section.textClass} flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center justify-between gap-12 lg:gap-20 w-full`}>
                                
                                {/* TEXT HALF */}
                                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                                    { /* Big Heading - STILL HAS FLOAT EFFECT */}
                                    <ScrollFloat
                                        containerClassName="mb-6 lg:mb-8 w-full"
                                        textClassName="text-[10vw] md:text-[8vw] lg:text-[5vw] text-white leading-[1.1] uppercase break-words"
                                        style={{ fontFamily: "'FoundersGrotesk', sans-serif", fontWeight: 600, letterSpacing: '0.05em' }}
                                        animationDuration={0.8}
                                        stagger={0.02}
                                        scrollStart="top 90%"
                                        scrollEnd="bottom 10%"
                                    >
                                        {section.heading}
                                    </ScrollFloat>

                                    { /* Small Paragraph - FLOAT EFFECT REMOVED */}
                                    <p 
                                        className="mb-8 w-full max-w-xl text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed"
                                        style={{ fontFamily: "'NeueMontreal', sans-serif" }}
                                    >
                                        {section.description}
                                    </p>
                                </div>

                               {/* IMAGE HALF */}
<div className="w-full lg:w-1/2 relative group mt-8 lg:mt-0">
    
    <img
        src={typeof section.img === 'string' ? section.img : section.img.src}
        alt={section.heading}
        className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover rounded-2xl shadow-2xl"
    />

   {/* Circular Button Wrapper */}
<div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 z-10 flex items-center justify-center">
    
    {/* THIS is the soft white blur effect behind the button */}
    <div className="absolute inset-0 bg-white opacity-40 blur-2xl rounded-full scale-[2.5] pointer-events-none"></div>

    <CircularButton
        text={section.heading.toUpperCase()}
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