import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper"
import {
  HeartHandshake,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Plus,
} from "lucide-react"
import { getMyDonationRequests, requestDonationCancellation } from "../../utils/helper.js"

export default function MyDonations() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState([])
  const [filter, setFilter] = useState("all")
  const [cancellingId, setCancellingId] = useState(null)
  const [cancelReason, setCancelReason] = useState("")
  const [cancelling, setCancelling] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
  const initializePage = async () => {
    try {
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

      await fetchDonations()
    } catch (err) {
      console.error(err)
      setError("Failed to initialize page.")
    } finally {
      setLoading(false)
    }
  }

  initializePage()
}, [navigate])

 const fetchDonations = async () => {
  try {
    setError("")
    const res = await getMyDonationRequests()
    setDonations(res.data || [])   // was res.data.data
  } catch (err) {
    setError(err.message || "Failed to load donations. Please try again.")  // was err.response?.data?.message
  }
}

  const handleCancelSubmit = async (id) => {
  setCancelling(true)
  try {
    await requestDonationCancellation(id, cancelReason)  // was { cancellationReason: cancelReason }
    setCancellingId(null)
    setCancelReason("")
    fetchDonations()
  } catch (err) {
    setError(err.message || "Failed to request cancellation.")  // was err.response?.data?.message
  } finally {
    setCancelling(false)
  }
}

  const filteredDonations = donations.filter((don) => {
    if (filter === "all") return true
    return don.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400"
      case "confirmed":
        return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      case "cancelled":
        return "bg-rose-500/10 border-rose-500/20 text-rose-400"
      case "cancellation_requested":
        return "bg-orange-500/10 border-orange-500/20 text-orange-400"
      default:
        return "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
        return <XCircle className="w-4 h-4" />
      case "cancellation_requested":
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case "cancellation_requested": return "Cancellation Requested"
      default: return status.charAt(0).toUpperCase() + status.slice(1)
    }
  }

  const getAvailabilityLabel = (availability) => {
    switch (availability) {
      case "immediate": return "Immediate"
      case "within_week": return "Within a Week"
      case "within_month": return "Within a Month"
      default: return availability
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

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Title Block */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Donations</h1>
            <p className="text-gray-400">Track and manage your donation requests</p>
          </div>
          <Link
            to="/dashboard/donor/donation-request"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl transition-all shadow-lg shadow-red-900/10 font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Donation
          </Link>
        </div>

        {error && (
          <div className="mb-6 bg-red-600/20 border border-red-600 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "pending", "confirmed", "cancellation_requested", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                filter === status
                  ? "bg-zinc-800 text-white border border-zinc-700/50"
                  : "bg-zinc-900/50 text-gray-400 hover:text-white hover:bg-zinc-800/60 border border-transparent"
              }`}
            >
              {getStatusLabel(status)} (
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
            <p className="text-gray-400 text-sm mb-6">
              Submit a donation request to get started
            </p>
            <Link
              to="/dashboard/donor/donation-request"
              className="inline-block bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-6 py-2 rounded-lg transition-colors border border-zinc-700/50"
            >
              Submit Donation Request
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredDonations.map((donation) => (
              <div
                key={donation._id}
                className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 flex flex-col gap-4 hover:border-zinc-700/60 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-red-400 font-bold text-sm bg-red-600/10 border border-red-600/20 px-3 py-1 rounded-lg">
                        {donation.bloodGroup}
                      </span>
                      <span className="text-white font-semibold">
                        {donation.units} unit{donation.units > 1 ? "s" : ""}
                      </span>
                      <div
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold ${getStatusColor(donation.status)}`}
                      >
                        {getStatusIcon(donation.status)}
                        {getStatusLabel(donation.status)}
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {donation.location} • {donation.pincode}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Availability: {getAvailabilityLabel(donation.availability)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Submitted on {formatDate(donation.createdAt)}
                    </p>
                    {donation.cancellationReason && (
                      <p className="text-orange-300 text-sm">
                        Cancellation reason: {donation.cancellationReason}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 items-center">
                    <div className="text-center bg-zinc-800 border border-zinc-700/50 rounded-lg px-4 py-2">
                      <p className="text-gray-400 text-xs">Phone</p>
                      <p className="text-white text-sm font-medium">{donation.phoneNumber}</p>
                    </div>

                    {donation.status === "pending" && (
                      <button
                        onClick={() => setCancellingId(donation._id)}
                        className="text-sm text-rose-400 hover:text-rose-300 border border-rose-500/20 hover:border-rose-500/40 bg-rose-500/10 px-4 py-2 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

                {/* Cancellation Reason Input */}
                {cancellingId === donation._id && (
                  <div className="bg-zinc-800 border border-zinc-700 rounded-xl p-4 flex flex-col gap-3">
                    <p className="text-white text-sm font-semibold">Reason for cancellation</p>
                    <textarea
                      value={cancelReason}
                      onChange={(e) => setCancelReason(e.target.value)}
                      rows={3}
                      placeholder="Please provide a reason..."
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-lg text-white px-4 py-3 resize-none placeholder-gray-600 text-sm"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleCancelSubmit(donation._id)}
                        disabled={cancelling || !cancelReason.trim()}
                        className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                      >
                        {cancelling ? "Submitting..." : "Confirm Cancellation"}
                      </button>
                      <button
                        onClick={() => { setCancellingId(null); setCancelReason("") }}
                        className="bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
                      >
                        Go Back
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}