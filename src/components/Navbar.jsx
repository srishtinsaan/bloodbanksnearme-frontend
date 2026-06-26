import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/admin_helper.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const role = user?.role;

  useEffect(() => {
  const checkUser = () => {
    const u = getCurrentUser();
    setUser(u);
  };

  checkUser();

  window.addEventListener("storage", checkUser);
  window.addEventListener("auth-change", checkUser);

  return () => {
    window.removeEventListener("storage", checkUser);
    window.removeEventListener("auth-change", checkUser);
  };
}, []);

const handleLogout = () => {


  localStorage.removeItem("accessToken");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
  localStorage.removeItem("mode");
  setUser(null);
  setIsOpen(false);

  window.dispatchEvent(new Event("auth-change"));

  navigate("/");
};

  const handleProtectedRoute = (path, role) => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      navigate(path);
    } else {
      navigate(`/auth/login?role=${role}`);
    }
    setIsOpen(false);
  };

 

  return (
    <nav className="w-full lg:fixed bg-black border-b border-white/20 z-50 shadow-md relative">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 lg:py-1">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <HeartHandshake className="h-12 w-12 sm:h-14 sm:w-14 text-red-500" />
          <div className="flex flex-col leading-none">
            <h1 className="font-bold text-lg sm:text-xl">BloodConnect</h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm sm:text-base font-medium">

        {role !== "admin" && role !== "bank" && (
  <>
    <button
      onClick={() =>
        handleProtectedRoute("/dashboard/donor/register", "donor")
      }
      className="font-semibold hover:text-white/90"
    >
      Donate Blood
    </button>

    <button
      onClick={() =>
        handleProtectedRoute(
          "/dashboard/recipient/blood-request",
          "recipient"
        )
      }
      className="font-semibold hover:text-white/90"
    >
      Request Blood
    </button>
  </>
)}

          <button
            onClick={() => navigate("/about-us")}
            className="font-semibold hover:text-white/90"
          >
            About Us
          </button>

          {/* USER / SIGN IN */}
          {user ? (
            <div className="flex items-center gap-3">
              <div
                onClick={() => {
                  const dest =
    user?.role === "user"
      ? user?.mode
        ? `/dashboard/${user.mode}`
        : "/auth/user-mode"
      : `/dashboard/${user?.role}`;
                  navigate(dest);
                }}
                className="w-10 h-10 flex items-center justify-center 
                           rounded-full bg-red-600 text-white 
                           font-bold cursor-pointer hover:bg-red-700 transition"
              >
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/role")}
              className="px-3 py-[0.9px] bg-white text-black font-medium 
                         rounded-md hover:bg-zinc-200 shadow-sm hover:shadow-md"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute md:hidden w-full bg-black border-b border-white/20 px-6 py-6 flex flex-col gap-2"
          >

            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            {role !== "admin" && (
  <>
    <Link to="/dashboard/donor" onClick={() => setIsOpen(false)}>
      Donate Blood
    </Link>

    <Link to="/dashboard/recipient" onClick={() => setIsOpen(false)}>
      Request Blood
    </Link>
  </>
)}
            <Link to="/about-us" onClick={() => setIsOpen(false)}>About Us</Link>

            <div className="border-t border-zinc-800 mt-3 pt-3">

              {user ? (
                <>
                  <div
                    onClick={() => {
                      handleLogout();
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/auth/role");
                    setIsOpen(false);
                  }}
                  className="w-full bg-red-600 text-white py-2 rounded-lg"
                >
                  Sign In
                </button>
              )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;