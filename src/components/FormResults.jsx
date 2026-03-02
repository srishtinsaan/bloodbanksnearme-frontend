import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Droplet,
  AlertCircle,
  ArrowLeft,
  Building2,
  MapIcon,
  Calendar,
  Zap,
} from "lucide-react";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


function FormResults({ banks }) {

  const [showMap, setShowMap] = useState(false)
  const navigate = useNavigate();


  const isNA = (value) => {
  return !value || value === "NA" || value === "N/A";
};


  
  return (
    <div className="flex flex-col gap-6 mt-6 justify-center items-center w-full px-4">
      {banks.map((bank, index) => (
      <div key={index} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm hover:border-zinc-700 transition-all">
        {/* Header section */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-red-600/20 rounded-xl flex items-center justify-center border border-red-600/30">
                <Building2 className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded-full">Bank #{index + 1}</span>
                  <span className="text-xs bg-red-600/20 text-red-400 px-2 py-1 rounded-full border border-red-600/30">
                    {bank[" Category"]}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white text-balance">{bank[" Blood Bank Name"]}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Contact info */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Location</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Address</p>
                    <p className="text-white text-sm">{bank[" Address"]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Droplet className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">District</p>
                    <p className="text-white text-sm">{bank[" District"]}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">State</p>
                    <p className="text-white text-sm">{bank[" State"]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact section */}
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Contact</h3>
              <div className="space-y-3">
                {!isNA(bank[" Mobile"]) && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Phone</p>
                      <p className="text-white text-sm">{bank[" Mobile"]}</p>
                    </div>
                  </div>
                )}
                {!isNA(bank[" Helpline"]) && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Helpline</p>
                      <p className="text-white text-sm">{bank[" Helpline"]}</p>
                    </div>
                  </div>
                )}
                {!isNA(bank[" Email"]) && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <p className="text-white text-sm break-all">{bank[" Email"]}</p>
                    </div>
                  </div>
                )}
                {!isNA(bank[" Website"]) && (
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Website</p>
                      <p className="text-white text-sm break-all">{bank[" Website"]}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Nodal officer info */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold text-white mb-4">Nodal Officer</h3>
            <div className="bg-black/40 border border-zinc-800 rounded-xl p-6 space-y-4">
              {!isNA(bank["  Nodal Officer"]) && (
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Name</p>
                    <p className="text-white text-sm font-medium">{bank["  Nodal Officer"]}</p>
                  </div>
                </div>
              )}
              {!isNA(bank[" Contact Nodal Officer"]) && (
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Phone</p>
                    <p className="text-white text-sm">{bank[" Contact Nodal Officer"]}</p>
                  </div>
                </div>
              )}
              {!isNA(bank[" Email Nodal Officer"]) && (
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Email</p>
                    <p className="text-white text-sm break-all">{bank[" Email Nodal Officer"]}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
       

        {/* Action buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
          onClick={() =>
    {
  sessionStorage.setItem("selectedBank", JSON.stringify(bank))
  navigate("/banks/ai-assistance")
  }
  }
           className="bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl flex items-center justify-center gap-2">
            <MessageSquare className="w-4 h-4" />
            AI Assistance
          </button>
          <button 
          onClick={() => navigate("/")}
           className="bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl flex items-center justify-center gap-2">
            <Droplet className="w-4 h-4" />
            Request Blood
          </button>
          <button 
          onClick={() => navigate("/")}
          className="bg-red-600 hover:bg-red-700 text-white py-5 rounded-xl flex items-center justify-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Donation
          </button>
          <button
            onClick={() => setShowMap(!showMap)}
            className="bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl flex items-center justify-center gap-2"
          >
            <MapIcon className="w-4 h-4" />
            Find on Map
          </button> 
        </div>

        {/* Map display */}
        {showMap && (
          <div className="mt-6 bg-black/40 border border-zinc-800 rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="400"
              style={{ border: 0 }}
              loading="lazy"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd2xOKErF4MsroWUqRHks&q=${bank[" Latitude"]},${bank[" Longitude"]}`}
            />
          </div>
        )}
      </div>
    ))}
    </div>
  );
}

export default FormResults;


