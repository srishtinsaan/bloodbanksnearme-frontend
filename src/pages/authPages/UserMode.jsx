import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { HeartHandshake, Users, ArrowLeft } from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function UserMode() {
  const navigate = useNavigate();

  const modes = [
    {
      id: "donor",
      label: "Donor",
      description: "Register as a blood donor, update your availability, and help save lives",
      icon: HeartHandshake,
    },
    {
      id: "recipient",
      label: "Recipient",
      description: "Find nearby blood banks, search for available groups, and request blood",
      icon: Users,
    },
  ];

  const handleModeSelect = async (modeId) => {
  try {
    await axios.patch(
      `${BACKEND_URL}/api/auth/set-mode`,
      { mode: modeId },
      { withCredentials: true }
    );

    localStorage.setItem("mode", modeId);

    if (modeId === "donor") {
      navigate("/dashboard/donor");
    } else {
      navigate("/dashboard/recipient");
    }
  } catch (error) {
    console.error("Mode update failed:", error);
  }
};

  
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 mb-3 mt-5 ml-3 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="min-h-screen mt-10 lg:mt-5 bg-black flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 w-full max-w-6xl">
          <div className="text-center mb-12">
            <Link to="/" className="inline-block mb-8">
              <div className="flex items-center justify-center gap-2 text-white transition-colors">
                <HeartHandshake className="w-6 h-6 text-red-600" />
                <span className="text-2xl font-bold">BloodConnect</span>
              </div>
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Select Your Mode
            </h1>
            <p className="text-gray-400 text-lg">
              How would you like to proceed today?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
            {modes.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-all duration-300 hover:shadow-lg hover:shadow-red-600/20 overflow-hidden text-left"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="mb-4 inline-block p-3 bg-red-600/20 rounded-lg group-hover:bg-red-600/30 transition-colors">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                      {mode.label}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {mode.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMode;