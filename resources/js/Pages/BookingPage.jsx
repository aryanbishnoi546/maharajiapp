import React, { useState } from "react";
import { router } from '@inertiajs/react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { usePage } from '@inertiajs/react';

export default function BookingPage() {
  const { flash } = usePage().props;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const times = [
    "9:00 am", "9:30 am", "10:00 am",
    "10:30 am", "11:00 am", "11:30 am",
    "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm",
  ];

  const formatDate = (date) =>
    date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

  const toYmd = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // ✅ handleNext via Inertia router (handles CSRF/session reliably)
  const handleNext = async () => {
    if (!selectedTime) {
      alert("Please select a time slot ⏰");
      return;
    }

    setLoading(true);
    router.post('/meetings', {
      date: toYmd(selectedDate),
      time: selectedTime,
      service: 'Video Consultation',
    }, {
      preserveScroll: true,
      onSuccess: () => {
        alert('Meeting booked successfully!');
        setLoading(false);
      },
      onError: (errors) => {
        console.error(errors);
        alert('Something went wrong while booking');
        setLoading(false);
      }
    });
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#393c30] text-[#fce0d9] py-10 font-sans">
        <div className="max-w-6xl mx-auto">
          {flash?.success && (
            <div className="mb-4 bg-green-600 text-white px-4 py-3 rounded shadow">
              {flash.success}
            </div>
          )}
          <button className="text-sm mb-6 flex items-center gap-1">
            <ChevronLeft size={18} /> Back
          </button>

          <h1 className="text-3xl font-semibold mb-1">Schedule your service</h1>
          <p className="text-sm text-[#ccc] mb-10">
            Check out our availability and book the date and time that works for you
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar + Time Slots */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-sm uppercase font-semibold mb-2">
                  Select a Date and Time
                </h2>
                <div className="bg-white rounded-xl p-4 max-w-sm">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    className="text-black"
                    nextLabel={<ChevronRight size={18} />}
                    prevLabel={<ChevronLeft size={18} />}
                  />
                </div>
              </div>

              <div>
                <p className="text-sm mt-2 mb-3 text-[#ccc]">
                  Availability for {formatDate(selectedDate)}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-4 rounded border text-sm transition font-medium ${selectedTime === time
                          ? "bg-[#fce0d9] text-black"
                          : "bg-transparent border-[#666] text-[#fce0d9]"
                        } hover:bg-[#fce0d9] hover:text-black`}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                <div className="mt-3">
                  <button className="text-sm underline hover:text-white">
                    Show all sessions
                  </button>
                </div>
              </div>
            </div>

            {/* Service Details + Next Button */}
            <div>
              <h3 className="text-sm uppercase font-semibold mb-2">
                Service Details
              </h3>
              <div className="bg-[#2e3027] border border-[#444] p-4 rounded-xl space-y-4">
                <p className="text-base">Video Consultation</p>
                <p className="text-sm text-[#ccc]">Location: Aragaroh</p>
                <p className="text-sm text-[#ccc]">30-minute consultation via Zoom or Google Meet.</p>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!selectedTime || loading}
                  className={`w-full py-2 rounded font-semibold transition ${selectedTime && !loading
                      ? "bg-[#fce0d9] text-black hover:bg-[#ffcabd]"
                      : "bg-gray-500 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  {loading ? "Booking..." : "Next"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
