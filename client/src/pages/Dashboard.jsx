import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import BentoCard from "../components/BentoCard";
import api from "../services/api";

const Dashboard = () => {
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
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-white text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Welcome Card */}
        <div className="lg:col-span-2">
          <BentoCard>
            <h2 className="text-3xl font-bold text-white mb-3">
              Welcome Back 👋
            </h2>

            <p className="text-slate-400">
              Total Trips: {trips.length}
            </p>

            <p className="text-slate-400 mt-2">
              Latest Trip:{" "}
              {trips.length > 0
                ? trips[0].fileName
                : "No Trips Yet"}
            </p>
          </BentoCard>
        </div>

        {/* Upload Card */}
        <div className="lg:col-span-2">
          <BentoCard>
            <h2 className="text-2xl font-bold text-white mb-3">
              Upload Travel PDF
            </h2>

            <p className="text-slate-400 mb-4">
              Upload flight tickets,
              hotel bookings or travel plans.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                bg-gradient-to-r
                from-purple-600
                to-fuchsia-600
                px-6
                py-3
                rounded-xl
                text-white
              "
            >
              Upload Now
            </button>
          </BentoCard>
        </div>

        {/* Stats Cards */}
        <BentoCard
          title="Total Trips"
          value={trips.length}
        />

        <BentoCard
          title="AI Powered"
          value="Gemini AI"
        />

        <BentoCard
          title="Database"
          value="MongoDB"
        />

        <BentoCard
          title="Account Status"
          value="Active"
        />

        {/* Recent Trips */}
        <div className="lg:col-span-3">
          <BentoCard>
            <h2 className="text-2xl font-bold text-white mb-5">
              Recent Itineraries
            </h2>

            {trips.length === 0 ? (
              <div className="text-slate-400">
                No trips generated yet.
              </div>
            ) : (
              <div className="space-y-4">
                {trips.slice(0, 5).map((trip) => (
                  <div
                    key={trip._id}
                    onClick={() =>
                      navigate(`/trips/${trip._id}`)
                    }
                    className="
                      bg-[#16182f]
                      rounded-xl
                      p-4
                      text-white
                      cursor-pointer
                      hover:bg-[#1d2040]
                      transition
                    "
                  >
                    <div className="font-semibold">
                      {trip.fileName}
                    </div>

                    <div className="text-sm text-slate-400 mt-1">
                      {new Date(
                        trip.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </BentoCard>
        </div>

        {/* Latest Trip Card */}
        <div className="lg:col-span-1">
          <BentoCard>
            <div className="flex flex-col items-center text-center">
              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  to-fuchsia-500
                  mb-4
                "
              ></div>

              <h3 className="text-white font-bold mb-2">
                Latest Trip
              </h3>

              <p className="text-slate-400 text-sm">
                {trips.length > 0
                  ? trips[0].fileName
                  : "No Trips"}
              </p>
            </div>
          </BentoCard>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;