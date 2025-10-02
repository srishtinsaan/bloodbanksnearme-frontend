import { useState } from "react";

const bloodCompatibility = {
  "A+": { canDonate: ["A+", "AB+"], cannotDonate: ["A-", "B+", "B-", "O+", "O-", "AB-"] },
  "A-": { canDonate: ["A-", "A+", "AB-", "AB+"], cannotDonate: ["B+", "B-", "O+", "O-"] },
  "B+": { canDonate: ["B+", "AB+"], cannotDonate: ["A+", "A-", "B-", "O+", "O-", "AB-"] },
  "B-": { canDonate: ["B-", "B+", "AB-", "AB+"], cannotDonate: ["A+", "A-", "O+", "O-"] },
  "AB+": { canDonate: ["AB+"], cannotDonate: ["A+", "A-", "B+", "B-", "O+", "O-", "AB-"] },
  "AB-": { canDonate: ["AB-", "AB+"], cannotDonate: ["A+", "A-", "B+", "B-", "O+", "O-"] },
  "O+": { canDonate: ["O+", "A+", "B+", "AB+"], cannotDonate: ["O-", "A-", "B-", "AB-"] },
  "O-": { canDonate: ["Everyone"], cannotDonate: [] },
};

export default function BloodGroups() {
  const [selected, setSelected] = useState(null);

  const bloodGroups = Object.keys(bloodCompatibility);

  return (
    <div className="flex flex-col items-center min-h-100 text-white p-6">
      <h1 className="text-4xl font-bold mb-5">Blood Donation Compatibility</h1>

      {/* Intro */}
        <p className="text-center text-[110%] px-65 mb-10">
          
          Click on the blood group to check which blood groups you can donate to and receive from.
  </p>

      {/* Circles */}
      <div className="grid grid-cols-8 gap-6 mb-8 ">
        {bloodGroups.map((group) => (
          <button
  key={group}
  onClick={() => {
    if (selected === group) {
        setSelected(null);  // hide info
    } else {
        setSelected(group);  // show info
    }
  }}
  className={`w-20 h-20 flex items-center justify-center rounded-full border-2 transition
    ${selected === group 
      ? "bg-red-500/50 border-red-900" 
      : "hover:bg-white hover:text-black hover:text-semibold "}`
  }
>
  {group}
</button>
        ))}
      </div>

      {/* Result */}

      {selected && (
        <div className="w-full max-w-md inset-shadow-sm inset-shadow-red-500/50 p-6 rounded-lg shadow-lg flex flex-col justify-center">
            <h2 className="text-xl font-semibold mb-4 flex justify-center">Selected Blood Group: {selected}</h2>
            <div className="flex gap-5 justify-center">
                <div>
                    <p className="text-green-400 mb-2">✅ Can Donate To:</p>
                    <ul className="list-disc list-inside mb-4 ml-5">
                        {bloodCompatibility[selected].canDonate.map((g, i) => (
                    <li key={i}>{g}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="text-red-400 mb-2">❌ Can't Donate To:</p>
                    <ul className="list-disc list-inside ml-5">
                        {bloodCompatibility[selected].cannotDonate.map((g, i) => (
                        <li key={i}>{g}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
