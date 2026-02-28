import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is BloodConnect?",
    answer:
      "BloodConnect is a comprehensive blood donation and connectivity platform that connects blood donors, blood banks, and patients in need. It streamlines the process of finding donors and checking real-time blood availability.",
  },
  {
    question: "How can I search for a blood bank using a PIN code?",
    answer:
      "Enter your PIN code in the search bar, and the platform will show all registered blood banks in your area along with details like operating hours and available blood types.",
  },
  {
    question: "Can I search for blood banks by location?",
    answer:
      "Yes, you can search by entering your city, district, or state. Advanced filters help you find the nearest blood banks.",
  },
  {
    question: "How does the map-based blood bank finder work?",
    answer:
      "Our interactive map displays all nearby blood banks. You can zoom, click markers for details, and get navigation directions.",
  },
  {
    question: "How do I register as a blood donor on the platform?",
    answer:
      "Click on 'Register as Donor', fill your details, blood group, and health info. Your profile will be added to our donor database.",
  },
  {
    question: "How do I check real-time blood availability?",
    answer:
      "Go to the blood availability section, choose your required blood type, and see which nearby blood banks have stock.",
  },
  {
    question: "How can I make an urgent blood booking?",
    answer:
      "Use the 'Urgent Request' feature to submit your requirement. Nearby blood banks and donors will be notified immediately.",
  },
  {
    question: "Is there an AI chat system to contact blood banks?",
    answer:
      "Yes, our AI chatbot is available 24/7 to answer queries and connect you with blood banks instantly.",
  },
  {
    question: "How does the blood compatibility checker work?",
    answer:
      "Enter patient and donor blood types. The checker instantly informs whether the match is safe based on medical guidelines.",
  },
  {
    question: "Is BloodConnect free to use?",
    answer:
      "Yes, the platform is completely free for donors, patients, and blood banks.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-black py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-[#111111] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="text-white font-bold text-lg pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
