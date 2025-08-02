import React from "react";

export default function Banner() {
    return (
        <section  style={{ padding: '200px 0px' }} className="relative py-8 w-full overflow-hidden">
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

            <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Welcome to Maharaji Ji Healthcare
                </h1>
                <h2 className="text-2xl md:text-3xl text-white mb-6">
                    Where Tradition Meets Wellness
                </h2>

                <p className="text-white max-w-2xl text-md md:text-lg mb-8">
                    At Maharaji Ji Healthcare, we invite you to rediscover the age-old secrets of holistic healing through Ayurveda.
                    Our digital sanctuary is dedicated to bringing the time-tested wisdom of Ayurveda to the digital realm,
                    offering online consultations and a curated selection of Ayurvedic medicines for your well-being.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="#shop"
                        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
                    >
                        Shop Now
                    </a>
                    <a
                        href="#book"
                        className="bg-white text-black font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-200 transition"
                    >
                        Book Your Ayurvedic Journey Now!
                    </a>
                </div>
            </div>
        </section>
    );
}
