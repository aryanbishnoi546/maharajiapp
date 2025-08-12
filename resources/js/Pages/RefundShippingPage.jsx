import React from "react";
import { Head } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function RefundShippingPage() {
  return (
    <>
      <Head title="Refund & Shipping Policy" />
      <UserLayout>
        <section className="bg-[#dfe3d3] text-[#3e4236] py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6">Refund & Shipping Policy</h1>
            <h2 className="text-2xl font-medium mt-6 mb-3">Refund Policy</h2>
            <p className="mb-4">
              If you are not satisfied with your purchase, you may request a refund within 7 days of delivery.
              Products must be unopened and in original packaging.
            </p>
            <h2 className="text-2xl font-medium mt-6 mb-3">Shipping Policy</h2>
            <p>
              We ship orders within 2-5 business days. Delivery time varies based on location.
              Tracking details will be provided once your order has been shipped.
            </p>
          </div>
        </section>
      </UserLayout>
    </>
  );
}
