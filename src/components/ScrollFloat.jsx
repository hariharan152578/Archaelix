import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollFloat = ({
    children,
    scrollContainerRef,
    containerClassName = '',
    textClassName = '',
    style = {},
    animationDuration = 1,
    ease = 'back.inOut(2)',
    scrollStart = 'top bottom',
    scrollEnd = 'bottom center',
    stagger = 0.03,
}) => {
    const containerRef = useRef(null);

    const splitText = useMemo(() => {
        const text = typeof children === 'string' ? children : '';
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="inline-block"
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    }, [children]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const chars = el.querySelectorAll('span');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: scrollStart,
                end: scrollEnd,
                scrub: true,
                scroller: scrollContainerRef?.current || window,
            },
        });

        tl.fromTo(
            chars,
            {
                y: '80%',
                opacity: 0,
                scaleY: 0,
                transformOrigin: 'top',
            },
            {
                y: '0%',
                opacity: 1,
                scaleY: 1,
                stagger: stagger,
                duration: animationDuration,
                ease: ease,
            }
        );

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

    return (
        <div
            ref={containerRef}
            className={`scroll-float-container ${containerClassName}`}
            style={style}
        >
            <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
        </div>
    );
};

export default ScrollFloat;
