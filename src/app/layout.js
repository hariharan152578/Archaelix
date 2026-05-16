import "./globals.css";

export const metadata = {
  title: "Archaelix",
  description: "Reveal the unseen",
  icons: {
  icon: [
    { url: "/icon.png", sizes: "50x50", type: "image/png" },
    { url: "/icon.png", sizes: "198x198", type: "image/png" },
  ],
},

  verification: {
    google: "googledf1c77099922178a",
  },
};

// layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
