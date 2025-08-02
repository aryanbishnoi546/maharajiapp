import React from "react";
import FloatingChat from "./FloatingChat";
import { FaWhatsapp, FaComments } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#2c2b2a] text-[#dee2da] py-12 px-6">
            <div  style={{ gap: '300px' }} className="max-w-6xl mx-auto flex flex-col md:flex-row items-start relative">
                {/* Menu */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Menu</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="underline hover:text-white">Home</a>
                        </li>
                        <li>
                            <a href="/terms" className="underline hover:text-white">Term & Conditions</a>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div className="md:static md:self-end">
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <p className="flex items-center gap-2 mb-2">
                        <FaWhatsapp className="text-green-500" />
                        Tel:- <a href="tel:+918968487451" className="font-semibold">+91 89684 87451</a>
                    </p>
                    <p className="mb-2">
                        E-mail:- <a href="mailto:info@maharajjjihealthcare.com" className="hover:underline">info@maharajjjihealthcare.com</a>
                    </p>
                    <p>
                        Maharajji Healthcare<br />
                        Bugga Road, Amloh<br />
                        Punjab, India - 147203
                    </p>
                </div>

                {/* Chat Button */}
               
                <FloatingChat/>
            </div>
        </footer>
    );
}
