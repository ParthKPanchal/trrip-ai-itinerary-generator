import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import api from "../services/api";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Register | Trrip Travels";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const registerPromise = api.post(
        "/auth/register",
        formData
      );

      toast.promise(registerPromise, {
        loading: "Creating account...",
        success: "Registration successful",
        error: "Registration failed",
      });

      await registerPromise;

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070816] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Effects */}
      <div
        className="
          absolute
          w-96
          h-96
          bg-purple-600
          opacity-20
          blur-[120px]
          rounded-full
          top-10
          left-10
        "
      ></div>

      <div
        className="
          absolute
          w-96
          h-96
          bg-fuchsia-500
          opacity-20
          blur-[120px]
          rounded-full
          bottom-10
          right-10
        "
      ></div>

      {/* Register Card */}
      <div
        className="
          w-full
          max-w-md
          bg-[#0F1024]/80
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
          relative
          z-10
        "
      >
        <h1 className="text-4xl font-bold text-white mb-2">
          Create Account 🚀
        </h1>

        <p className="text-slate-400 mb-8">
          Start generating smart travel itineraries
        </p>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-slate-300 mb-2">
              Name
            </label>

            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Enter Name"
              className="
                w-full
                bg-[#16182f]
                border
                border-white/10
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              placeholder="Enter Email"
              className="
                w-full
                bg-[#16182f]
                border
                border-white/10
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
              placeholder="Enter Password"
              className="
                w-full
                bg-[#16182f]
                border
                border-white/10
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-purple-500
              "
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-gradient-to-r
              from-purple-600
              to-fuchsia-600
              py-3
              rounded-xl
              font-semibold
              text-white
              hover:scale-[1.02]
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}