import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      alert("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };
  return (
    <div className="min-h-screen bg-[#070816] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute w-96 h-96 bg-purple-600 opacity-20 blur-[120px] rounded-full top-10 left-10"></div>

      <div className="absolute w-96 h-96 bg-fuchsia-500 opacity-20 blur-[120px] rounded-full bottom-10 right-10"></div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#0F1024]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back 👋</h1>

        <p className="text-slate-400 mb-8">Login to your Trip AI account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-slate-300 mb-2">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="w-full bg-[#16182f] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full bg-[#16182f] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
