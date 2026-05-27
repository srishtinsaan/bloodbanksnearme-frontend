import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper"
import {
  HeartHandshake,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react"

export default function MyDonations() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate("/auth/role")
      return
    }
    if (currentUser.mode !== "donor") {
      navigate("/auth/user-mode")
      return
    }
    setUser(currentUser)
    const stored = JSON.parse(localStorage.getItem("donation_requests") || "[]")
    setDonations(stored)
    setLoading(false)
  }, [navigate])

  const filteredDonations = donations.filter((don) => {
    if (filter === "all") return true
    return don.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400"
      case "completed":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      case "cancelled":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400"
      default:
        return "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      {/* Header */}
      <header className="bg-zinc-900/40 backdrop-blur-md border-b border-zinc-800/80 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white transition-colors">
            <HeartHandshake className="w-6 h-6 text-red-500" />
            <span className="text-2xl font-bold">BloodConnect</span>
          </Link>
          <Link
            to="/dashboard/donor"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Title Block */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Donations</h1>
            <p className="text-gray-400">View and track your donation history</p>
          </div>
          <Link
            to="/dashboard/donor/donate"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-900/10 font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Donation
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "pending", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === status
                  ? "bg-zinc-800 text-white border border-zinc-700/50"
                  : "bg-zinc-900/50 text-gray-400 hover:text-white hover:bg-zinc-800/60 border border-transparent"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {donations.filter((d) =>
                status === "all" ? true : d.status === status
              ).length}
              )
            </button>
          ))}
        </div>

        {/* Donations List */}
        {filteredDonations.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-12 text-center">
            <HeartHandshake className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">No donations found</h3>
            <p className="text-gray-400 text-sm mb-6">Register yourself as a donor to get started</p>
            <Link
              to="/dashboard/donor/donate"
              className="inline-block bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-2 rounded-lg transition-colors border border-zinc-700/50"
            >
              Register as Donor
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredDonations.map((donation) => (
              <div
                key={donation.id}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-zinc-700/60 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-white font-bold text-lg">
                      {donation.fullName}
                    </h3>
                    <span className="text-red-400 font-bold text-sm bg-red-600/10 border border-red-600/20 px-3 py-1 rounded-lg">
                      {donation.bloodGroup}
                    </span>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold capitalize ${getStatusColor(donation.status)}`}
                    >
                      {getStatusIcon(donation.status)}
                      {donation.status}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {donation.city} • {donation.pincode}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Registered on {formatDate(donation.createdAt)}
                  </p>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="text-center bg-zinc-800 border border-zinc-700/50 rounded-lg px-4 py-2">
                    <p className="text-gray-400 text-xs">Phone</p>
                    <p className="text-white text-sm font-medium">{donation.phoneNumber}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}