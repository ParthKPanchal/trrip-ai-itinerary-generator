import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#050816]">
      <Sidebar />

      <main
        className="
          md:ml-64
          p-4
          md:p-8
          mt-16
          md:mt-0
          min-h-screen
        "
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;