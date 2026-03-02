import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper"
import {
  HeartHandshake,
  ArrowLeft,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
} from "lucide-react"

export default function MyRequests() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "recipient") {
      navigate("/auth/role")
      return
    }

    setUser(currentUser)

    const storedRequests = JSON.parse(
      localStorage.getItem("blood_requests") || "[]"
    )

    setRequests(storedRequests)
    setLoading(false)
  }, [navigate])

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true
    return req.status === filter
  })

  const handleDelete = (id) => {
    const updated = requests.filter((req) => req.id !== id)
    setRequests(updated)
    localStorage.setItem("blood_requests", JSON.stringify(updated))
  }

  const handleStatusChange = (id, newStatus) => {
    const updated = requests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    )

    setRequests(updated)
    localStorage.setItem("blood_requests", JSON.stringify(updated))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600/20 border-yellow-600 text-yellow-200"
      case "fulfilled":
        return "bg-green-600/20 border-green-600 text-green-200"
      case "cancelled":
        return "bg-red-600/20 border-red-600 text-red-200"
      default:
        return "bg-gray-600/20 border-gray-600 text-gray-200"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "fulfilled":
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
          <Link
            to="/"
            className="flex items-center gap-2 text-white transition-colors"
          >
            <HeartHandshake className="w-6 h-6 text-red-600" />
            <span className="text-2xl font-bold">BloodConnect</span>
          </Link>

          <Link
            to="/dashboard/recipient"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              My Blood Requests
            </h1>
            <p className="text-gray-400">
              View and manage your blood requests
            </p>
          </div>

          <Link
            to="/dashboard/recipient/blood-request"
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            New Request
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {["all", "pending", "fulfilled", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === status
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 text-gray-400 hover:text-white hover:bg-zinc-700"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} (
              {requests.filter((r) =>
                status === "all" ? true : r.status === status
              ).length}
              )
            </button>
          ))}
        </div>

        {filteredRequests.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <HeartHandshake className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-white font-bold mb-2">No requests found</h3>
            <Link
              to="/recipient/request-blood"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Create Request
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
              >
                <div className="flex justify-between mb-4">
                  <div>
                    <h3 className="text-white font-bold text-lg">
                      {request.reason}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {formatDate(request.createdAt)}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {getStatusIcon(request.status)}
                    {request.status}
                  </div>
                </div>

                {request.status === "pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() =>
                        handleStatusChange(request.id, "fulfilled")
                      }
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Mark as Fulfilled
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(request.id, "cancelled")
                      }
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => handleDelete(request.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
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