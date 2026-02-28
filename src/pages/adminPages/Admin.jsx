import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser, logoutUser } from "./../../utils/admin_helper.js"
import { Heart, LogOut, BarChart3, Users, Building2, Settings } from "lucide-react"

export default function Admin() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
    setLoading(false)
  }, [navigate])

  const handleLogout = () => {
    logoutUser()
    navigate("/")
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
          <Link to="/" className="flex items-center gap-2 text-white hover:text-red-500 transition-colors">
            <Heart className="w-6 h-6 text-red-600" />
            <span className="text-2xl font-bold">BloodConnect</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Welcome section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, Admin!</h1>
          <p className="text-gray-400">Platform administration and management dashboard</p>
        </div>

        {/* Admin info */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Administrator Info</h2>

          <div className="flex items-start gap-4">
            <Settings className="w-5 h-5 text-red-600 mt-1" />
            <div>
              <p className="text-gray-400 text-sm">Admin Username</p>
              <p className="text-white font-semibold">{user?.username}</p>
            </div>
          </div>
        </div>

        {/* Admin statistics and controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/dashboard/admin/platform-statistics" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-colors">
            <BarChart3 className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">Platform Statistics</h3>
            <p className="text-gray-400 text-sm mb-4">Monitor platform activity and usage</p>
            <div className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-block">
              View Stats
            </div>
          </Link>

          <Link to="/dashboard/admin/manage-users" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-colors">
            <Users className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">Manage Users</h3>
            <p className="text-gray-400 text-sm mb-4">Manage donors, recipients, and blood banks</p>
            <div className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-block">
              Manage Users
            </div>
          </Link>

          <Link to="/dashboard/admin/manage-banks" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-colors">
            <Building2 className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">Blood Banks</h3>
            <p className="text-gray-400 text-sm mb-4">Verify and manage blood bank registrations</p>
            <div className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-block">
              Manage Banks
            </div>
          </Link>

          <Link to="/dashboard/admin/system-settings" className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-colors">
            <Heart className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">System Settings</h3>
            <p className="text-gray-400 text-sm mb-4">Configure platform settings and policies</p>
            <div className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg inline-block">
              Settings
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}