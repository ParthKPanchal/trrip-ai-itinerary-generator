import DashboardLayout from "../layouts/DashboardLayout";
import BentoCard from "../components/BentoCard";

const Dashboard = () => {
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
              Manage your trips and generate
              AI-powered itineraries.
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

            <button className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-6 py-3 rounded-xl">
              Upload Now
            </button>
          </BentoCard>
        </div>

        {/* Stats */}
        <BentoCard
          title="Trips Generated"
          value="12"
        />

        <BentoCard
          title="PDF Uploaded"
          value="8"
        />

        <BentoCard
          title="Shared Trips"
          value="4"
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

            <div className="space-y-4">

              <div className="bg-[#16182f] rounded-xl p-4">
                Goa Vacation.pdf
              </div>

              <div className="bg-[#16182f] rounded-xl p-4">
                Dubai Trip.pdf
              </div>

              <div className="bg-[#16182f] rounded-xl p-4">
                Bali Adventure.pdf
              </div>

            </div>
          </BentoCard>
        </div>

        {/* Profile */}
        <div className="lg:col-span-1">
          <BentoCard>

            <div className="flex flex-col items-center">

              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 mb-4"></div>

              <h3 className="text-white font-bold">
                Parth Panchal
              </h3>

              <p className="text-slate-400 text-sm">
                Software Developer
              </p>

            </div>

          </BentoCard>
        </div>

      </div>

    </DashboardLayout>
  );
};

export default Dashboard;