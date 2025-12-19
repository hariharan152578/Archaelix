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
        className: "bg-[#f73b20] text-white",
        bgcolor: "#0F172A", // Hover background turns black
        iconColor: "text-[#f73b20]",
        hoverIconColor: "group-hover:text-[#0F172A]"
    },
    dark: {
        className: "bg-[#0F172A] text-white",
        bgcolor: "#f73b20", // Hover background turns orange
        iconColor: "text-[#0F172A]",
        hoverIconColor: "group-hover:text-[#f73b20]"
    },
    darkWhite: {
        className: "bg-[#0F172A] text-white",
        bgcolor: "#f73b20", // Hover background turns primary
        iconColor: "text-[#0F172A]",
        hoverIconColor: "group-hover:text-[#f73b20]"
    },
    white: {
        className: "bg-white text-[#0F172A] border border-[#eee]",
        bgcolor: "#f73b20", // Hover background turns orange
        iconColor: "text-[#0F172A]",
        hoverIconColor: "group-hover:text-[#f73b20]"
    },
    orange: {
        className: "bg-[#f73b20] text-white",
        bgcolor: "white", // Hover background turns white
        iconColor: "text-[#f73b20]",
        hoverIconColor: "group-hover:text-[#f73b20]"
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
            className={`group flex items-center justify-between gap-[40px] pl-[35px] pr-[8px] py-[8px] rounded-full uppercase font-medium transition-all duration-300 ${finalClassName}`}
            style={{ ...style, fontFamily: "'NeueMontreal', sans-serif" }}
        >
            <span className="relative z-10 text-[15px] tracking-wide font-semibold transition-colors duration-300">
                {title}
            </span>
            <div className="w-[45px] h-[45px] bg-white rounded-full flex items-center justify-center relative z-10 transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRight
                    size={24}
                    className={`${iconBaseColor} ${iconHoverColor} transition-transform duration-500 group-hover:rotate-45`}
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
