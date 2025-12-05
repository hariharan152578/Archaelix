```javascript
import { Space_Grotesque, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesque = Space_Grotesque({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Archaelix",
  description: "Reveal the unseen",
};

import SmoothScroll from "../components/SmoothScroll";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ spaceGrotesque.variable } ${ inter.variable } antialiased font - sans`}
      >
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
