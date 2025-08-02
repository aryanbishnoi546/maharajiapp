import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarTimer() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const timeSlots = [
    "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am",
    "11:30 am", "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm"
  ];

  return (
    <div className="min-h-screen bg-[#2d2e27] text-[#e8d0c5] font-sans p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 text-sm mb-6 cursor-pointer text-[#e8d0c5]">
          <ChevronLeft size={18} />
          <span>Back</span>
        </div>

        <h1 className="text-3xl font-semibold mb-2">Schedule your service</h1>
        <p className="text-sm text-[#c0b6ad] mb-6">
          Check out our availability and book the date and time that works for you
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Calendar + Time Slots */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-3">Select a Date and Time</h2>
            <div className="flex flex-col md:flex-row gap-10">
              {/* Calendar */}
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={({ date }) =>
                  date.toDateString() === selectedDate.toDateString()
                    ? 'bg-[#f5cabb] text-black rounded-md'
                    : 'text-white'
                }
                className="!bg-transparent text-white rounded-xl border-none"
                calendarType="US"
                prevLabel={<ChevronLeft />}
                nextLabel={<ChevronRight />}
              />

              {/* Time slots */}
              <div className="flex flex-col gap-2 mt-2 w-full">
                <p className="text-sm text-[#c7c0b9]">
                  Availability for {selectedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-4 rounded-md border transition ${
                        selectedTime === time
                          ? 'bg-[#f5cabb] text-black font-semibold'
                          : 'bg-transparent border-[#44433f] text-[#e8d0c5] hover:bg-[#3e3e36]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                <button className="text-sm underline mt-2 text-[#b8ada2] hover:text-white">Show all sessions</button>
              </div>
            </div>
          </div>

          {/* Service details */}
          <div className="border-l border-[#3f3f3c] pl-6">
            <h2 className="text-lg font-semibold mb-2">Service Details</h2>
            <p className="mb-2 text-sm">Video Consultation</p>
            <details className="text-sm mb-4 cursor-pointer">
              <summary className="text-[#c0b6ad]">More details</summary>
              <p className="text-[#a49f97] mt-2">A 30-minute consultation via video call.</p>
            </details>
            <button
              className="bg-[#f5cabb] hover:bg-[#f1bfb0] text-[#2d2e27] w-full py-2 rounded-md font-semibold mt-4 transition"
              disabled={!selectedTime}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
