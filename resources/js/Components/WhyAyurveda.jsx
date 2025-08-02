import React from "react";

export default function WhyAyurveda() {
    return (
        <>
            {/* Main Ayurveda Section */}
            <section className="bg-[#1e2a1f] text-white py-20 px-6 md:px-12">
                <div className="max-w-5xl mx-auto">
                    {/* Heading & Text */}
                    <div className="text-left mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold mb-6">Why Ayurveda?</h2>
                        <p className="text-gray-300 mb-6">
                            Ayurveda, an ancient Indian medical science with roots dating back over 5000 years, derives its name from the Sanskrit words "Ayur," meaning "life," and "Veda," meaning "science." Essentially, Ayurveda translates to "life science." This logical and practical methodology serves as a bridge to connect with nature, focusing on addressing imbalances or stress in one’s consciousness that lead to diseases. Ayurveda advocates for specific lifestyles, interventions, and natural therapies to restore harmony between the body, mind, spirit, and the environment. The treatment journey in Ayurveda begins with an internal purification process, followed by a personalized regimen involving a special diet, herbal remedies, massage therapy, yoga, and meditation. Often referred to as the Mother of Healing, Ayurveda encompasses a comprehensive approach to well-being.
                        </p>
                        <p className="text-gray-300">
                            Ayurveda remains an ancient bastion of equilibrium and vitality in a contemporary world inundated with modern solutions. Founded on the profound interconnectedness of mind, body, and spirit, Ayurveda transcends conventional symptom management. Maharaj Ji Healthcare, our digital sanctuary, exalts the wisdom of this traditional science, seamlessly weaving together herbs, lifestyle choices, and personalized care. At Maharaj Ji Healthcare, we invite you to explore the transformative potential of Ayurveda, where age-old practices are harmoniously integrated with modern accessibility, guiding you toward holistic health.
                        </p>
                    </div>

                    {/* Features Section */}
                    <div className="text-center space-y-10">
                        {[
                            "Audio/Video Consultation",
                            "Unique & Simple Approach",
                            "Experienced & Professional Doctor",
                            "Available at a Click of a Button",
                        ].map((item, index) => (
                            <div key={index}>
                                <p className="text-lg font-medium">{item}</p>
                                <div className="flex justify-center py-8">
                                    {/* SVG Divider */}
                                    <svg
                                        preserveAspectRatio="xMidYMid meet"
                                        viewBox="28.497 83.575 142.964 32.925"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-[100px]"
                                    >
                                        <path
                                            d="M130.7 116.5c-10.7 0-22.5-2.7-34-10.8-27.8-19.6-56.3-.7-57.5.1-3.1 2.1-7.3 1.3-9.5-1.7-2.1-3.1-1.4-7.2 1.7-9.3 12.8-8.8 44.6-20.1 73.1 0 26.1 18.4 55.2.6 56.5-.2 3.2-2 7.4-1.1 9.4 2.1 2 3.1 1.1 7.3-2.1 9.3-.9.5-17.1 10.5-37.6 10.5z"
                                            fill="#dee2da"
                                        />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Learn More Button */}
                    <div className="text-center mt-16">
                        <button className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-[#1e2a1f] transition">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>

            {/* Discover Plans CTA Section */}
            <section
                className="text-center text-[#2f362b] px-6 py-20 bg-fixed bg-cover bg-center"
                style={{ backgroundImage: "url('https://static.wixstatic.com/media/c837a6_ca3acf50e83e4cd78534cc34b8339ae3~mv2.png/v1/fill/w_2001,h_436,al_c,q_90,enc_avif,quality_auto/c837a6_ca3acf50e83e4cd78534cc34b8339ae3~mv2.png')" }} // Replace with your curve BG path
            >
                <p className="text-lg font-semibold max-w-3xl mx-auto">
                    Embark on a transformative journey at <span className="text-black font-bold">Maharaji Ji Healthcare</span>,
                    where tradition meets technology, and your well-being takes center stage.
                </p>
                <h3 className="text-2xl md:text-3xl font-medium mt-6 mb-8">
                    Your Path to Holistic Wellness Starts Here!
                </h3>
                <button className="bg-[#4e554a] text-white px-8 py-4 rounded-full text-lg hover:bg-[#3d433a] transition">
                    Discover Plans
                </button>
            </section>
        </>
    );
}
