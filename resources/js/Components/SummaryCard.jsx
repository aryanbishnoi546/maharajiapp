export default function SummaryCard({ date, time, total }) {
  return (
    <div className="bg-[rgb(44,43,42)] p-4 text-white rounded-lg shadow">
      <h4 className="text-lg font-bold mb-2">Booking Summary</h4>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <p className="font-semibold mt-2">Total: ${total}</p>
    </div>
  );
}
