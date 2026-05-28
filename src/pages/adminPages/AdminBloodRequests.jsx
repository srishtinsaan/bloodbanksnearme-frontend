import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper"
import { getAllBloodRequests, updateBloodRequestStatus } from "../../utils/helper.js"
import {
  HeartHandshake,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  X,
} from "lucide-react"

export default function AdminBloodRequests() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState(null)

  const counts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    fulfilled: requests.filter(r => r.status === "fulfilled").length,
    cancelled: requests.filter(r => r.status === "cancelled").length,
  }

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = getCurrentUser()
      if (!currentUser || currentUser.role !== "admin") {
        navigate("/auth/role")
        return
      }
      setUser(currentUser)

      try {
        const res = await getAllBloodRequests(filter)
        setRequests(res.data.requests)
      } catch (err) {
        console.error("Failed to fetch requests:", err)
      }

      setLoading(false)
    }

    fetchData()
  }, [navigate, filter])

  const updateStatus = async (id, status) => {
    try {
      await updateBloodRequestStatus(id, status)
      setRequests((prev) =>
        prev.map((req) => req._id === id ? { ...req, status } : req)
      )
      // ✅ modal mein bhi update karo
      setSelectedRequest((prev) =>
        prev?._id === id ? { ...prev, status } : prev
      )
    } catch (err) {
      alert(err.message || "Failed to update status")
    }
  }

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true
    return req.status === filter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-amber-500/10 border-amber-500/20 text-amber-400"
      case "fulfilled": return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
      case "cancelled": return "bg-rose-500/10 border-rose-500/20 text-rose-400"
      case "cancellation_requested": return "bg-orange-500/10 border-orange-500/20 text-orange-400"
      default: return "bg-zinc-500/10 border-zinc-500/20 text-zinc-400"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />
      case "fulfilled": return <CheckCircle className="w-4 h-4" />
      case "cancelled": return <AlertCircle className="w-4 h-4" />
      case "cancellation_requested": return <AlertCircle className="w-4 h-4" />
      default: return null
    }
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
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <HeartHandshake className="w-6 h-6 text-red-600" />
            <span className="text-xl font-bold">BloodConnect Admin</span>
          </Link>
          <Link to="/dashboard/admin" className="text-gray-400 hover:text-white flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Blood Requests Management</h1>
        <p className="text-gray-400 mb-8">Approve or cancel blood requests from recipients</p>

        {/* Filters */}
        <div className="flex gap-3 mb-8 flex-wrap">
          {["all", "pending", "fulfilled", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg border ${
                filter === status
                  ? "bg-zinc-800 border-zinc-700 text-white"
                  : "bg-zinc-900 border-zinc-800 text-gray-400"
              }`}
            >
              {status.toUpperCase()} ({counts[status]})
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <p className="text-gray-500">No requests found</p>
          ) : (
            filteredRequests.map((req) => (
              <div
                key={req._id}
                onClick={() => setSelectedRequest(req)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 flex justify-between items-center cursor-pointer hover:border-zinc-600 transition"
              >
                <div>
                  <h2 className="font-bold text-lg">{req.reason}</h2>
                  <p className="text-gray-400 text-sm">{req.location} • {req.bloodType}</p>
                  <p className="text-gray-500 text-xs">{new Date(req.createdAt).toLocaleString()}</p>
                  <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-md border text-sm ${getStatusColor(req.status)}`}>
                    {getStatusIcon(req.status)}
                    {req.status}
                  </div>
                </div>

                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  {req.status === "pending" && (
                    <>
                      <button onClick={() => updateStatus(req._id, "fulfilled")} className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm">Approve</button>
                      <button onClick={() => updateStatus(req._id, "cancelled")} className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm">Cancel</button>
                    </>
                  )}
                  {req.status === "fulfilled" && <span className="text-green-400 text-sm font-semibold">Fulfilled</span>}
                  {req.status === "cancelled" && <span className="text-red-400 text-sm font-semibold">Cancelled</span>}
                  {req.status === "cancellation_requested" && <span className="text-orange-400 text-sm font-semibold">Cancel Requested</span>}
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* ✅ Modal — sirf jab selectedRequest ho */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 max-w-lg w-full relative">
            
            {/* Close */}
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-6">Request Details</h2>

            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Username</span>
                <span className="text-white font-medium">{selectedRequest.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Blood Type</span>
                <span className="text-white font-bold text-base">{selectedRequest.bloodType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Units</span>
                <span className="text-white">{selectedRequest.units}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Urgency</span>
                <span className="text-white capitalize">{selectedRequest.urgency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Location</span>
                <span className="text-white">{selectedRequest.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pincode</span>
                <span className="text-white">{selectedRequest.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Phone</span>
                <span className="text-white">{selectedRequest.phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reason</span>
                <span className="text-white">{selectedRequest.reason}</span>
              </div>
              {selectedRequest.notes && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Notes</span>
                  <span className="text-white">{selectedRequest.notes}</span>
                </div>
              )}
              {selectedRequest.cancellationReason && (
                <div className="bg-orange-600/20 border border-orange-600 rounded-lg p-3 mt-2">
                  <p className="text-orange-300 text-xs mb-1">Cancellation Reason</p>
                  <p className="text-orange-100">{selectedRequest.cancellationReason}</p>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">Status</span>
                <div className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs ${getStatusColor(selectedRequest.status)}`}>
                  {getStatusIcon(selectedRequest.status)}
                  {selectedRequest.status}
                </div>
              </div>
            </div>

            {/* ✅ Actions sirf pending pe */}
            {selectedRequest.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(selectedRequest._id, "fulfilled")}
                  className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(selectedRequest._id, "cancelled")}
                  className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            )}

            {selectedRequest.status === "cancellation_requested" && (
              <div className="flex gap-3">
                <button
                  onClick={() => updateStatus(selectedRequest._id, "cancelled")}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 py-2 rounded-lg font-semibold"
                >
                  Confirm Cancellation
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}