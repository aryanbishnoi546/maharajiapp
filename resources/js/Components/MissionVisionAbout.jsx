import React from "react";

const MissionVisionAbout = () => {
  return (
    <div className="bg-[#3e4236] text-white">
      {/* Mission Section */}
      <section className="py-16 px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Mission</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Our mission is dedicated to enhancing individuals’ health and well-being by delivering top-notch care to each patient. We strive to go beyond mere treatment, fostering a holistic approach that considers the unique needs of every individual. Our commitment extends to promoting preventative measures, education, and a supportive healthcare environment. We aim to provide care and empower individuals on their journey to lasting health and vitality.
        </p>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-6 md:px-12 text-center border-t border-gray-500">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">Vision</h2>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Our vision is to transcend into a beacon of excellence in healthcare, accessible to everyone. In pursuit of this vision, we are committed to delivering high-quality medical services and promoting inclusivity and accessibility in healthcare. We envision a future where our reach extends to diverse communities, ensuring everyone has equal access to the best possible healthcare solutions. Our holistic approach encompasses cutting-edge medical advancements, community engagement, and a dedication to continuously redefine the standards of quality healthcare for the benefit of all.
        </p>
      </section>

      {/* About Us Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">About Us</h2>
            <p className="text-gray-300">
              In the contemporary challenges of Kalyug, where the mind and body face intricate struggles, Brahmgiani Sant Baba Ajit Singh Ji Maharaj Hansali Wale discerned the enduring efficacy of Ayurvedic medicines. Embracing this wisdom, Maharaj Ji Healthcare emerges as a philanthropic entity, dedicated to the well-being of individuals. Our core ethos is rooted in the guidance of Sant Baba Ajit Singh Ji Maharaj, advocating for the adoption of Ayurvedic medications renowned for their natural and lasting effects. As a charitable endeavor, our mission extends beyond profit, focusing on the provision of pure Ayurvedic remedies crafted according to the revered formulas prescribed by Maharaj Ji himself. With a commitment to holistic health, Maharaj Ji Healthcare stands as a beacon, harmonizing ancient wisdom with contemporary well-being.
            </p>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-6 items-center">
            <img
              src="https://static.wixstatic.com/media/b4cfae_365a619446cd417baa96265ecebe71d3~mv2.jpg/v1/crop/x_255,y_0,w_365,h_458/fill/w_396,h_506,al_c,lg_1,q_80,enc_avif,quality_auto/nindia_2020_101_19310518.jpg"
              alt="Ayurvedic Herbs"
              className="rounded-lg shadow-lg w-3/5"
            />
            {/* <img
              src="https://static.wixstatic.com/media/b4cfae_4dd306b70a0644cb8227d998323c6d3b~mv2.jpg/v1/crop/x_127,y_0,w_229,h_380/fill/w_321,h_483,al_c,lg_1,q_80,enc_avif,quality_auto/Ayurveda-herbs.jpg"
              alt="Ayurvedic Setup"
              className="rounded-lg shadow-lg w-4/5"
            /> */}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="bg-[#dfe3d3] text-[#3e4236] py-16 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <img
            src="https://cdn-icons-png.flaticon.com/512/65/65596.png" // Replace with your actual logo if needed
            alt="Logo"
            className="mx-auto w-20 h-20 mb-4"
          />
          <p className="italic text-xl font-medium">
            "At the heart of our vision lies the profound belief that your personal self-realization serves as the most impactful service you can offer to the world through our work"
          </p>
          <div className="mt-2 text-2xl">~</div>
        </div>
      </section>
    </div>
  );
};

export default MissionVisionAbout;
