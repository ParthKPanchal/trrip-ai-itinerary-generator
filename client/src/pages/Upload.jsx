import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import BentoCard from "../components/BentoCard";
import api from "../services/api";

import toast from "react-hot-toast";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("document", file);

      const token = localStorage.getItem("token");

      const uploadPromise = api.post(
        "/itinerary/generate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.promise(uploadPromise, {
        loading: "🤖 Gemini AI is generating your trip...",
        success: "✅ Itinerary Generated Successfully!",
        error: "❌ Upload Failed",
      });

      const response = await uploadPromise;

      console.log(response.data);

      navigate("/trips");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Upload PDF
      </h2>

      {/* Upload Card */}
      <BentoCard className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">
          Upload Travel Document
        </h3>

        <label
          className="
            flex
            flex-col
            items-center
            justify-center
            text-center
            border-2
            border-dashed
            border-purple-500/40
            rounded-2xl
            p-10
            cursor-pointer
            hover:border-purple-500
            transition
          "
        >
          <div className="text-6xl mb-4">📄</div>

          <p className="text-white font-semibold text-lg">
            Click to Select PDF
          </p>

          <p className="text-slate-400 text-sm mt-2">
            Flight Tickets • Hotel Bookings • Travel Plans
          </p>

          <p className="text-purple-400 text-sm mt-3">
            Maximum recommended size: 10MB
          </p>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {file && (
          <div
            className="
              mt-6
              bg-[#16182f]
              p-4
              rounded-xl
              text-green-400
              break-all
            "
          >
            ✅ Selected File: {file.name}
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="
            mt-6
            w-full
            bg-gradient-to-r
            from-purple-600
            to-fuchsia-600
            px-6
            py-4
            rounded-xl
            text-white
            font-semibold
            disabled:opacity-50
          "
        >
          {loading
            ? "🤖 Gemini AI is generating..."
            : "✨ Generate AI Itinerary"}
        </button>
      </BentoCard>

      {/* Info Cards */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <BentoCard>
          <h3 className="text-2xl font-bold text-white mb-6">
            How It Works
          </h3>

          <div className="space-y-4 text-slate-300">
            <div>1️⃣ Upload your travel PDF</div>
            <div>2️⃣ Extract booking information</div>
            <div>3️⃣ Gemini AI analyzes details</div>
            <div>4️⃣ Generate day-wise itinerary</div>
            <div>5️⃣ Save trip in MongoDB</div>
            <div>6️⃣ View it anytime from My Trips</div>
          </div>
        </BentoCard>

        <BentoCard>
          <h3 className="text-2xl font-bold text-white mb-6">
            Supported Documents
          </h3>

          <div className="space-y-4 text-slate-300">
            <div>✈️ Flight Tickets</div>
            <div>🏨 Hotel Reservations</div>
            <div>🧳 Travel Booking Confirmations</div>
            <div>🌍 Tour Packages</div>
            <div>📅 Travel Plans</div>
            <div>📄 Combined Travel PDFs</div>
          </div>
        </BentoCard>
      </div>

      {/* Tips */}
      <BentoCard>
        <h3 className="text-2xl font-bold text-white mb-6">
          Tips For Best Results
        </h3>

        <ul className="space-y-4 text-slate-300">
          <li>✅ Upload clear and readable PDFs</li>
          <li>✅ Include travel dates</li>
          <li>✅ Include hotel booking details</li>
          <li>✅ Include flight information</li>
          <li>✅ Include activities if available</li>
          <li>✅ Larger travel documents produce richer itineraries</li>
        </ul>
      </BentoCard>
    </DashboardLayout>
  );
};

export default Upload;