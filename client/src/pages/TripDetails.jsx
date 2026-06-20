import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";
import ReactMarkdown from "react-markdown";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);

  const fetchTrip = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/itinerary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTrip(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/itinerary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Trip Deleted Successfully");

      navigate("/trips");
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Trip");
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/trips/${id}`;

      await navigator.clipboard.writeText(shareUrl);

      alert("Trip Link Copied Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed To Copy Link");
    }
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  if (!trip) {
    return (
      <DashboardLayout>
        <h2 className="text-white text-2xl">
          Loading...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold text-white mb-8">
        Trip Details
      </h2>

      <div
        className="
          bg-[#0F1024]
          border
          border-white/10
          rounded-3xl
          p-8
        "
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl text-white font-semibold">
            {trip.fileName}
          </h3>

          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="
                bg-purple-600
                hover:bg-purple-700
                px-4
                py-2
                rounded-xl
                text-white
                transition
              "
            >
              Share Trip
            </button>

            <button
              onClick={handleDelete}
              className="
                bg-red-600
                hover:bg-red-700
                px-4
                py-2
                rounded-xl
                text-white
                transition
              "
            >
              Delete Trip
            </button>
          </div>
        </div>

        <p className="text-slate-400 mb-8">
          Created:{" "}
          {new Date(trip.createdAt).toLocaleDateString()}
        </p>

        <div className="mb-10">
          <h4 className="text-xl text-purple-400 mb-4">
            Generated Itinerary
          </h4>

          <div
            className="
              prose
              prose-invert
              max-w-none
            "
          >
            <ReactMarkdown>
              {trip.itinerary}
            </ReactMarkdown>
          </div>
        </div>

        <div>
          <h4 className="text-xl text-purple-400 mb-4">
            Extracted PDF Data
          </h4>

          <pre
            className="
              text-slate-300
              whitespace-pre-wrap
              bg-[#16182F]
              p-4
              rounded-xl
              overflow-auto
            "
          >
            {trip.extractedText}
          </pre>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TripDetails;