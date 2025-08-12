import React from "react";
import { Head, Link } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";

export default function NotFoundPage() {
  return (
    <>
      <Head title="404 Not Found" />
      <UserLayout>
        <section className="bg-[#3e4236] text-white py-32 px-6 md:px-12 text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
          <Link
            href="/"
            className="bg-[#dfe3d3] text-[#3e4236] px-6 py-3 rounded-md font-medium"
          >
            Go Back Home
          </Link>
        </section>
      </UserLayout>
    </>
  );
}
