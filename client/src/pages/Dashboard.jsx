import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";
import BentoCard from "../components/BentoCard";
import api from "../services/api";

import toast from "react-hot-toast";

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
      toast.error("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    fetchTrips();

    document.title = "Dashboard | Trrip Travels";
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
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
              Manage your trips and generate AI-powered travel itineraries.
            </p>

            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-slate-500 text-sm">
                  Total Trips
                </p>

                <p className="text-white text-2xl font-bold">
                  {trips.length}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-sm">
                  Latest Trip
                </p>

                <p
                  className="text-white font-medium truncate max-w-[200px]"
                  title={
                    trips.length > 0
                      ? trips[0].fileName
                      : "No Trips Yet"
                  }
                >
                  {trips.length > 0
                    ? trips[0].fileName
                    : "No Trips Yet"}
                </p>
              </div>
            </div>
          </BentoCard>
        </div>

        {/* Upload Card */}
        <div className="lg:col-span-2">
          <BentoCard>
            <h2 className="text-2xl font-bold text-white mb-3">
              Upload Travel PDF
            </h2>

            <p className="text-slate-400 mb-5">
              Upload flight tickets, hotel bookings,
              or travel plans and let Gemini AI
              create your itinerary.
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
                hover:scale-105
                transition
              "
            >
              ✨ Upload Now
            </button>
          </BentoCard>
        </div>

        {/* Stats */}
        <BentoCard
          title="Total Trips"
          value={trips.length}
        />

        <BentoCard
          title="AI Powered"
          value="Gemini"
        />

        <BentoCard
          title="Database"
          value="MongoDB"
        />

        <BentoCard
          title="Status"
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
                    <div
                      className="font-semibold truncate"
                      title={trip.fileName}
                    >
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

        {/* Latest Trip */}
        <div className="lg:col-span-1">
          <BentoCard>
            <div className="flex flex-col items-center text-center">
              <div
                className="
                  w-24
                  h-24
                  rounded-full
                  bg-gradient-to-r
                  from-purple-500
                  to-fuchsia-500
                  flex
                  items-center
                  justify-center
                  text-3xl
                  mb-4
                "
              >
                ✈️
              </div>

              <h3 className="text-white font-bold mb-2">
                Latest Trip
              </h3>

              <p
                className="text-slate-400 text-sm break-words"
                title={
                  trips.length > 0
                    ? trips[0].fileName
                    : "No Trips"
                }
              >
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