import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser, logoutUser } from "../../utils/admin_helper.js"
import { Heart, LogOut, Phone, MapPin, Building2, FileText, Mail } from "lucide-react"

export default function Bloodbank() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "bloodbank") {
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
          <p className="text-gray-400">Manage your blood bank profile and operations</p>
        </div>

        

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

         

          <Link
            to="/dashboard/bloodbank/requests"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 hover:shadow-lg hover:shadow-red-600/20 transition-all"
          >
            <Heart className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-white font-bold mb-2">View Requests</h3>
            <p className="text-gray-400 text-sm">See blood requests in your area</p>
          </Link>

          

        </div>
      </main>
    </div>
  )
}