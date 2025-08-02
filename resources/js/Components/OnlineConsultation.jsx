import { Link } from "@inertiajs/react";
import React from "react";

const OnlineConsultationContent = () => {
  const consultations = [
    {
      title: "Video Consultation",
      desc: "Personalized Ayurveda through Live Video Guidance.",
      price: "$55",
      img: "https://static.wixstatic.com/media/b4cfae_6674c6e7350f43b2a162ad0339bc1868~mv2.jpg/v1/fill/w_536,h_540,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/b4cfae_6674c6e7350f43b2a162ad0339bc1868~mv2.jpg",
    },
    {
      title: "Audio Consultation",
      desc: "Ayurvedic Guidance Tailored to Your Unique Well-being",
      price: "$40",
      img: "https://static.wixstatic.com/media/b4cfae_f59df166efd84bb89761b2494d5e253a~mv2.jpg/v1/fill/w_536,h_540,fp_0.50_0.50,q_80,usm_0.66_1.00_0.01,enc_auto/b4cfae_f59df166efd84bb89761b2494d5e253a~mv2.jpg",
    },
  ];

  return (
    <>
      <section className="bg-[#3e4236] text-white py-20 px-6 md:px-12 relative">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            Connecting with Ayurvedic Wisdom, <br /> Virtually and Seamlessly
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto mb-16">
            Embark on a transformative path to well-being with AyurvedaSpace,
            where traditional Ayurvedic wisdom meets the convenience of modern
            technology.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {consultations.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-500 rounded-lg p-6 text-center hover:shadow-xl transition bg-[#41473a]"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto rounded-full w-40 h-40 object-cover mb-6"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 mb-2">{item.desc}</p>
                <Link
                  href="#"
                  className="text-sm underline text-gray-200 hover:text-white"
                >
                  Read More
                </Link>
                <hr className="my-4 border-gray-500" />
                <p className="mb-4">{item.price}</p>
                <Link href="/booking" className="bg-[#f4cfc4] text-[#3e4236] px-5 py-2 rounded-full hover:bg-white transition">
                  Book Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
            <section className="bg-[#3e4236] text-white py-24 px-6 md:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug">
            Consult Ayurvedic Doctor Online
            <br />
            <span className="block mt-2">at Your Own Pace</span>
            <div className="w-24 h-1 border-b-2 border-white mt-4 mx-auto"></div>
          </h1>

          <p className="text-gray-300 mt-6 text-lg">
            Consulting with an Ayurvedic doctor is now effortless and efficient.
            Our online platform eliminates the hassles of traditional clinic
            visits, ensuring timely and effective service delivery.
          </p>

          <p className="text-gray-300 mt-4">
            Say goodbye to long queues and waiting room woes. Experience
            consultations from the comfort of your home, steering clear of
            crowded clinics and potential health risks. Maharaj Ji Healthcare's
            online Ayurvedic doctor consultation platform is designed to
            revolutionize the Indian healthcare landscape. Our vision is to expand
            access to Ayurvedic expertise, fostering remote consultations,
            continuous care, follow-ups, and second opinions, ultimately saving
            you time, effort, and money.
          </p>
        </div>
      </section>
    </>
  );
};

export default OnlineConsultationContent;
