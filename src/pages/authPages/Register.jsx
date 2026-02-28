import React, { useState } from "react";
import axios from "axios"; 


import { useNavigate, useLocation, Link } from "react-router-dom";
import { HeartHandshake, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const urlRole = queryParams.get("role");
  const storedRole = localStorage.getItem("selected_role");
  const role = urlRole || storedRole || "donor";



  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    pincode: "",
    licenseNumber: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess(false);
  setLoading(true);

  // Basic validation
  if (!formData.username || !formData.password) {
    setError("Username and password are required");
    setLoading(false);
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    setLoading(false);
    return;
  }

  if (formData.password.length < 6) {
    setError("Password must be at least 6 characters");
    setLoading(false);
    return;
  }

  if (role === "bloodbank" && (!formData.phone || !formData.pincode || !formData.licenseNumber)) {
    setError("Please fill all required fields for blood bank registration");
    setLoading(false);
    return;
  }

  if ((role === "donor" || role === "recipient") && !formData.email) {
    setError("Email is required");
    setLoading(false);
    return;
  }

  try {
    await axios.post(
      `${BACKEND_URL}/api/auth/register`,
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role,
        phone: formData.phone,
        pincode: formData.pincode,
        licenseNumber: formData.licenseNumber,
      }
    );

    setSuccess(true);
    setTimeout(() => {
      navigate(`/auth/login?role=${role}`);
    }, 2000);

  } catch (err) {
    setError(err.response?.data?.message || "Registration failed. Try again.");
  }

  setLoading(false);
};

  const getRoleLabel = () => {
    const labels = {
      admin: "Admin",
      bloodbank: "Blood Bank",
      donor: "Donor",
      recipient: "Recipient",
    };
    return labels[role] || "User";
  };

  const renderFields = () => {
    switch (role) {
      case "bloodbank":
        return (
          <>
            <div>
              <label className="block text-white font-medium mb-3">Bank Name</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="e.g., Red Cross Blood Bank"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-3">Email (Optional)</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="bank@example.com"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-3">Phone Number</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-3">Pin Code</label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="110001"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-3">License Number</label>
              <input
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                placeholder="LIC123456"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
            </div>
          </>
        );


      default:
        return (
          <>
            <div>
              <label className="block text-white font-medium mb-3">Username</label>
              <input
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-3">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@example.com"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
            </div>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-2 text-white hover:text-red-500 transition-colors">
              <HeartHandshake className="w-6 h-6 text-red-600" />
              <span className="text-2xl font-bold">BloodConnect</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Register as <span className="text-red-600 font-semibold">{getRoleLabel()}</span></p>
        </div>

        {success && (
          <div className="bg-green-600/20 border border-green-600/50 rounded-lg p-4 mb-6 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-green-200 font-semibold">Account created successfully!</p>
              <p className="text-green-200/80 text-sm">Redirecting to login...</p>
            </div>
          </div>
        )}

        <form onSubmit={handleRegister} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {renderFields()}

          {/* Password */}
          <div>
            <label className="block text-white font-medium mb-3">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-white font-medium mb-3">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-bold py-3 rounded-lg transition-colors duration-200"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6 text-gray-400">
          Already have an account? <Link to={`/auth/login?role=${role}`} className="text-red-600 hover:text-red-500 font-semibold">Sign in</Link>
        </div>

        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 text-sm">← Choose a different role</Link>
        </div>
      </div>
    </div>
  );
}