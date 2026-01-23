import React from "react"
import { Heart, Shield, Clock, Users, MapPin, Headset } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Life-Saving Impact",
    description: "Every donation can save up to three lives. Make a direct impact on your community.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "All donations follow strict medical protocols ensuring safety for donors and recipients.",
  },
  {
    icon: Clock,
    title: "Quick Process",
    description: "Simple registration and donation process that respects your time and schedule.",
  },
  {
    icon: Users,
    title: "Community Network",
    description: "Join thousands of donors committed to saving lives through blood donation.",
  },
  {
    icon: MapPin,
    title: "Location Tracking",
    description: "Find nearby donation centers and track your donation history effortlessly.",
  },
  {
    icon: Headset,
    title: "24/7 Dedicated Support",
    description: "Round-the-clock support from healthcare professionals and AI assistance.",
  },
]

export default function KeyFeatures() {
  return (
    <section className="w-full bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Key Features</h2>
        <p className="text-center text-zinc-400 mb-16 max-w-2xl mx-auto">
          Discover what makes our platform the premier choice for blood donors
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-black border border-white/20 rounded-xl p-6 shadow-lg overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/10 via-white/5 to-black pointer-events-none" />

                <div className="relative flex flex-col items-center text-center gap-4">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center border border-white/20 rounded-lg">
                    <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
