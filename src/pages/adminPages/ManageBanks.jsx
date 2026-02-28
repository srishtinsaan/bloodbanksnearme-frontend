import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js" 
import { Heart, ArrowLeft, Building2 } from "lucide-react"

export default function ManageBanks() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Demo data for blood banks
  const [bloodBanks, setBloodBanks] = useState([
    {
      id: 1,
      username: "bloodbank_demo",
      name: "Red Cross Blood Bank",
      email: "redcross@gmail.com",
      phone: "9876543210",
      pincode: "110001",
      licenseNumber: "LIC123456",
      verified: true,
    },
    {
      id: 2,
      username: "lifeline_bank",
      name: "Lifeline Blood Bank",
      email: "lifeline@gmail.com",
      phone: "9876543211",
      pincode: "110002",
      licenseNumber: "LIC123457",
      verified: false,
    },
    {
      id: 3,
      username: "apollo_bank",
      name: "Apollo Blood Bank",
      email: "apollo@gmail.com",
      phone: "9876543212",
      pincode: "110003",
      licenseNumber: "LIC123458",
      verified: true,
    },
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

  const toggleBankVerification = (id) => {
    setBloodBanks(
      bloodBanks.map((b) => (b.id === id ? { ...b, verified: !b.verified } : b))
    )
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
          <h1 className="text-4xl font-bold text-white mb-2">Manage Blood Banks</h1>
          <p className="text-gray-400">Verify and manage blood bank registrations</p>
        </div>

        {/* Blood Banks Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-800/50">
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                    Bank Name
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                    License
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bloodBanks.map((bank) => (
                  <tr
                    key={bank.id}
                    className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-red-600" />
                        <div>
                          <p className="text-white font-semibold">{bank.name}</p>
                          <p className="text-gray-500 text-sm">@{bank.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{bank.email}</td>
                    <td className="px-6 py-4 text-gray-400">{bank.phone}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-sm">
                      {bank.licenseNumber}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bank.verified
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}
                      >
                        {bank.verified ? "Verified" : "Unverified"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleBankVerification(bank.id)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          bank.verified
                            ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                            : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                        }`}
                      >
                        {bank.verified ? "Unverify" : "Verify"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Banks</p>
            <p className="text-3xl font-bold text-white">{bloodBanks.length}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Verified Banks</p>
            <p className="text-3xl font-bold text-green-400">
              {bloodBanks.filter((b) => b.verified).length}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}