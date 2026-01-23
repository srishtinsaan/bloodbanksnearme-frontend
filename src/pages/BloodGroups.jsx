import { useState } from "react";
import { Droplet } from "lucide-react"


const bloodGroups= [
  {
    type: "O-",
    canDonateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-"],
    description: "Universal Donor",
  },
  {
    type: "O+",
    canDonateTo: ["O+", "A+", "B+", "AB+"],
    canReceiveFrom: ["O-", "O+"],
    description: "Most Common",
  },
  {
    type: "A-",
    canDonateTo: ["A-", "A+", "AB-", "AB+"],
    canReceiveFrom: ["O-", "A-"],
    description: "",
  },
  {
    type: "A+",
    canDonateTo: ["A+", "AB+"],
    canReceiveFrom: ["O-", "O+", "A-", "A+"],
    description: "",
  },
  {
    type: "B-",
    canDonateTo: ["B-", "B+", "AB-", "AB+"],
    canReceiveFrom: ["O-", "B-"],
    description: "",
  },
  {
    type: "B+",
    canDonateTo: ["B+", "AB+"],
    canReceiveFrom: ["O-", "O+", "B-", "B+"],
    description: "",
  },
  {
    type: "AB-",
    canDonateTo: ["AB-", "AB+"],
    canReceiveFrom: ["O-", "A-", "B-", "AB-"],
    description: "",
  },
  {
    type: "AB+",
    canDonateTo: ["AB+"],
    canReceiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    description: "Universal Recipient",
  },
]

export default function BloodGroups() {
  const [selected, setSelected] = useState(null);


  return (
    <div className="flex flex-col items-center min-h-100 text-white p-6">
      <h1 className="text-3xl font-bold mb-5 text-center">Blood Donation Compatibility</h1>

      {/* Intro */}
        <p className="text-center text-[110%] lg:px-65 mb-10">
          
          Click on the blood group to check which blood groups you can donate to and receive from.
  </p>

{/* Circles */}
<div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6 mb-8">
  {bloodGroups.map((group) => (
    <button
      key={group.type}
      onClick={() => {
        if (selected === group.type) {
          setSelected(null);  // hide info
        } else {
          setSelected(group.type);  // show info
        }
      }}
      className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition
        ${selected === group.type 
          ? "bg-white text-black border-white-900" 
          : "hover:bg-white hover:text-black font-semibold"}`}
    >
      {group.type}
    </button>
  ))}
</div>

      {/* Result */}

      {selected && (
        <div className="w-full max-w-md flex flex-col justify-center">
            {bloodGroups.filter(g => g.type === selected).map((group) => (
            <div
              key={group.type}
              className="relative border border-zinc-800 rounded-lg p-6 bg-black hover:-translate-y-2 transition-all duration-300 overflow-hidden group"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="relative z-10">
                {/* Blood Type Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-white rounded flex items-center justify-center">
                      <Droplet className="w-5 h-5 text-white" fill="white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{group.type}</h3>
                      {group.description && <p className="text-xs text-gray-400">{group.description}</p>}
                    </div>
                  </div>
                </div>

                {/* Can Donate To */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Can Donate To:</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.canDonateTo.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-zinc-900 text-white text-xs rounded border border-zinc-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Can Receive From */}
                <div>
                  <h4 className="text-sm font-semibold text-white mb-2">Can Receive From:</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.canReceiveFrom.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 bg-zinc-900 text-white text-xs rounded border border-zinc-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}