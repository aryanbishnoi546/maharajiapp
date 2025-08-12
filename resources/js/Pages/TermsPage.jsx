import React from "react";
import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function TermsPage() {
  return (
    <>
      <Head title="Terms & Conditions" />
      <UserLayout>
        <section className="bg-[#dfe3d3] text-[#3e4236] py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Terms & Conditions</h1>
            <p className="mb-4">
              Welcome to Maharaji Ji Healthcare. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Products are for personal use only and not for resale.</li>
              <li>We reserve the right to refuse service at our discretion.</li>
              <li>All orders are subject to availability.</li>
              <li>Prices are subject to change without prior notice.</li>
            </ul>
            <p className="mt-4">
              Please read these terms carefully before using our website or services.
            </p>
          </div>
        </section>
      </UserLayout>
    </>
  );
}
