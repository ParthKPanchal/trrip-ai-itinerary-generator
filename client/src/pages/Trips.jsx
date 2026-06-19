import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

const Trips = () => {
  const [trips, setTrips] = useState([]);

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
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-4xl font-bold text-white mb-8">
        My Trips
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {trips.map((trip) => (
          <Link
            key={trip._id}
            to={`/trips/${trip._id}`}
            className="
              block
              bg-[#0F1024]
              border
              border-white/10
              rounded-3xl
              p-6
              hover:border-purple-500
              transition
            "
          >
            <h3 className="text-xl font-semibold text-white">
              {trip.fileName}
            </h3>

            <p className="text-slate-400 mt-2">
              {new Date(trip.createdAt).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Trips;