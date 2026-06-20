import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import BentoCard from "../components/BentoCard";
import api from "../services/api";

import ReactMarkdown from "react-markdown";
import toast from "react-hot-toast";

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
      toast.error("Failed to load trip details");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const deletePromise = api.delete(`/itinerary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.promise(deletePromise, {
        loading: "Deleting trip...",
        success: "Trip deleted successfully",
        error: "Failed to delete trip",
      });

      await deletePromise;

      navigate("/trips");
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = async () => {
    try {
      const shareUrl = `${window.location.origin}/trips/${id}`;

      await navigator.clipboard.writeText(shareUrl);

      toast.success("Trip link copied to clipboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to copy link");
    }
  };

  useEffect(() => {
    fetchTrip();

    document.title = "Trip Details | Trrip Travels";
  }, []);

  if (!trip) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <div className="text-6xl mb-4">✈️</div>

          <h2 className="text-white text-2xl font-bold">
            Loading Trip...
          </h2>

          <p className="text-slate-400 mt-2">
            Fetching itinerary details
          </p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate("/trips")}
        className="
          text-purple-400
          hover:text-purple-300
          mb-4
        "
      >
        ← Back To Trips
      </button>

      <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Trip Details
      </h2>

      <BentoCard>
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5 mb-6">
          <h3
            className="
              text-xl
              md:text-2xl
              text-white
              font-semibold
              break-all
            "
          >
            {trip.fileName}
          </h3>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleShare}
              className="
                bg-purple-600
                hover:bg-purple-700
                px-5
                py-2
                rounded-xl
                text-white
                transition
              "
            >
              🔗 Share Trip
            </button>

            <button
              onClick={handleDelete}
              className="
                bg-red-600
                hover:bg-red-700
                px-5
                py-2
                rounded-xl
                text-white
                transition
              "
            >
              🗑️ Delete Trip
            </button>
          </div>
        </div>

        <p className="text-slate-400 mb-4">
          Created:{" "}
          {new Date(trip.createdAt).toLocaleDateString()}
        </p>

        <div className="mb-8">
          <span
            className="
              bg-green-500/20
              text-green-400
              px-3
              py-1
              rounded-full
              text-sm
            "
          >
            AI Generated with Gemini
          </span>
        </div>

        {/* AI Itinerary */}
        <div className="mb-10">
          <h4 className="text-xl text-purple-400 mb-4">
            Generated Itinerary
          </h4>

          <div
            className="
              prose
              prose-invert
              max-w-none
              text-slate-200
            "
          >
            <ReactMarkdown>
              {trip.itinerary}
            </ReactMarkdown>
          </div>
        </div>

        {/* PDF Data */}
        <div>
          <h4 className="text-xl text-purple-400 mb-4">
            Extracted PDF Data
          </h4>

          <pre
            className="
              text-slate-300
              whitespace-pre-wrap
              bg-[#16182F]
              p-5
              rounded-2xl
              overflow-auto
              max-h-[500px]
              text-sm
            "
          >
            {trip.extractedText}
          </pre>
        </div>
      </BentoCard>
    </DashboardLayout>
  );
};

export default TripDetails;