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
        <section className="bg-[#dfe3d3] text-[#3e4236] py-16 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-8">Frequently Asked Questions</h1>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border rounded-md p-4">
                  <button
                    className="flex justify-between w-full text-lg font-medium"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  >
                    {faq.question}
                    <span>{openIndex === index ? "-" : "+"}</span>
                  </button>
                  {openIndex === index && <p className="mt-2">{faq.answer}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      </UserLayout>
    </>
  );
}
