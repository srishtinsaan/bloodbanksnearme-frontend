import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { HeartHandshake, Eye, EyeOff, AlertCircle } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const urlRole = queryParams.get("role");
  const storedRole = localStorage.getItem("selected_role");
  const role = urlRole || storedRole || "donor";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // handleLogin inside the component
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );


      const { role, accessToken } = response.data.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("role", role);
      localStorage.setItem("username", response.data.data.user.username);

      navigate(`/dashboard/${role}`);

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <div className="flex items-center justify-center gap-2 text-white transition-colors">
              <HeartHandshake className="w-6 h-6 text-red-600" />
              <span className="text-2xl font-bold">BloodConnect</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-gray-400">
            Sign in as{" "}
            <span className="text-red-600 font-semibold">{getRoleLabel()}</span>
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-6">
          {error && (
            <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-white font-medium mb-3">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-red-600 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-white font-medium mb-3">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-bold py-3 rounded-lg transition-colors duration-200"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {(role === "donor" || role === "recipient" || role === "bloodbank") && (
          <div className="text-center mt-6">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link to={`/auth/register?role=${role}`} className="text-red-600 hover:text-red-500 transition-colors font-semibold">
                Register here
              </Link>
            </p>
          </div>
        )}

        <div className="text-center mt-4">
          <Link to="/auth/role" className="text-gray-500 hover:text-gray-300 transition-colors text-sm">
            ← Choose a different role
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;