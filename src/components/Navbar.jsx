import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/images/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full lg:fixed z-50 shadow-md">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-10 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={Logo} alt="Logo" className="h-12 w-12 sm:h-14 sm:w-14" />
          <div className="flex flex-col leading-none">
            <h1 className="font-bold text-lg sm:text-xl">Blood Bank</h1>
            <h2 className="font-bold text-sm sm:text-base">Near Me</h2>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm sm:text-base font-medium">
          <a href="#">Donate Blood</a>
          <a href="#">About Us</a>
          <a href="#">FAQs</a>
          <a href="#">Contact Us</a>
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
