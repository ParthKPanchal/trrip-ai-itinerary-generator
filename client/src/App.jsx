import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Upload from "./pages/Upload";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#0F1024",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "12px",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trips/:id"
          element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;