'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const StackingSection = () => {
    const containerRef = useRef(null);

    // Colors from the design
    const colors = {
        pc1: '#fd7024',
        pc2: '#88b7bd',
        black: '#32230c',
        white: '#FFF0B3',
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animation for each section transition
            // We want to animate the transition between sections similar to the snippet
            // The snippet uses createSectionAnim(".main-part2", ".text-container1", ".text-container2", ".nav-part2");

            const createSectionAnim = (triggerSelector, prevTextSelector, nextTextSelector, navSelector) => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerSelector,
                        start: "top 90%",
                        end: "top 0%",
                        scrub: true,
                    }
                });

                tl.to(prevTextSelector, { opacity: 0, y: "20%" }, "s")
                    .from(nextTextSelector, { opacity: 0, y: "-20%" }, "s")
                    .from(navSelector, { backgroundColor: "#fff" }, "s");
            };

            // Note: In React we use refs or scoped selectors. 
            // Since we have multiple sections with similar classes, we can scope them.

            // Section 2 Trigger
            createSectionAnim('.main-part-2', '.text-container-1', '.text-container-2', '.nav-part-2');

            // Section 3 Trigger
            createSectionAnim('.main-part-3', '.text-container-2', '.text-container-3', '.nav-part-3');

            // Section 4 Trigger
            createSectionAnim('.main-part-4', '.text-container-3', '.text-container-4', '.nav-part-4');

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const sections = [
        {
            id: 1,
            title: 'Practice',
            heading: 'Practice',
            description: 'Practice one scene at a time through the immersive story of a fictional company.',
            img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop', // Placeholder
            bgColor: colors.pc2, // #88b7bd
            navClass: 'nav-part-1',
            mainClass: 'main-part-1',
            textClass: 'text-container-1',
        },
        {
            id: 2,
            title: 'Upskill',
            heading: 'Upskill',
            description: 'Upskill by nailing true-to-life challenging work situation.',
            img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop',
            bgColor: colors.pc1, // #fd7024
            navClass: 'nav-part-2',
            mainClass: 'main-part-2',
            textClass: 'text-container-2',
        },
        {
            id: 3,
            title: 'Play',
            heading: 'Play',
            description: 'Play with your co-worker in multiplayer mode.',
            img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2670&auto=format&fit=crop',
            bgColor: colors.pc2, // #88b7bd
            navClass: 'nav-part-3',
            mainClass: 'main-part-3',
            textClass: 'text-container-3',
        },
        {
            id: 4,
            title: 'Improve',
            heading: 'Improve',
            description: 'Improve with tailored feedback through an adaptive experience.',
            img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2670&auto=format&fit=crop',
            bgColor: colors.pc1, // #fd7024
            navClass: 'nav-part-4',
            mainClass: 'main-part-4',
            textClass: 'text-container-4',
        },
    ];

    return (
        <section ref={containerRef} className="w-full relative z-10 font-sans">
            <div className="relative z-10">
                {sections.map((section, index) => (
                    className = "h-[73%] w-full object-cover rounded-lg border-2 border-[#32230c] shadow-[5px_5px_0px_0px_#32230c]"
                    />
                                </div>
        </div>
                        </div >
                    </div >
                ))}
            </div >
        </section >
    );
};

export default StackingSection;
