import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

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

      console.log(response.data);

      setTrips(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this itinerary?",
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
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold text-white mb-8">My Trips</h2>

      {trips.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl text-white mb-4">No Trips Yet ✈️</h2>

          <p className="text-slate-400">
            Upload your first PDF to generate an itinerary.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <div
              key={trip._id}
              onClick={() => navigate(`/trips/${trip._id}`)}
              className="
                bg-[#0F1024]
                border
                border-white/10
                rounded-3xl
                p-6
                cursor-pointer
                hover:border-purple-500
                hover:scale-[1.02]
                transition
              "
            >
              <h3 className="text-xl font-semibold text-white">
                {trip.fileName}
              </h3>
              <button
                onClick={handleDelete}
                className="
    bg-red-600
    hover:bg-red-700
    text-white
    px-4
    py-2
    rounded-xl
    mt-4
  "
              >
                Delete Trip
              </button>

              <p className="text-slate-400 mt-2">
                {new Date(trip.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Trips;
