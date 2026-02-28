import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {HeartHandshake} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="w-full lg:fixed bg-black border-b border-white/20 z-50 shadow-md">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-3 lg:py-1">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <HeartHandshake className="h-12 w-12 sm:h-14 sm:w-14 text-red-500" />
          <div className="flex flex-col leading-none">
            <h1 className="font-bold text-lg sm:text-xl">BloodConnect</h1>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm sm:text-base font-medium">
          <Link 
            to="/donor" 
            className="text-red-500 font-semibold hover:text-red-600"
          >
            Donate Blood
          </Link>
          <a href="#">About Us</a>
          <Link 
            to="/faq" 
            className="text-red-500 font-semibold hover:text-red-600"
          >
            FAQs
          </Link>
          <button
  onClick={() => navigate("/auth/role")}
  className="px-3 py-[0.9px] bg-black text-black font-medium 
             rounded-md hover:bg-zinc-200
             bg-white hover:text-black
             
             shadow-sm hover:shadow-md"
>
  Sign In
</button>
          
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
            className="absolute md:hidden w-full backdrop-blur-md shadow-md px-6 py-4 flex flex-col gap-4 text-sm"
          >
            <a href="#" className="hover:text-red-400 transition">Donate Blood</a>
            <a href="#" className="hover:text-red-400 transition">About Us</a>
            <a href="#" className="hover:text-red-400 transition">FAQs</a>
            <a href="#" className="hover:text-red-400 transition">Contact Us</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
