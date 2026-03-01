import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js"
import { HeartHandshake, ArrowLeft, PieChart } from "lucide-react"
import { PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function Stats() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statistics, setStatistics] = useState({
    bloodBanks: 0,
    donors: 0,
    recipients: 0,
    registeredBloodBanks: 0, 
  dbBloodBanks: 0,
  })



  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
    fetchStats()
  }, [navigate])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )
      setStatistics(response.data.data)
    } catch (err) {
      console.error("Failed to fetch stats:", err)
    }
    setLoading(false)
  }
  const bankChartData = [
  { name: "DB Blood Banks", value: statistics.dbBloodBanks, color: "#dc2626" },
  { name: "Registered Banks", value: statistics.registeredBloodBanks, color: "#f87171" },
]

const userChartData = [
  { name: "Donors", value: statistics.donors, color: "#16a34a" },
  { name: "Recipients", value: statistics.recipients, color: "#0284c7" },
]

  const chartData = [
    { name: "Blood Banks", value: statistics.bloodBanks, color: "#dc2626" },
    { name: "Donors", value: statistics.donors, color: "#16a34a" },
    { name: "Recipients", value: statistics.recipients, color: "#0284c7" },
  ]

  const totalUsers = statistics.bloodBanks + statistics.donors + statistics.recipients

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  // rest of your JSX stays exactly the same
  return (
    <div className="min-h-screen bg-black">
      <header className="bg-black border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white transition-colors">
            <HeartHandshake className="w-6 h-6 text-red-600" />
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Platform Statistics</h1>
          <p className="text-gray-400">Overview of registered users and blood banks</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-2">Total Users</p>
            <p className="text-3xl font-bold text-white">{statistics.recipients + statistics.donors}</p>
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

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
  <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
    <PieChart className="w-6 h-6 text-red-600" />
    Distribution Chart
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Blood Banks Chart */}
    <div>
      <h3 className="text-white font-semibold text-center mb-4">Blood Banks</h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={bankChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              dataKey="value"
            >
              {bankChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}`, "Count"]}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />
            <Legend iconType="circle" />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Users Chart */}
    <div>
      <h3 className="text-white font-semibold text-center mb-4">Users</h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={userChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={90}
              dataKey="value"
            >
              {userChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}`, "Count"]}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "8px",
                color: "#ffffff",
              }}
            />
            <Legend iconType="circle" />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>

  {/* Legend details - now 4 cards */}
  <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
    {[...bankChartData, ...userChartData].map((item, index) => (
      <div key={index} className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
          <p className="text-white font-semibold text-sm">{item.name}</p>
        </div>
        <p className="text-2xl font-bold text-white">{item.value}</p>
      </div>
    ))}
  </div>
</div>
      </main>
    </div>
  )
}