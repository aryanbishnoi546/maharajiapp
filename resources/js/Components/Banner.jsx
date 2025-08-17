import React from "react";
import { Link } from '@inertiajs/react';

export default function Banner() {
    return (
        <section className="relative w-full overflow-hidden py-32 md:py-52">
            {/* Background Video */}
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src="https://video.wixstatic.com/video/c837a6_470529e9efbe4ad4ad20de88cdd3d313/1080p/mp4/file.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-snug">
                    Welcome to Maharaji Ji Healthcare
                </h1>
                <h2 className="text-lg sm:text-xl md:text-3xl text-white mb-6">
                    Where Tradition Meets Wellness
                </h2>

                <p className="text-white max-w-2xl text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
                    At Maharaji Ji Healthcare, we invite you to rediscover the age-old secrets of holistic healing through Ayurveda.
                    Our digital sanctuary is dedicated to bringing the time-tested wisdom of Ayurveda to the digital realm,
                    offering online consultations and a curated selection of Ayurvedic medicines for your well-being.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <Link
                        href="/best-sellers"
                        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition text-center"
                    >
                        Shop Now
                    </Link>
                    <Link
                        href="/book-online"
                        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition text-center"
                    >
                        Book Your Ayurvedic Journey Now!
                    </Link>
                </div>
            </div>
        </section>
    );
}
