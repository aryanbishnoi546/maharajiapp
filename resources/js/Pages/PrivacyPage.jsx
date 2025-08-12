import React from "react";
import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function PrivacyPage() {
  return (
    <>
      <Head title="Privacy Policy" />
      <UserLayout>
        <section className="bg-[#dfe3d3] text-[#3e4236] py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Privacy Policy</h1>
            <p className="mb-4">
              At Maharaji Ji Healthcare, we value your privacy. This policy explains how we collect, use, and safeguard your personal information.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We collect data necessary to process orders and improve our services.</li>
              <li>Your data is never sold or shared with third parties without consent.</li>
              <li>We use secure payment gateways to protect your financial information.</li>
              <li>You may request data deletion at any time.</li>
            </ul>
          </div>
        </section>
      </UserLayout>
    </>
  );
}
