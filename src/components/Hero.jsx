import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react"

export default function Hero() {
 

  const [titleNumber, setTitleNumber] = useState(0);

  const titles = ["Verified donors", "AI assistance", "Quick response", "24/7 support"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);


  // form related
  


  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim() === "") return;

    navigate(`/banks?pincode=${pincode}`);
  }

  return (
    <div id="app-container" className="mb-0 relative min-h-screen w-full bg-black overflow-hidden">
      {/* Background Dots */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255, 255, 255, 0.15) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 pt-10 pb-1
">
        <div className="">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-6 mt-20 flex justify-center items-center" style={{ color: "#ff3b63" }}>
            Your life-saving journey
          </h1>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-center mb-8" style={{ color: "#ff3b63" }}>
            begins with
          </h1>
        </div>

        {/* Animated Text */}
        <span className="text-3xl md:text-5xl lg:text-6xl font-bold relative flex w-full h-25 justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                 
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>


        
      </div>

      {/* form */}
      <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-2 flex items-center gap-3 shadow-2xl"
      >
        <Search className="w-5 h-5 text-zinc-400 ml-3" />
        <input
          type="number"
          
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter your pincode..."
          className="flex-1  w-100 bg-transparent border-none outline-none text-white placeholder-zinc-500 text-lg px-2"
        />
        <button
          type="submit"
          className="lg:px-6 lg:py-2 px-3 text-black bg-white rounded-md border hover:bg-white/70 transition font-semibold shadow-md"
        >
          Search
        </button>

      </form>
      
    </div>
    <p className="text-center text-white/90 lg:text-[110%] text-base px-4 sm:px-10 md:px-20 lg:mb-10 lg:px-70 mt-10">
  <span className="font-bold italic ">BloodConnect</span> helps you find the nearest and most reliable blood banks instantly. Whether it’s an emergency or regular need, our platform connects you to life-saving resources with just a few clicks.</p>


      


    </div>
  );
}
