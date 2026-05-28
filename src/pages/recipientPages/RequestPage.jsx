import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import {
  HeartHandshake,
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { getMyBloodRequests } from "../../utils/helper.js"
import { getCurrentUser } from "../../utils/admin_helper"

export default function RequestPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [request, setRequest] = useState(null)
  const [loading, setLoading] = useState(true)

  
useEffect(() => {
  const fetchData = async () => {
    const currentUser = getCurrentUser()
    if (!currentUser) {
      navigate("/auth/role")
      return
    }

    try {
      const res = await getMyBloodRequests()
      const foundRequest = res.data.find((req) => req._id === id)

      if (!foundRequest) {
        navigate("/dashboard/recipient/my-requests")
        return
      }

      setRequest(foundRequest)
    } catch (err) {
      console.error("Failed to fetch request:", err)
      navigate("/dashboard/recipient/my-requests")
    }

    setLoading(false)
  }

  fetchData()
}, [id, navigate])

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-600/20 border-yellow-600 text-yellow-200"

      case "fulfilled":
        return "bg-green-600/20 border-green-600 text-green-200"

      case "cancelled":
        return "bg-red-600/20 border-red-600 text-red-200"

      case "cancellation_requested":
        return "bg-orange-600/20 border-orange-600 text-orange-200"

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

      case "cancellation_requested":
        return <AlertCircle className="w-4 h-4" />

      default:
        return null
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-white"
          >
            <HeartHandshake className="w-6 h-6 text-red-600" />

            <span className="text-2xl font-bold">
              BloodConnect
            </span>
          </Link>

          <Link
            to="/dashboard/recipient/my-requests"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          {/* Top */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Blood Request Details
              </h1>

              <p className="text-gray-400">
                Created on {formatDate(request.createdAt)}
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

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm mb-2">
                Blood Type
              </h3>

              <p className="text-white text-2xl font-bold">
                {request.bloodType}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm mb-2">
                Units Required
              </h3>

              <p className="text-white text-2xl font-bold">
                {request.units}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm mb-2">
                Urgency
              </h3>

              <p className="text-white text-xl font-semibold capitalize">
                {request.urgency}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-5">
              <h3 className="text-gray-400 text-sm mb-2">
                Phone Number
              </h3>

              <p className="text-white text-xl font-semibold">
                {request.phoneNumber}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-5 md:col-span-2">
              <h3 className="text-gray-400 text-sm mb-2">
                Hospital / Location
              </h3>

              <p className="text-white text-lg">
                {request.location}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-5 md:col-span-2">
              <h3 className="text-gray-400 text-sm mb-2">
                Reason
              </h3>

              <p className="text-white text-lg">
                {request.reason}
              </p>
            </div>

            {request.notes && (
              <div className="bg-zinc-800 rounded-xl p-5 md:col-span-2">
                <h3 className="text-gray-400 text-sm mb-2">
                  Additional Notes
                </h3>

                <p className="text-white">
                  {request.notes}
                </p>
              </div>
            )}

            {request.cancellationReason && (
              <div className="bg-orange-600/20 border border-orange-600 rounded-xl p-5 md:col-span-2">
                <h3 className="text-orange-300 text-sm mb-2">
                  Cancellation Reason
                </h3>

                <p className="text-orange-100">
                  {request.cancellationReason}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}