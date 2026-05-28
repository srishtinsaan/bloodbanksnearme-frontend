import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js"
import {
  Heart,
  ArrowLeft,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  Phone,
  Droplet,
} from "lucide-react"
import { getBankBloodRequests } from "../../utils/helper.js"

export default function ViewRequests() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState("all")
  const [error, setError] = useState("")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "bloodbank") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
    fetchRequests()
  }, [navigate])

  const fetchRequests = async () => {
    try {
      setError("")
      const res = await getBankBloodRequests()
      setRequests(res.data || [])
    } catch (err) {
      setError(err.message || "Failed to load requests.")
    } finally {
      setLoading(false)
    }
  }

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true
    return req.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 border-amber-500/20 text-amber-400"
      case "fulfilled":
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
      case "fulfilled":
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

  const getUrgencyColor = (urgency) => {
    return urgency === "urgent"
      ? "bg-red-500/10 border-red-500/20 text-red-400"
      : "bg-blue-500/10 border-blue-500/20 text-blue-400"
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
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold">BloodConnect</span>
          </Link>
          <Link
            to="/dashboard/bloodbank"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Blood Requests</h1>
          <p className="text-gray-400">
            Requests in your area — pincode {user?.pincode}
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-600/20 border border-red-600 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "pending", "fulfilled", "cancellation_requested", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                filter === status
                  ? "bg-zinc-800 text-white border border-zinc-700"
                  : "bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-transparent"
              }`}
            >
              {getStatusLabel(status)} (
              {status === "all"
                ? requests.length
                : requests.filter((r) => r.status === status).length}
              )
            </button>
          ))}
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <Droplet className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">No requests found</h3>
            <p className="text-gray-400 text-sm">
              No blood requests in your area right now
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:border-zinc-700 transition-colors"
              >
                {/* Left */}
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-bold text-lg">
                      {req.username}
                    </span>
                    <span className="text-red-400 font-bold text-sm bg-red-600/10 border border-red-600/20 px-3 py-1 rounded-lg">
                      {req.bloodType}
                    </span>
                    <span className="text-white text-sm font-medium">
                      {req.units} unit{req.units > 1 ? "s" : ""}
                    </span>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-semibold ${getUrgencyColor(req.urgency)}`}>
                      {req.urgency === "urgent" ? "🚨 Urgent" : "Routine"}
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-semibold ${getStatusColor(req.status)}`}>
                      {getStatusIcon(req.status)}
                      {getStatusLabel(req.status)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    {req.location} • {req.pincode}
                  </div>

                  <p className="text-gray-400 text-sm">
                    Reason: {req.reason}
                  </p>

                  {req.isTargeted && (
                    <p className="text-blue-400 text-sm">
                      Targeted request to your bank
                    </p>
                  )}

                  {req.notes && (
                    <p className="text-gray-500 text-sm">
                      Notes: {req.notes}
                    </p>
                  )}

                  <p className="text-gray-500 text-xs">
                    Submitted: {formatDate(req.createdAt)}
                  </p>
                </div>

                {/* Right - Contact */}
                <div className="flex flex-col gap-2 min-w-fit">
                  <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-center">
                    <p className="text-gray-400 text-xs mb-1">Contact</p>
                    <div className="flex items-center gap-2 text-white text-sm font-medium">
                      <Phone className="w-4 h-4 text-red-500" />
                      {req.phoneNumber}
                    </div>
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