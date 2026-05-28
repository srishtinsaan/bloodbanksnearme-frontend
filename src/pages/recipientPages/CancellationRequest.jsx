import { useEffect, useState } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { getMyBloodRequests, requestCancellation } from "../../utils/helper.js"


import {
  HeartHandshake,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function CancellationRequest() {
  const navigate = useNavigate()
  const { id } = useParams()

  const [request, setRequest] = useState(null)
  const [reason, setReason] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = async (e) => {
  e.preventDefault()

  if (!reason.trim()) {
    alert("Please provide a cancellation reason.")
    return
  }

  try {
    await requestCancellation(id, reason)
    setSubmitted(true)
    setTimeout(() => navigate("/dashboard/recipient/my-requests"), 2000)
  } catch (err) {
    alert(err.message || "Something went wrong")
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
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Cancel Blood Request
          </h1>

          <p className="text-gray-400">
            Submit a cancellation application for admin review
          </p>
        </div>

        {submitted && (
          <div className="mb-6 bg-green-600/20 border border-green-600 rounded-2xl p-5 flex gap-3">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />

            <div>
              <h3 className="text-white font-semibold">
                Cancellation Request Submitted
              </h3>

              <p className="text-green-200 text-sm">
                Admin will review your cancellation request.
              </p>
            </div>
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          {/* Request Details */}
          <div className="mb-8">
            <h2 className="text-white text-xl font-bold mb-4">
              Request Details
            </h2>

            <div className="space-y-3 text-gray-300">
              <p>
                <span className="font-semibold text-white">
                  Blood Type:
                </span>{" "}
                {request.bloodType}
              </p>

              <p>
                <span className="font-semibold text-white">
                  Units:
                </span>{" "}
                {request.units}
              </p>

              <p>
                <span className="font-semibold text-white">
                  Reason:
                </span>{" "}
                {request.reason}
              </p>

              <p>
                <span className="font-semibold text-white">
                  Location:
                </span>{" "}
                {request.location}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="mb-6 bg-orange-600/20 border border-orange-600 rounded-xl p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-orange-400 mt-0.5" />

            <p className="text-orange-200 text-sm">
              Cancellation requests are reviewed manually by
              administrators. Please provide a genuine reason.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-white font-semibold mb-3">
                Cancellation Reason
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={5}
                required
                placeholder="Explain why you want to cancel this blood request..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Submit Cancellation Request
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}