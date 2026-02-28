import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser, logoutUser } from "../lib/auth" // adjust path
import { Heart, LogOut, MapPin, Calendar, Droplet, Mail } from "lucide-react"

export default function Recipient() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "recipient") {
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
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user?.username}! 👋</h1>
          <p className="text-gray-400">Find blood banks and request blood when needed</p>
        </div>

        {/* Profile card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Your Profile</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <Heart className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Username</p>
                <p className="text-white font-semibold">{user?.username}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Email</p>
                <p className="text-white font-semibold">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Droplet className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Role</p>
                <p className="text-white font-semibold">Blood Recipient</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Calendar className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-white font-semibold">Today</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all"
          >
            <Droplet className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">Find Blood Banks</h3>
            <p className="text-gray-400 text-sm">Search for blood banks near you</p>
          </Link>

          <Link
            to="/"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all"
          >
            <Heart className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">Request Blood</h3>
            <p className="text-gray-400 text-sm">Submit a blood request</p>
          </Link>

          <Link
            to="/"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all"
          >
            <Calendar className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">My Requests</h3>
            <p className="text-gray-400 text-sm">View your blood requests</p>
          </Link>
        </div>
      </main>
    </div>
  )
}