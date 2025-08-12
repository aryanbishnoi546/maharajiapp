import React from "react";
import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function ContactPage() {
  return (
    <>
      <Head title="Contact" />
      <UserLayout>
        <section className="bg-[#dfe3d3] py-16 px-6 md:px-12">
          <h2 className="text-3xl font-semibold text-[#3e4236] text-center mb-8">Contact Us</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <form className="space-y-4">
              <input type="text" placeholder="Name" className="w-full p-3 border rounded-md" />
              <input type="email" placeholder="Email" className="w-full p-3 border rounded-md" />
              <textarea placeholder="Message" rows="5" className="w-full p-3 border rounded-md"></textarea>
              <button className="bg-[#3e4236] text-white px-6 py-3 rounded-md">Send Message</button>
            </form>
            <div>
              <p className="mb-4">📍 Bugga Road, Amloh, Punjab, India - 147203</p>
              <p className="mb-4">📞 +91 89684 87451</p>
              <iframe
                title="map"
                src="https://maps.google.com/maps?q=Amloh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-64 border"
              ></iframe>
            </div>
          </div>
        </section>
      </UserLayout>
    </>
  );
}
