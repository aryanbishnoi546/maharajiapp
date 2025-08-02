export default function BookingForm({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="bg-[rgb(44,43,42)] p-4 rounded-lg text-white space-y-4">
      <div>
        <label className="block text-sm">First Name</label>
        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2c2b2a] border border-gray-600 text-white"
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-[#2c2b2a] border border-gray-600 text-white"
        />
      </div>
    </div>
  );
}
