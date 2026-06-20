import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("document", file);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/itinerary/generate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Itinerary Generated Successfully");

      navigate("/trips");
    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold text-white mb-8">
        Upload PDF
      </h2>

      <div
        className="
        bg-[#0F1024]
        rounded-3xl
        p-8
        border
        border-white/10
      "
      >
        <input
          type="file"
          accept=".pdf"
          className="text-white"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="
            mt-5
            bg-gradient-to-r
            from-purple-600
            to-fuchsia-600
            px-6
            py-3
            rounded-xl
            text-white
            disabled:opacity-50
          "
        >
          {loading
            ? "✨ Generating AI Itinerary..."
            : "Upload PDF"}
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Upload;