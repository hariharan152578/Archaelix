'use client';

import React, { useState, useEffect } from 'react';
import StaggeredMenu from '../../components/StaggeredMenu';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import SplashScreen from '../../components/SplashScreen';

export default function PrivacyPolicy() {
    const [splashComplete, setSplashComplete] = useState(false);

    useEffect(() => {
        if (!splashComplete) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [splashComplete]);

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
        { label: "Projects", link: "/projects" },
        { label: "Careers", link: "/careers" },
        { label: "Contact", link: "/contact" },
    ];

    const sections = [
        {
            title: "Overview",
            content: "At Archaelix, we take your privacy seriously. This Privacy Policy explains in a clear way how we collect, use, store, and protect your information when you visit our website or use our services. We only collect information that is necessary for communication, project execution, and improving our services. By using our website or sharing your information with us, you agree to how your data is handled as described in this policy. We treat your information responsibly and take reasonable steps to protect it from misuse, loss, or unauthorized access. We do not sell your personal data to anyone."
        },
        {
            title: "Information We Collect",
            content: "When you interact with Archaelix, we may collect the information you directly provide to us. This includes your name, email address, phone number, company details, and any other information you share through forms, messages, or during project discussions. Along with this, we may also collect some basic technical information automatically when you visit our website. This may include your IP address, browser type, device details, pages you visit, and how you interact with the website. This helps us understand user behavior and improve performance and experience."
        },
        {
            title: "How We Use Your Information",
            content: "We use the information we collect only for genuine business purposes. This includes communicating with you, understanding your requirements, managing your project, and delivering our services properly. Your data also helps us improve our website, streamline communication, and enhance the quality of our services. We do not use your information for unrelated purposes or unnecessary marketing without reason."
        },
        {
            title: "Data Sharing",
            content: "We respect your privacy and do not sell, rent, or trade your personal data. However, in some cases, we may need to share limited information with trusted third-party service providers. These may include hosting companies, analytics tools, communication platforms, or other services that help us run our business smoothly. These third parties are expected to handle your data securely and only use it for the intended purpose. We may also share information if required by law or legal authorities."
        },
        {
            title: "Data Security",
            content: "We take appropriate technical and organizational steps to protect your data from unauthorized access, alteration, loss, or misuse. Even though we work hard to keep your information safe, it is important to understand that no digital system or online platform can guarantee complete security. By using our services, you acknowledge this limitation."
        },
        {
            title: "Cookies and Tracking Technologies",
            content: "Our website may use cookies and similar tracking technologies to improve your browsing experience and understand how visitors use our site. These tools help us analyze traffic and improve performance. You can disable cookies through your browser settings, but some parts of the website may not function properly if you do so."
        },
        {
            title: "Your Rights",
            content: "You have full control over your personal data. You can request access to the information we hold about you, ask for corrections, or request deletion of your data, depending on legal and operational requirements. If you want to make such a request, you can contact us directly and we will respond accordingly."
        },
        {
            title: "Data Retention",
            content: "We keep your personal information only for as long as it is needed to provide our services, comply with legal obligations, or support our business operations. Once the information is no longer required, we either delete it securely or store it in a protected manner where it cannot be misused."
        },
        {
            title: "Third-Party Links",
            content: "Our website may contain links to other websites. These external sites are not controlled by Archaelix, and we are not responsible for how they collect or use your data. We recommend that you review their privacy policies separately before sharing any personal information."
        },
        {
            title: "Changes to This Policy",
            content: "We may update this Privacy Policy from time to time as our business or legal requirements change. Any updates will be posted on this page. If you continue using our website or services after changes are made, it means you accept the updated policy."
        },
        {
            title: "Contact Information",
            content: "If you have any questions about this Privacy Policy or how your data is handled, you can contact us at: archaelix@gmail.com"
        }
    ];

    return (
        <>
            <SmoothScroll />
            <SplashScreen onComplete={() => setSplashComplete(true)} />

            <div className="w-full min-h-screen bg-white text-[#0F172A] selection:bg-[#df1612] selection:text-white">
                <StaggeredMenu
                    items={menuItems}
                    logoText="Archaelix"
                    menuButtonColor="#0F172A"
                    openMenuButtonColor="#0F172A"
                    accentColor="#df1612"
                />

                {/* Hero Section */}
                <section className="pt-32 pb-16 px-6 md:px-12 bg-black text-white relative overflow-hidden">
                    <div className="container mx-auto">
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
                            Privacy <span className="text-[#df1612] italic">Policy</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl text-lg md:text-xl font-medium">
                            Archaelix's commitment to protecting your digital rights and professional data.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-6 md:px-12 bg-white">
                    <div className="container mx-auto max-w-5xl">
                        <div className="flex flex-col gap-24">
                            {sections.map((section, index) => (
                                <div key={index} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                                    <div className="lg:col-span-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-[1px] bg-[#df1612]"></div>
                                            <h2 className="text-xs font-bold uppercase tracking-widest text-[#df1612]">
                                                {String(index + 1).padStart(2, '0')}
                                            </h2>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-bold mt-4 tracking-tight uppercase">
                                            {section.title}
                                        </h3>
                                    </div>
                                    <div className="lg:col-span-8">
                                        <p className="text-gray-600 leading-relaxed text-xl text-justify font-medium">
                                            {section.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Footer */}
                        <div className="mt-32 pt-20 border-t border-gray-100 text-center">
                            <p className="text-gray-400 mb-6 font-medium tracking-widest uppercase text-xs">Need Clarity?</p>
                            <a href="/contact" className="inline-flex items-center gap-3 text-3xl md:text-5xl font-bold hover:text-[#df1612] transition-colors tracking-tighter uppercase">
                                Contact Privacy Team
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                            </a>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}
