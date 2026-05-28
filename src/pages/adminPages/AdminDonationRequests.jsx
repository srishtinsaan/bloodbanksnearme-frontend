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
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { getAllDonationRequests, updateDonationRequestStatus } from "../../utils/helper.js"

export default function AdminDonationRequests() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [donations, setDonations] = useState([])
  const [filter, setFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [updating, setUpdating] = useState(null)
  const [error, setError] = useState("")
  const limit = 10

  useEffect(() => {
  const initializePage = async () => {
    try {
      const currentUser = getCurrentUser()

      if (!currentUser || currentUser.role !== "admin") {
        navigate("/auth/role")
        return
      }

      setUser(currentUser)
    } catch (err) {
      console.error(err)
      setError("Failed to initialize page.")
    }
  }

  initializePage()
}, [navigate])

  useEffect(() => {
  if (!user) return

  fetchDonations()
}, [user, filter, page])

const fetchDonations = async () => {
  try {
    setLoading(true)
    setError("")

    const res = await getAllDonationRequests(filter, page)  // was getAllDonationRequests({ status, page, limit })

    setDonations(res.data.requests || [])   // was res.data.data.requests
    setTotal(res.data.total || 0)           // was res.data.data.total

  } catch (err) {
    setError(err.message || "Failed to load donation requests.")  // was err.response?.data?.message
  } finally {
    setLoading(false)
  }
}

  const updateStatus = async (id, newStatus) => {
  setUpdating(id)
  setError("")
  try {
    await updateDonationRequestStatus(id, newStatus)  // was updateDonationRequestStatus(id, { status: newStatus })
    fetchDonations()
  } catch (err) {
    setError(err.message || "Failed to update status.")  // was err.response?.data?.message
  } finally {
    setUpdating(null)
  }
}

  const totalPages = Math.ceil(total / limit)

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

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold">Admin Panel</span>
          </Link>
          <Link
            to="/dashboard/admin"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-1">Donation Requests</h1>
          <p className="text-gray-400">Review and manage donor submissions</p>
        </div>

        {error && (
          <div className="mb-6 bg-red-600/20 border border-red-600 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
  {["all", "pending", "confirmed", "cancellation_requested", "cancelled"].map((status) => (
    <button
      key={status}
      onClick={() => { setFilter(status); setPage(1) }}
      className={`px-5 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
        filter === status
          ? "bg-zinc-800 text-white border border-zinc-700"
          : "bg-zinc-900 text-gray-400 hover:text-white hover:bg-zinc-800 border border-transparent"
      }`}
    >
      {getStatusLabel(status)} (
      {status === "all"
        ? donations.length
        : donations.filter((d) => d.status === status).length}
      )
    </button>
  ))}
</div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading...</div>
        ) : donations.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <HeartHandshake className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-gray-400">No donation requests found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex flex-col md:flex-row md:items-start justify-between gap-4 hover:border-zinc-700 transition-colors"
              >
                {/* Left */}
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-white font-bold text-lg">
                      {donation.username}
                    </span>
                    <span className="text-red-400 font-bold text-sm bg-red-600/10 border border-red-600/20 px-3 py-1 rounded-lg">
                      {donation.bloodGroup}
                    </span>
                    <span className="text-white text-sm">
                      {donation.units} unit{donation.units > 1 ? "s" : ""}
                    </span>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-semibold ${getStatusColor(donation.status)}`}>
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
                  <p className="text-gray-400 text-sm">
                    Phone: {donation.phoneNumber}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Submitted: {formatDate(donation.createdAt)}
                  </p>

                  {donation.status === "cancellation_requested" && donation.cancellationReason && (
                    <p className="text-orange-300 text-sm mt-1">
                      Cancellation reason: {donation.cancellationReason}
                    </p>
                  )}

                  {donation.notes && (
                    <p className="text-gray-500 text-sm">
                      Notes: {donation.notes}
                    </p>
                  )}
                </div>

                {/* Right - Actions */}
                <div className="flex flex-col gap-2 min-w-fit">

                  {/* Pending — can confirm or cancel */}
                  {donation.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(donation._id, "confirmed")}
                        disabled={updating === donation._id}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        {updating === donation._id ? "Updating..." : "Confirm"}
                      </button>
                      <button
                        onClick={() => updateStatus(donation._id, "cancelled")}
                        disabled={updating === donation._id}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* Cancellation requested — admin decides */}
                  {donation.status === "cancellation_requested" && (
                    <>
                      <button
                        onClick={() => updateStatus(donation._id, "cancelled")}
                        disabled={updating === donation._id}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        {updating === donation._id ? "Updating..." : "Approve Cancellation"}
                      </button>
                      <button
                        onClick={() => updateStatus(donation._id, "pending")}
                        disabled={updating === donation._id}
                        className="bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Reject Cancellation
                      </button>
                    </>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-gray-400 text-sm">
              Page {page} of {totalPages} • {total} total requests
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-sm transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}