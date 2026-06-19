import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

const TripDetails = () => {
  const { id } = useParams();

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
        <h3 className="text-2xl text-white font-semibold mb-4">
          {trip.fileName}
        </h3>

        <p className="text-slate-400 mb-6">
          Created:
          {" "}
          {new Date(trip.createdAt).toLocaleDateString()}
        </p>

        <div className="mb-8">
          <h4 className="text-xl text-purple-400 mb-3">
            Generated Itinerary
          </h4>

          <pre className="text-slate-300 whitespace-pre-wrap">
            {trip.itinerary}
          </pre>
        </div>

        <div>
          <h4 className="text-xl text-purple-400 mb-3">
            Extracted PDF Data
          </h4>

          <pre className="text-slate-300 whitespace-pre-wrap">
            {trip.extractedText}
          </pre>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TripDetails;