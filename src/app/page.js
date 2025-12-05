import FluidReveal from "../components/FluidReveal";
import StaggeredMenu from "../components/StaggeredMenu";
import StackingSection from "../components/StackingSection";

export default function Home() {
  const menuItems = [
    { label: "Home", link: "/" },
    { label: "Work", link: "/work" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ];

  return (
    <div className="w-full min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden">
        <FluidReveal />

        <div className="absolute inset-0 z-50 pointer-events-none">
          <StaggeredMenu
            items={menuItems}
            logoText="ARCHAELIX"
            menuButtonColor="#fff"
            openMenuButtonColor="#000"
            accentColor="#ff0055"
          />
        </div>

        <main className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
          <h1 className="text-6xl md:text-9xl font-black text-white mix-blend-difference tracking-tighter text-center font-heading">
            REVEAL<br />THE UNSEEN
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white mix-blend-difference max-w-lg text-center font-light">
            Move your mouse to explore the hidden layer beneath.
          </p>
        </main>
      </section>

      {/* Stacking Section */}
      <StackingSection />
    </div>
  );
}
