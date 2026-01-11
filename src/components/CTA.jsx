'use client';

import React, { useEffect, useState, useRef } from 'react';
import RoundButton from './RoundButton';

const CTA = () => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [shouldSpread, setShouldSpread] = useState(false);
    const [isScrollingDown, setIsScrollingDown] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        timeline: "",
        budget: "",
        description: ""
    });
    const sectionRef = useRef(null);
    const lastScrollTop = useRef(0);
    const scrollPosition = useRef(0);
    const modalRef = useRef();

    // Placeholder images (using Unsplash)
    const students = [
        { id: 1, name: 'Team 1', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
        { id: 2, name: 'Team 2', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
        { id: 3, name: 'Team 3', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop' },
        { id: 4, name: 'Team 4', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
        { id: 5, name: 'Team 5', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
        { id: 6, name: 'Team 6', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop' },
        { id: 7, name: 'Team 7', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
        { id: 8, name: 'Team 8', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    ];

    const presetPositions = [
        { x: -25, y: -25, scale: 0.75 },
        { x: 30, y: -25, scale: 0.4 },
        { x: 8, y: -30, scale: 0.8 },
        { x: -36, y: 10, scale: 0.6 },
        { x: 0, y: 35, scale: 0.8 },
        { x: 20, y: 30, scale: 0.5 },
        { x: -20, y: 25, scale: 0.4 },
        { x: 35, y: 5, scale: 0.75 },
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (isModalOpen) {
            scrollPosition.current = window.scrollY;
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
        } else {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            window.scrollTo(0, scrollPosition.current);
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
        };
    }, [isModalOpen]);

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const sectionHeight = rect.height;
                const sectionTop = rect.top;
                const viewportHeight = window.innerHeight;
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                const currentScrollingDown = scrollTop > lastScrollTop.current;
                setIsScrollingDown(currentScrollingDown);
                lastScrollTop.current = scrollTop;

                if (sectionTop <= viewportHeight && sectionTop > -sectionHeight) {
                    setIsVisible(true);
                    const scrolledPastSection = Math.max(0, viewportHeight - sectionTop);
                    const progress = Math.min(1, scrolledPastSection / (sectionHeight + viewportHeight));
                    setScrollProgress(progress);
                    setShouldSpread(progress > 0.1);
                } else {
                    setIsVisible(false);
                    setScrollProgress(0);
                    setShouldSpread(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const getCardPosition = (index) => {
        const { x, y, scale } = presetPositions[index % presetPositions.length];
        const spreadFactor = 1 + (shouldSpread ? scrollProgress * 2 : 0);

        let xPixels = (x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1000) * scrollProgress * spreadFactor;
        let yPixels = (y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 800) * scrollProgress * spreadFactor;
        const z = 50 * scrollProgress;

        const maxScale = scale;
        const minScale = 0.4;
        const currentScale = maxScale - (maxScale - minScale) * (scrollProgress * 1.2);

        return {
            transform: `translate3d(${xPixels}px, ${yPixels}px, ${z}px) scale(${currentScale})`,
            opacity: 1 - scrollProgress * 0.7,
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateOpacity = (progress) => {
        if (!isScrollingDown) {
            return Math.max(0, progress - 0.3);
        }
        return Math.min(1, progress * 2);
    };

    return (
        <section
            ref={sectionRef}
            className="flex flex-col items-center justify-center py-16 px-8 bg-white relative min-h-screen overflow-hidden"
        >
            {/* Centered Content Container - Absolute positioned for true center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center z-10">
                {/* Title */}
                <h2
                    className="text-2xl md:text-4xl lg:text-5xl text-center text-[#0F172A] max-w-4xl font-medium mb-8"
                    style={{
                        opacity: calculateOpacity(scrollProgress),
                        fontFamily: "'NeueMontreal', sans-serif",
                        transition: isScrollingDown ? 'opacity 0.3s ease-in' : 'opacity 0.08s ease-out'
                    }}
                >
                   Launch Your Digital & Business Growth Project
                </h2>

                {/* CTA Button */}
                <RoundButton
                    onClick={() => setIsModalOpen(true)}
                    title="Start Your Project"
                    variant="primary"
                    style={{
                        opacity: calculateOpacity(scrollProgress),
                        transform: `scale(${scrollProgress > 0.5 ? 1 : 0.9})`,
                        transition: isScrollingDown
                            ? 'opacity 0.3s ease-in, transform 0.3s ease-in'
                            : 'opacity 0.08s ease-out, transform 0.08s ease-out',
                    }}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/70 flex justify-center items-center z-[1000] backdrop-blur-sm"
                    style={{ animation: 'fadeIn 0.3s ease-out' }}
                >
                    <div
                        ref={modalRef}
                        className="w-[90%] max-w-[600px] bg-black rounded-2xl p-6 relative border border-white/20 shadow-2xl"
                        style={{ animation: 'slideIn 0.3s ease-out' }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute -top-4 -right-4 bg-black border-2 border-white/20 rounded-full text-white w-8 h-8 text-xl cursor-pointer flex items-center justify-center z-[1001] hover:rotate-90 hover:scale-110 hover:border-white/40 hover:bg-gradient-to-r hover:from-[#df1612] hover:to-[#b7120e] transition-all duration-200"
                        >
                            ×
                        </button>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                            <div className="w-full flex flex-col md:flex-row justify-between gap-4">
                                <div className="md:w-[48%] w-full flex flex-col gap-2">
                                    <label className="text-xs text-white uppercase tracking-wider" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        placeholder="John"
                                        className="w-full h-12 border border-white/20 rounded-lg bg-black/20 backdrop-blur-sm text-sm text-white px-4 transition-all duration-300 focus:border-white/40 focus:outline-none hover:border-white/30"
                                    />
                                </div>
                                <div className="md:w-[48%] w-full flex flex-col gap-2">
                                    <label className="text-xs text-white uppercase tracking-wider" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        placeholder="Doe"
                                        className="w-full h-12 border border-white/20 rounded-lg bg-black/20 backdrop-blur-sm text-sm text-white px-4 transition-all duration-300 focus:border-white/40 focus:outline-none hover:border-white/30"
                                    />
                                </div>
                            </div>

                            <div className="w-full flex flex-col md:flex-row justify-between gap-4">
                                <div className="md:w-[48%] w-full flex flex-col gap-2">
                                    <label className="text-xs text-white uppercase tracking-wider" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                        Timeline
                                    </label>
                                    <input
                                        type="text"
                                        name="timeline"
                                        value={formData.timeline}
                                        onChange={handleChange}
                                        placeholder="e.g., 2 weeks"
                                        className="w-full h-12 border border-white/20 rounded-lg bg-black/20 backdrop-blur-sm text-sm text-white px-4 transition-all duration-300 focus:border-white/40 focus:outline-none hover:border-white/30"
                                    />
                                </div>
                                <div className="md:w-[48%] w-full flex flex-col gap-2">
                                    <label className="text-xs text-white uppercase tracking-wider" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                        Budget
                                    </label>
                                    <input
                                        type="text"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        placeholder="e.g., $5,000"
                                        className="w-full h-12 border border-white/20 rounded-lg bg-black/20 backdrop-blur-sm text-sm text-white px-4 transition-all duration-300 focus:border-white/40 focus:outline-none hover:border-white/30"
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <label className="text-xs text-white uppercase tracking-wider block mb-2" style={{ fontFamily: "'NeueMontreal', sans-serif" }}>
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Tell us about your project..."
                                    className="w-full h-24 border border-white/20 rounded-lg bg-black/20 backdrop-blur-sm text-sm text-white p-4 transition-all duration-300 focus:border-white/40 focus:outline-none hover:border-white/30 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-[#df1612] to-[#b7120e] rounded-lg text-sm text-white uppercase tracking-wider transition-all duration-300 hover:opacity-90 font-semibold"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Cards Container */}
            <div className="relative w-[200px] h-[200px]" style={{ perspective: '1000px' }}>
                {students.map((student, index) => (
                    <div
                        key={student.id}
                        className="absolute w-[200px] h-[200px] rounded-3xl overflow-hidden transition-all duration-400 ease-out hover:scale-110 hover:z-20"
                        style={{
                            ...getCardPosition(index),
                            zIndex: students.length - index,
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        <img
                            src={student.image}
                            alt={student.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>

            {/* Keyframe animations */}
            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; backdrop-filter: blur(0px); }
          to { opacity: 1; backdrop-filter: blur(4px); }
        }
        @keyframes slideIn {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
        </section>
    );
};

export default CTA;
