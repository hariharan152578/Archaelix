import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: "Archaelix",
  description: "Reveal the unseen",
  icons: {
  icon: [
    { url: "/icon.png", sizes: "50x50", type: "image/png" },
    { url: "/icon.png", sizes: "198x198", type: "image/png" },
  ],
},

};

// layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
