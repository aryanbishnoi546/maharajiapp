import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What is Ayurveda?", answer: "Ayurveda is a traditional system of medicine with roots in India over 5000 years ago." },
    { question: "Do you offer online consultations?", answer: "Yes, you can book audio/video consultations through our website." },
    { question: "What payment methods are accepted?", answer: "We accept UPI, credit/debit cards, and net banking." },
  ];

  return (
    <>
      <Head title="FAQs" />
      <UserLayout>
        <section className="bg-[#dfe3d3] text-[#3e4236] py-12 px-4 md:py-16 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Heading */}
            <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
              Frequently Asked Questions
            </h1>

            {/* FAQ List */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-lg p-4 bg-white/60">
                  <button
                    className="flex justify-between items-center w-full text-base md:text-lg font-medium"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <span className="ml-2 text-xl font-bold">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  {/* Answer */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === index ? "max-h-40 mt-2" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </UserLayout>
    </>
  );
}
