'use client';

import React, { useState, useEffect } from 'react';
import StaggeredMenu from '../../components/StaggeredMenu';
import Footer from '../../components/Footer';
import SmoothScroll from '../../components/SmoothScroll';
import SplashScreen from '../../components/SplashScreen';

export default function TermsAndConditions() {
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

    const terms = [
        {
            id: "01",
            title: "Agreement Structure",
            content: "These Terms and Conditions represent a binding agreement between Archaelix and its clients. Any individual, business, or organization engaging with Archaelix for services automatically agrees to these terms, whether through website inquiry, proposal acceptance, email confirmation, or project initiation. These terms apply to all current and future services unless overridden by a written contract signed by both parties."
        },
        {
            id: "02",
            title: "Nature of Business",
            content: "Archaelix is a service-based company providing digital marketing, software development, website development, and business consulting solutions. All services are professional, customized, and execution-based. Archaelix does not sell guaranteed outcomes but provides strategic and technical implementation based on agreed requirements."
        },
        {
            id: "03",
            title: "Project Engagement and Scope Definition",
            content: "Every project begins only after clear discussion and confirmation of scope, timeline, and cost. The scope defined in the proposal, quotation, or written agreement is final and binding. Any work not included in the approved scope is considered out-of-scope and will require separate approval, additional cost, and revised timelines. Archaelix is not responsible for assumptions made by the client outside the written scope."
        },
        {
            id: "04",
            title: "Client Responsibility",
            content: "Clients are required to provide complete, accurate, and timely inputs required for project execution. This includes content, approvals, access credentials, and feedback. Any delay from the client side that affects progress will directly extend delivery timelines. Archaelix shall not be held responsible for such delays."
        },
        {
            id: "05",
            title: "Communication and Approval",
            content: "All instructions, approvals, and changes must be communicated through official channels such as email or documented messaging. Verbal instructions will not be considered valid for scope changes or dispute resolution unless confirmed in writing."
        },
        {
            id: "06",
            title: "Payment Terms",
            content: "All projects require an advance payment before initiation unless otherwise agreed in writing. Payment structures may be milestone-based or project-based depending on the agreement. Failure to make payments on time will result in immediate suspension of work. Archaelix reserves the right to withhold deliverables until full payment is received."
        },
        {
            id: "07",
            title: "No Refund Policy",
            content: "Payments made to Archaelix are non-refundable once work has commenced. This is due to allocation of time, resources, and execution effort. Refunds will not be provided for partially completed or completed work. Any exception to this policy must be explicitly agreed in writing by Archaelix."
        },
        {
            id: "08",
            title: "Intellectual Property and Ownership",
            content: "All work produced by Archaelix remains the property of Archaelix until full payment is received. Upon complete payment, ownership of final deliverables will be transferred to the client, excluding third-party tools, libraries, or licensed assets. Archaelix reserves the right to showcase completed work for portfolio, marketing, and promotional purposes unless a written confidentiality agreement states otherwise."
        },
        {
            id: "09",
            title: "Project Timelines and Delivery",
            content: "Timelines provided are estimated based on project complexity and client responsiveness. Delivery may be adjusted due to scope changes, delayed feedback, or external dependencies. Archaelix is not liable for delays caused by third-party platforms, hosting providers, or external technical systems."
        },
        {
            id: "10",
            title: "Service Limitations and No Guarantee Clause",
            content: "Archaelix provides professional execution and strategic implementation but does not guarantee specific outcomes such as revenue, rankings, traffic, conversions, or business growth. Results depend on multiple external factors beyond direct control, including market behavior and platform algorithms."
        },
        {
            id: "11",
            title: "Confidentiality",
            content: "Both parties agree to maintain strict confidentiality regarding business information, project data, strategies, and any sensitive material shared during the engagement. Information will not be disclosed to third parties unless required by law or written consent is provided."
        },
        {
            id: "12",
            title: "Third-Party Dependencies",
            content: "Archaelix may use third-party services such as hosting providers, APIs, analytics tools, or marketing platforms. Archaelix is not responsible for disruptions, failures, or changes caused by these external systems."
        },
        {
            id: "13",
            title: "Limitation of Liability",
            content: "To the maximum extent permitted by law, Archaelix shall not be liable for any indirect, incidental, or consequential damages, including loss of revenue, business interruption, or data loss. Total liability, if any, shall not exceed the amount paid for the specific service."
        },
        {
            id: "14",
            title: "Suspension and Termination",
            content: "Archaelix reserves the right to suspend or terminate services immediately in cases of non-payment, misuse, unethical behavior, or violation of agreed terms. Clients may terminate services by written notice, but must settle all outstanding payments for work already completed."
        },
        {
            id: "15",
            title: "Force Outside Control",
            content: "Archaelix shall not be responsible for delays or failure in performance caused by events beyond reasonable control, including technical failures, natural events, government actions, or disruptions in third-party services."
        },
        {
            id: "16",
            title: "Changes to Terms",
            content: "Archaelix may update these Terms and Conditions at any time as the business evolves. Continued use of services after updates indicates acceptance of revised terms."
        },
        {
            id: "17",
            title: "Governing Law",
            content: "These Terms shall be governed by the laws of India. Any disputes arising shall be subject to the jurisdiction of applicable courts in India."
        },
        {
            id: "18",
            title: "Contact Information",
            content: "For any queries regarding these Terms and Conditions, clients may contact: support@archaelix.com"
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
                            Terms <span className="text-[#df1612] italic">& Conditions</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl text-lg md:text-xl font-medium">
                            Professional legal framework for Archaelix services and client engagements.
                        </p>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-20 px-6 md:px-12 bg-white">
                    <div className="container mx-auto max-w-5xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
                            {terms.map((term) => (
                                <div key={term.id} className="group">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="text-[#df1612] text-sm font-bold tracking-widest uppercase">
                                            {term.id}
                                        </span>
                                        <div className="h-[1px] flex-1 bg-gray-100 group-hover:bg-[#df1612] transition-colors duration-500"></div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 tracking-tight text-[#0F172A] uppercase">
                                        {term.title}
                                    </h3>
                                    <p className="text-gray-600 text-justify leading-relaxed text-lg">
                                        {term.content}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Contact Footer */}
                        <div className="mt-32 pt-20 border-t border-gray-100 text-center">
                            <p className="text-gray-400 mb-6 font-medium tracking-widest uppercase text-xs">Got Questions?</p>
                            <a href="/contact" className="inline-flex items-center gap-3 text-3xl md:text-5xl font-bold hover:text-[#df1612] transition-colors tracking-tighter uppercase">
                                Start a Conversation
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
