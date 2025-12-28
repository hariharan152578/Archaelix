"use client";

import { useState, useEffect } from "react";
import HomeHero from "../components/HomeHero";
import StaggeredMenu from "../components/StaggeredMenu";
import HomeStacking from "../components/HomeStacking";
import SplashScreen from "../components/SplashScreen";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import CEONote from "../components/CEONote";
import Ready from "../components/Ready/Ready";


export default function Home() {
  const [splashComplete, setSplashComplete] = useState(false);

  // Lock scroll during splash screen
  useEffect(() => {
    if (!splashComplete) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling after splash completes
      document.body.style.overflow = '';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [splashComplete]);

  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Work", link: "/work" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <>
      {/* Smooth Scrolling */}
      <SmoothScroll />

      {/* Splash Screen */}
      <SplashScreen onComplete={() => setSplashComplete(true)} />

      <div className="w-full min-h-screen bg-white">
        {/* Navigation - Now self-contained fixed overlay */}
        <StaggeredMenu
          items={menuItems}
          socialItems={[
            { label: "Instagram", link: "#" },
            { label: "LinkedIn", link: "#" },
            { label: "Twitter", link: "#" }
          ]}
          logoText="archaelix"
          menuButtonColor="#0F172A"
          openMenuButtonColor="#0F172A"
          accentColor="#df1612"
        />

        {/* Hero Section */}
        <HomeHero startAnimation={splashComplete} />

        {/* CTA Section */}
        <CTA />

        {/* Stacking Section */}
        <HomeStacking />

        {/* CEO Note Section */}
        <CEONote />

        {/* Ready Section */}
        <Ready />

        {/* Footer Section */}
        <Footer />

      </div>
    </>
  );
}

