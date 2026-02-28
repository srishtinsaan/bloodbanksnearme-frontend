import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js" 
import { Heart, ArrowLeft, PieChart } from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

export default function Stats() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Demo statistics data
  const statistics = {
    bloodBanks: 24,
    donors: 156,
    recipients: 89,
  }

  const chartData = [
    { name: "Blood Banks", value: statistics.bloodBanks, color: "#dc2626" },
    { name: "Donors", value: statistics.donors, color: "#16a34a" },
    { name: "Recipients", value: statistics.recipients, color: "#0284c7" },
  ]

  const totalUsers = statistics.bloodBanks + statistics.donors + statistics.recipients

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
    setLoading(false)
  }, [navigate])

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
          <Link to="/" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors">
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
          <h1 className="text-4xl font-bold text-white mb-2">Platform Statistics</h1>
          <p className="text-gray-400">Overview of registered users and blood banks</p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Users</p>
            <p className="text-3xl font-bold text-white">{totalUsers}</p>
          </div>
          <div className="bg-zinc-900 border border-red-600/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Blood Banks</p>
            <p className="text-3xl font-bold text-red-500">{statistics.bloodBanks}</p>
          </div>
          <div className="bg-zinc-900 border border-green-600/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Donors</p>
            <p className="text-3xl font-bold text-green-500">{statistics.donors}</p>
          </div>
          <div className="bg-zinc-900 border border-blue-600/30 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Recipients</p>
            <p className="text-3xl font-bold text-blue-500">{statistics.recipients}</p>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-red-600" />
            Distribution Chart
          </h2>

          <div className="w-full h-96 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} users`, "Count"]}
                  contentStyle={{
                    backgroundColor: "#18181b",
                    border: "1px solid #27272a",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {chartData.map((item, index) => (
              <div key={index} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <p className="text-white font-semibold">{item.name}</p>
                </div>
                <p className="text-gray-400">
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                  <span className="text-sm ml-2">({((item.value / totalUsers) * 100).toFixed(1)}%)</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}