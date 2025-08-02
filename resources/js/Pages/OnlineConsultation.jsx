import React from "react";
import Footer from "@/Components/Footer";
import UserLayout from "@/Layouts/UserLayout";
import { Head } from "@inertiajs/react";
import OnlineConsultationContent from "@/Components/OnlineConsultation";

export default function OnlineConsultation() {
  return (
    <>
      <Head title="Online Consultation" />
      <UserLayout>
        <OnlineConsultationContent />
      </UserLayout>
    </>
  );
}
