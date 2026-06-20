import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import BentoCard from "../components/BentoCard";
import api from "../services/api";

import toast from "react-hot-toast";

const Trips = () => {
  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/itinerary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTrips(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load trips");
    }
  };

  const handleDelete = async (tripId, e) => {
    e.stopPropagation();

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this itinerary?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const deletePromise = api.delete(`/itinerary/${tripId}`, {
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

      fetchTrips();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTrips();

    document.title = "My Trips | Trrip Travels";
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
        My Trips
      </h2>

      <p className="text-slate-400 mb-8">
        Total Trips: {trips.length}
      </p>

      {trips.length === 0 ? (
        <BentoCard>
          <div className="text-center py-12">
            <div className="text-7xl mb-6">✈️</div>

            <h2 className="text-3xl font-bold text-white mb-4">
              No Trips Yet
            </h2>

            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Upload your flight tickets, hotel reservations,
              or travel booking PDFs and let Gemini AI create
              a complete travel itinerary for you.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                bg-gradient-to-r
                from-purple-600
                to-fuchsia-600
                px-8
                py-3
                rounded-xl
                text-white
                font-medium
              "
            >
              🚀 Upload First Trip
            </button>
          </div>
        </BentoCard>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <BentoCard key={trip._id}>
              <div
                onClick={() => navigate(`/trips/${trip._id}`)}
                className="cursor-pointer"
              >
                <h3
                  className="
                    text-lg
                    font-semibold
                    text-white
                    break-words
                    line-clamp-2
                  "
                  title={trip.fileName}
                >
                  {trip.fileName}
                </h3>

                <p className="text-slate-400 mt-3">
                  {new Date(
                    trip.createdAt
                  ).toLocaleDateString()}
                </p>

                <p className="text-purple-400 text-sm mt-4">
                  AI Generated Itinerary
                </p>

                <p className="text-slate-500 text-xs mt-1">
                  Click to view complete trip details →
                </p>
              </div>

              <button
                onClick={(e) =>
                  handleDelete(trip._id, e)
                }
                className="
                  mt-5
                  w-full
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  px-4
                  py-2
                  rounded-xl
                  transition
                "
              >
                Delete Trip
              </button>
            </BentoCard>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Trips;