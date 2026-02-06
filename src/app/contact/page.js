"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MapPin, Mail, Instagram, Linkedin, Loader2, ArrowRight, Phone, Globe, ChevronRight, Facebook, Twitter, Youtube } from "lucide-react";
import StaggeredMenu from "../../components/StaggeredMenu";
import SmoothScroll from "../../components/SmoothScroll";
import SplashScreen from "../../components/SplashScreen";
import Footer from "../../components/Footer";

const ContactPage = () => {
  const [splashComplete, setSplashComplete] = useState(false);
  const [status, setStatus] = useState("IDLE");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  
  const containerRef = useRef(null);

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

  useEffect(() => {
    if (!splashComplete) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Text Animation
      gsap.from(".hero-content", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.2
      });

      // Stagger reveal elements
      gsap.from(".reveal-item", {
        scrollTrigger: {
          trigger: ".reveal-item",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, [splashComplete]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("SENDING");
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus("SUCCESS");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("ERROR");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("ERROR");
    }
  };

  return (
    <>
      <SmoothScroll />
      <SplashScreen onComplete={() => setSplashComplete(true)} />

      <div ref={containerRef} className="bg-[#fcfcfc] text-black selection:bg-[#df1612] selection:text-white min-h-screen font-sans">
        <StaggeredMenu
          items={menuItems}
          logoText="Archaelix"
          menuButtonColor="#ffffff"
          openMenuButtonColor="#ffffff"
          accentColor="#df1612"
        />

        {/* --- Hero Section --- */}
        <section className="relative h-[60vh] flex items-center justify-start overflow-hidden bg-black">
          <div className="absolute inset-0 opacity-60">
             <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
             <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Abstract Background"
             />
          </div>

          <div className="container mx-auto px-6 lg:px-24 relative z-20 hero-content">
            <h1 className="text-7xl lg:text-9xl font-bold text-white tracking-tighter mb-4">
              Contacts
            </h1>
            <div className="flex items-center gap-3 text-sm font-medium">
                <span className="text-gray-400">Home</span>
                <ChevronRight size={14} className="text-[#df1612]" />
                <span className="text-white">Contacts</span>
            </div>
          </div>
        </section>

        {/* --- Main Content --- */}
        <section className="container mx-auto px-6 lg:px-24 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Side: Info Grid */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="reveal-item mb-10">
              <span className="text-gray-400 font-medium text-sm tracking-tight">/ get in touch /</span>
              <h2 className="text-5xl lg:text-5xl font-bold mt-4 leading-[1.1] tracking-tight">
                We are always ready to help you and answer your questions
              </h2>
              <p className="text-gray-500 mt-8 text-lg max-w-md leading-relaxed">
                Pacific hake false trevally queen parrotfish black prickleback mosshead warbonnet sweeper Greenling sleeper.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 mt-4">
              {/* Call Center */}
              <div className="reveal-item">
                <h4 className="text-lg font-bold mb-3">Call Center</h4>
                <div className="text-gray-500 space-y-1">
                  <p>+91 7904018248</p>
                </div>
              </div>

              {/* Our Location */}
              <div className="reveal-item">
                <h4 className="text-lg font-bold mb-3">Our Location</h4>
                <div className="text-gray-500 space-y-1">
                  <p>Ukkadam, Coimbatore</p>
                  <p>TamilNadu, India</p>
                </div>
              </div>

              {/* Email */}
              <div className="reveal-item">
                <h4 className="text-lg font-bold mb-3">Email</h4>
                <div className="text-gray-500">
                  <p>Support@archaelix.com</p>
                </div>
              </div>

              {/* Social Network */}
              <div className="reveal-item">
  <h4 className="text-lg font-bold mb-3">Social network</h4>
  <div className="flex gap-5 text-black">
    <a 
      href="https://www.linkedin.com/company/archaelix/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-[#df1612] transition-colors"
    >
      <Linkedin size={18} className="cursor-pointer" />
    </a>
    
    <a 
      href="https://www.instagram.com/archaelix_tech?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-[#df1612] transition-colors"
    >
      <Instagram size={18} className="cursor-pointer" />
    </a>
  </div>
</div>
            </div>
          </div>

          {/* Right Side: Floating Form */}
          <div className="lg:col-span-7">
            <div className="reveal-item bg-[#f3f4f6] p-8 lg:p-16 rounded-[40px] shadow-sm">
              <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-500 mb-12 text-sm leading-relaxed max-w-sm">
                Define your goals and identify areas where AI can add value to your business
              </p>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-8">
                  <input 
                    name="name" 
                    value={formData.name}
                    placeholder="Full name" 
                    className="w-full bg-transparent border-b border-gray-300 py-2 outline-none focus:border-black transition-colors text-sm placeholder:text-gray-400" 
                    onChange={handleChange}
                    required 
                  />
                  <input 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    placeholder="Email" 
                    className="w-full bg-transparent border-b border-gray-300 py-2 outline-none focus:border-black transition-colors text-sm placeholder:text-gray-400" 
                    onChange={handleChange}
                    required 
                  />
                  <input 
                    name="subject" 
                    value={formData.subject}
                    placeholder="Subject" 
                    className="w-full bg-transparent border-b border-gray-300 py-2 outline-none focus:border-black transition-colors text-sm placeholder:text-gray-400" 
                    onChange={handleChange}
                  />
                  <textarea 
                    name="message" 
                    rows="1" 
                    value={formData.message}
                    placeholder="Message" 
                    className="w-full bg-transparent border-b border-gray-300 py-2 outline-none focus:border-black transition-colors resize-none text-sm placeholder:text-gray-400" 
                    onChange={handleChange}
                    required 
                  />
                </div>

                {status === "ERROR" && (
                  <div className="text-red-500 text-xs font-bold mt-2">
                    Oops! Something went wrong. Please try again.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === "SENDING"}
                  className="group flex items-center gap-3 bg-[#2d2d2d] text-white px-8 py-4 rounded-full font-medium transition-all hover:bg-black disabled:opacity-50"
                >
                  <ChevronRight size={16} />
                  <span className="text-sm">
                    {status === "SENDING" ? "Processing..." : "Send a message"}
                  </span>
                  {status === "SENDING" && <Loader2 className="animate-spin ml-2" size={16} />}
                </button>

                {status === "SUCCESS" && (
                  <div className="text-green-600 text-sm font-bold mt-4 animate-pulse">
                    Message sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;