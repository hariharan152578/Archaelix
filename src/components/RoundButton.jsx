"use client";
import Link from "next/link";
import Rounded from "./Rounded";
import { ArrowUpRight } from "lucide-react";

/**
 * Standardized Button Variants
 * primary: Orange base -> Black hover (For Hero/CTA on white bg)
 * dark: Black base -> Orange hover (For Ready section)
 * darkWhite: Black base -> White hover (For CEO Note on orange bg)
 * white: White base -> Orange hover
 * orange: Orange base -> White hover
 */
const variants = {
    primary: {
        className: "bg-[#df1612] text-white",
        bgcolor: "#0F172A",
        circleBg: "bg-white",
        hoverCircleBg: "group-hover:bg-white",
        iconColor: "text-[#df1612]",
        hoverIconColor: "group-hover:text-[#0F172A]"
    },
  primary1: {
    className: "bg-white text-black hover:text-white hover:bg-[#0F172A]", // Added hover text change // Standardized to a utility class
    circleBg: "bg-[#df1612]",
    hoverCircleBg: "group-hover:bg-white",
    iconColor: "text-white",
    hoverIconColor: "group-hover:text-[#0F172A]"
  },
    dark: {
        className: "bg-[#0F172A] text-white",
        bgcolor: "#df1612",
        circleBg: "bg-white",
        hoverCircleBg: "group-hover:bg-white",
        iconColor: "text-[#0F172A]",
        hoverIconColor: "group-hover:text-[#df1612]"
    },
    darkWhite: {
        className: "bg-[#0F172A] text-white",
        bgcolor: "#df1612",
        circleBg: "bg-white",
        hoverCircleBg: "group-hover:bg-white",
        iconColor: "text-[#0F172A]",
        hoverIconColor: "group-hover:text-[#df1612]"
    },
    white: {
        className: "bg-white text-[#0F172A] border border-[#eee]",
        bgcolor: "#df1612",
        circleBg: "bg-[#df1612]", // Normal state: Orange circle
        hoverCircleBg: "group-hover:bg-white", // Hover state: White circle
        iconColor: "text-white", // Normal state: White arrow
        hoverIconColor: "group-hover:text-[#df1612]" // Hover state: Orange arrow
    },
    orange: {
        className: "bg-[#df1612] text-white",
        bgcolor: "white",
        circleBg: "bg-white",
        hoverCircleBg: "group-hover:bg-white",
        iconColor: "text-[#df1612]",
        hoverIconColor: "group-hover:text-[#df1612]"
    }
};

export default function RoundButton({
    href,
    title,
    className = "",
    bgcolor,
    variant = "primary",
    style,
    onClick
}) {
    // Get variant configurations
    const selectedVariant = variants[variant] || variants.primary;

    // Resolve final styles
    const finalBgColor = bgcolor || selectedVariant.bgcolor;
    const finalClassName = `${selectedVariant.className} ${className}`;
    const iconBaseColor = selectedVariant.iconColor;
    const iconHoverColor = selectedVariant.hoverIconColor;

    const content = (
        <Rounded
            backgroundColor={finalBgColor}
            className={`group flex items-center justify-between gap-[25px] sm:gap-[40px] pl-[20px] sm:pl-[35px] pr-[6px] sm:pr-[8px] py-[6px] sm:py-[8px] rounded-full uppercase font-medium transition-all duration-300 ${finalClassName}`}
            style={{ ...style, fontFamily: "'NeueMontreal', sans-serif" }}
        >
            <span className="relative z-10 text-[13px] sm:text-[15px] tracking-wide font-semibold transition-colors duration-300">
                {title}
            </span>
            <div className={`w-[38px] h-[38px] sm:w-[45px] sm:h-[45px] ${selectedVariant.circleBg} ${selectedVariant.hoverCircleBg} rounded-full flex items-center justify-center relative z-10 transition-all duration-300 group-hover:scale-110`}>
                <ArrowUpRight
                    size={20}
                    className={`sm:w-6 sm:h-6 ${iconBaseColor} ${iconHoverColor} transition-transform duration-500 group-hover:rotate-45`}
                    strokeWidth={2.5}
                />
            </div>
        </Rounded>
    );

    return (
        <div className="flex items-center justify-center w-fit" onClick={onClick}>
            {onClick ? (
                <div className="cursor-pointer w-fit h-fit">
                    {content}
                </div>
            ) : (
                <Link href={href || "#"} className="w-fit h-fit">
                    {content}
                </Link>
            )}
        </div>
    );
}
