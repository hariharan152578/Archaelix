'use client';

import React from 'react';
import Link from 'next/link';
import './CircularButton.css';

const CircularButton = ({ text = "EXPLORE MORE", href = "#", className = "" }) => {
    // Split text into individual characters for the rotating animation
    const characters = text.split('');

    return (
        <Link href={href} className={`circular-button ${className}`}>
            <p className="circular-button__text">
                {characters.map((char, index) => (
                    <span key={index} style={{ '--index': index }}>
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </p>

            <div className="circular-button__circle">
                <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="circular-button__icon"
                    width="14"
                >
                    <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                    />
                </svg>

                <svg
                    viewBox="0 0 14 15"
                    fill="none"
                    width="14"
                    xmlns="http://www.w3.org/2000/svg"
                    className="circular-button__icon circular-button__icon--copy"
                >
                    <path
                        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </Link>
    );
};

export default CircularButton;
