import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js" 
import { Heart, ArrowLeft, User } from "lucide-react"

export default function ManageUsers() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("donors")

  // Demo data for users
  const [donors, setDonors] = useState([
    { id: 1, username: "donor_demo", email: "donor_demo@gmail.com", verified: true },
    { id: 2, username: "john_donor", email: "john@gmail.com", verified: false },
    { id: 3, username: "sarah_blood", email: "sarah@gmail.com", verified: true },
    { id: 4, username: "mike_donor", email: "mike@gmail.com", verified: false },
  ])

  const [recipients, setRecipients] = useState([
    { id: 1, username: "recipient_demo", email: "recipient_demo@gmail.com", verified: true },
    { id: 2, username: "patient_01", email: "patient01@gmail.com", verified: false },
    { id: 3, username: "need_blood", email: "need_blood@gmail.com", verified: true },
  ])

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
    setLoading(false)
  }, [navigate])

  const toggleDonorVerification = (id) => {
    setDonors(donors.map(d => d.id === id ? { ...d, verified: !d.verified } : d))
  }

  const toggleRecipientVerification = (id) => {
    setRecipients(recipients.map(r => r.id === id ? { ...r, verified: !r.verified } : r))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-black border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white hover:text-red-500 transition-colors"
          >
            <Heart className="w-6 h-6 text-red-600" />
            <span className="text-2xl font-bold">BloodConnect</span>
          </Link>
          <button
            onClick={() => navigate("/dashboard/admin")}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Manage Users</h1>
          <p className="text-gray-400">Verify and manage donor and recipient accounts</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab("donors")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "donors"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Donors ({donors.length})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("recipients")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "recipients"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Recipients ({recipients.length})
            </div>
          </button>
        </div>

        {/* Donors Table */}
        {activeTab === "donors" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-800/50">
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Username</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donors.map((donor) => (
                    <tr key={donor.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 text-white">{donor.username}</td>
                      <td className="px-6 py-4 text-gray-400">{donor.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          donor.verified
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}>
                          {donor.verified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleDonorVerification(donor.id)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            donor.verified
                              ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                              : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                          }`}
                        >
                          {donor.verified ? "Unverify" : "Verify"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recipients Table */}
        {activeTab === "recipients" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-800/50">
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Username</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                    <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recipients.map((recipient) => (
                    <tr key={recipient.id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 text-white">{recipient.username}</td>
                      <td className="px-6 py-4 text-gray-400">{recipient.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          recipient.verified
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}>
                          {recipient.verified ? "Verified" : "Unverified"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleRecipientVerification(recipient.id)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            recipient.verified
                              ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                              : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                          }`}
                        >
                          {recipient.verified ? "Unverify" : "Verify"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}