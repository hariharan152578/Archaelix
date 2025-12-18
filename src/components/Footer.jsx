"use client";

import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-[#f73b20] text-white pt-32 pb-12 px-8 md:px-16 overflow-hidden">
            <div className="w-full">
                {/* Top Section with Links */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-32">
                    <div className="col-span-2 lg:col-span-3">
                        <div className="mb-8">
                            <span className="text-3xl font-bold font-heading">archaelix</span>
                        </div>
                        <p className="text-white/80 max-w-md text-lg leading-relaxed font-sans">
                            We bridge the gap between imagination and reality, crafting digital experiences that resonate and inspire.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Resources</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="#" className="hover:text-white/60 transition-colors">Design Inspirations</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Channels</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">UI Libraries</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Open Source</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Company</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="#" className="hover:text-white/60 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Work</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 font-sans">Socials</h4>
                        <ul className="flex flex-col gap-4 font-sans text-base font-medium">
                            <li><a href="#" className="hover:text-white/60 transition-colors">Instagram</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">LinkedIn</a></li>
                            <li><a href="#" className="hover:text-white/60 transition-colors">Twitter (X)</a></li>
                        </ul>
                    </div>
                </div>

                {/* Massive Brand Name Section */}
                <div className="relative -mb-16 md:-mb-24 lg:-mb-40">
                    <h2 className="text-[22vw] font-bold leading-[0.7] font-heading uppercase select-none pointer-events-none opacity-100">
                        archaelix
                    </h2>
                </div>

                {/* Bottom Bar */}
                <div className="mt-40 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-sans tracking-tight text-white/40">
                    <div className="flex items-center gap-8">
                        <p>© 2025 Archaelix. Digital Excellence.</p>
                        <a href="https://reactbits.dev" target="_blank" className="hover:text-white transition-colors">Built with ReactBits</a>
                    </div>
                    <div className="flex gap-10">
                        <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors uppercase tracking-widest text-[10px] font-bold">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
