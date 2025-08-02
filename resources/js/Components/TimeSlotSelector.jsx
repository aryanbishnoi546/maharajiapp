export default function TimeSlotSelector({ slots, selectedTime, onSelect }) {
  return (
    <div className="mt-4">
      <h3 className="text-white mb-2 font-semibold">Select Time Slot</h3>
      <div className="grid grid-cols-3 gap-2">
        {slots.map((slot) => (
          <button
            key={slot}
            onClick={() => onSelect(slot)}
            className={`p-2 rounded text-sm ${
              selectedTime === slot
                ? 'bg-[#f9cfc5] text-black'
                : 'bg-[#333] text-white hover:bg-[#f9cfc5] hover:text-black'
            }`}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
}
