import { useState , useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {HeartHandshake} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

import { getCurrentUser } from "../utils/admin_helper.js"


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

useEffect(() => {
  const checkUser = () => {
    setUser(getCurrentUser());
  };

  checkUser();
  window.addEventListener("storage", checkUser);

  return () => window.removeEventListener("storage", checkUser);
}, []);

const handleProtectedRoute = (path, role) => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    navigate(path)
  } else {
    navigate(`/auth/login?role=${role}`)
  }
  setIsOpen(false)
}

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
          <button
  onClick={() => handleProtectedRoute("/dashboard/donor/register", "donor")}
  className="font-semibold hover:text-white/90"
>
  Donate Blood
</button>

<button
  onClick={() => handleProtectedRoute("/dashboard/recipient/blood-request", "recipient")}
  className="font-semibold hover:text-white/90"
>
  Request Blood
</button>

<button
  onClick={() => navigate("/about-us")}
  className="font-semibold hover:text-white/90"
>
 About Us
</button>          

          {/* SIGN IN */}
          {user ? (
  <div
    onClick={() => navigate(`/dashboard/${user.role}`)}
    className="w-10 h-10 flex items-center justify-center 
               rounded-full bg-red-600 text-white 
               font-bold cursor-pointer hover:bg-red-700 transition"
  >
    {user.username.charAt(0).toUpperCase()}
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
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
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

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="absolute md:hidden w-full bg-black border-b border-white/20 shadow-md px-6 py-6 flex flex-col gap-1 text-sm z-50"
    >
      {/* Main Actions */}
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Main</p>
      
      <Link to="/" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 hover:text-red-400 transition">
        Home
      </Link>
      
      <Link to="/dashboard/donor/register" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 font-semibold hover:text-red-600 transition">
        Donate Blood
      </Link>

      <Link to="/" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 hover:text-red-400 transition">
        Find Blood Banks
      </Link>

      <Link to="/recipient" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 hover:text-red-400 transition">
        Request Blood
      </Link>

      {/* Info */}
      <p className="text-xs text-gray-500 uppercase tracking-widest mt-4 mb-2">Info</p>

      <Link to="/faq" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 font-semibold hover:text-red-600 transition">
        FAQs
      </Link>

      <Link to="/about-us" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 hover:text-red-400 transition">
         About Us
      </Link>

      <a href="#" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 hover:text-red-400 transition">
        Contact Us
      </a>

      <a href="#" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 hover:text-red-400 transition">
        Eligibility Criteria
      </a>

      <a href="#" onClick={() => setIsOpen(false)}
        className="flex items-center gap-3 py-3 border-b border-zinc-800 hover:text-red-400 transition">
        Emergency Help
      </a>

      {/* Account */}
      <p className="text-xs text-gray-500 uppercase tracking-widest mt-4 mb-2">Account</p>

      {user ? (
        <>
          <div
            onClick={() => {
              navigate(`/dashboard/${user.role}`)
              setIsOpen(false)
            }}
            className="flex items-center gap-3 py-3 border-b border-zinc-800 cursor-pointer hover:text-red-400 transition"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold">{user.username}</p>
              <p className="text-gray-500 text-xs capitalize">{user.role}</p>
            </div>
          </div>

          <div
            onClick={() => {
              navigate(`/dashboard/${user.role}`)
              setIsOpen(false)
            }}
            className="flex items-center gap-3 py-3 border-b border-zinc-800 cursor-pointer hover:text-red-400 transition"
          >
            My Dashboard
          </div>

          <div
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("role")
              localStorage.removeItem("username")
              setUser(null)
              setIsOpen(false)
              navigate("/")
            }}
            className="flex items-center gap-3 py-3 cursor-pointer text-red-500 hover:text-red-400 transition"
          >
            Logout
          </div>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              navigate("/auth/role")
              setIsOpen(false)
            }}
            className="w-full mt-2 px-3 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
          >
            Sign In
          </button>
          <button
            onClick={() => {
              navigate("/auth/role")
              setIsOpen(false)
            }}
            className="w-full mt-2 px-3 py-3 bg-zinc-800 text-white font-medium rounded-lg hover:bg-zinc-700 transition"
          >
            Register
          </button>
        </>
      )}

      {/* Bottom padding */}
      <div className="h-6" />
    </motion.div>
  )}
</AnimatePresence>
    </nav>
  );
}

export default Navbar;
