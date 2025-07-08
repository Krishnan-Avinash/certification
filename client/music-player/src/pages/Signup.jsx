import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black px-4">
      <div className="bg-white/10 backdrop-blur-md shadow-xl rounded-2xl p-8 w-full max-w-md text-white">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-200">Create Your Account</h2>
  
        <input
          type="email"
          placeholder="Email"
          className="bg-white/20 placeholder-white/70 text-white p-3 w-full mb-4 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        <input
          type="password"
          placeholder="Password"
          className="bg-white/20 placeholder-white/70 text-white p-3 w-full mb-6 rounded-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-green-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
  
        <button
          className="bg-green-500 hover:bg-green-600 transition text-white w-full py-3 rounded-lg font-semibold shadow-md"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
  
}
