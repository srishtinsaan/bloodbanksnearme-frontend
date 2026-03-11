import React from "react";
import {
  HeartHandshake,
  Search,
  Users,
  Shield,
  MessageSquare,
  Droplet,
  CheckCircle,
} from "lucide-react";

function AboutUs() {
  const features = [
    {
      icon: Search,
      title: "Find Blood Banks",
      description:
        "Search blood banks by pincode and get instant information about availability, contact details, and services.",
    },
    {
      icon: Users,
      title: "Multi-Role System",
      description:
        "Register as a donor, recipient, blood bank, or admin with role-specific dashboards and features.",
    },
    {
      icon: HeartHandshake,
      title: "Request Blood",
      description:
        "Recipients can submit blood requests with priority levels and get matched with available blood banks.",
    },
    {
      icon: MessageSquare,
      title: "AI Assistance",
      description:
        "Chat with our AI to get information about blood banks, donation guidelines, and emergency requests.",
    },
    {
      icon: Shield,
      title: "Verification System",
      description:
        "Admin dashboard to verify donors, recipients, and blood banks ensuring platform safety and authenticity.",
    },
    {
      icon: Droplet,
      title: "Blood Compatibility",
      description:
        "Learn which blood types are compatible for donation and reception with detailed compatibility charts.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Register Your Role",
      description:
        "Choose your role - donor, recipient, blood bank, or admin - and complete registration with relevant details.",
    },
    {
      step: "02",
      title: "Search Blood Banks",
      description:
        "Enter your pincode to find nearby blood banks with complete information and real-time details.",
    },
    {
      step: "03",
      title: "Connect & Request",
      description:
        "Submit blood requests or donate blood through registered blood banks using our secure platform.",
    },
    {
      step: "04",
      title: "Get AI Support",
      description:
        "Access our AI assistant to get answers about blood banks, donation processes, and emergency procedures.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex">
            <HeartHandshake className="w-8 h-8 text-red-600 mr-2" />
          <a href="/" className="text-2xl font-bold">
            BloodConnect
          </a>
          </div>
          <a
            href="/"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Back to Home
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                BloodConnect
              </h1>
              <p className="text-2xl text-red-600 font-semibold mb-6">
                A Digital Platform for Blood Donation & Bank Management
              </p>
              <p className="text-lg text-zinc-300 mb-6 leading-relaxed">
                BloodConnect is a comprehensive web application designed to
                revolutionize blood donation by connecting donors, recipients,
                and blood banks through an intelligent, user-friendly platform.
              </p>
              <p className="text-zinc-400">
                Developed as a modern healthcare solution to streamline blood
                management, improve accessibility, and save lives through
                technology.
              </p>
            </div>
            <div className="relative">
              <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-12 flex items-center justify-center h-96">
                <img src="https://plus.unsplash.com/premium_vector-1765746370516-dace738531cd?q=80&w=1207&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition-colors"
                >
                  <Icon className="w-10 h-10 text-red-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">
            How BloodConnect Works
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
                <div className="text-4xl font-bold text-red-600 mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-3">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Save Lives?
        </h2>
        <p className="text-xl text-zinc-300 mb-8">
          Join BloodConnect today and be part of a revolution in blood donation
          and management.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/auth/role"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Get Started Now
          </a>
          <a
            href="/"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Explore Platform
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;