import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper"
import { HeartHandshake, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"

export default function BloodRequest() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    bloodType: "O+",
    units: 1,
    urgency: "routine",
    reason: "",
    location: "",
    pincode: "",
    phoneNumber: "",
    notes: "",
  })

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "recipient") {
      navigate("/auth/role")
      return
    }

    setUser(currentUser)
    setLoading(false)
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const existingRequests = JSON.parse(
      localStorage.getItem("blood_requests") || "[]"
    )

    const newRequest = {
      id: `req_${Date.now()}`,
      ...formData,
      units: Number(formData.units),
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    existingRequests.push(newRequest)
    localStorage.setItem("blood_requests", JSON.stringify(existingRequests))

    setFormSubmitted(true)

    setFormData({
      bloodType: "O+",
      units: 1,
      urgency: "routine",
      reason: "",
      location: "",
      pincode: "",
      phoneNumber: "",
      notes: "",
    })

    setTimeout(() => {
      navigate("/recipient/my-requests")
    }, 2000)
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
            className="flex items-center gap-2 text-white  transition-colors"
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
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Request Blood
          </h1>
          <p className="text-gray-400">
            Submit a blood request to nearby blood banks
          </p>
        </div>

        {formSubmitted && (
          <div className="mb-8 bg-green-600/20 border border-green-600 rounded-2xl p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
            <div>
              <h3 className="text-white font-bold mb-1">
                Request Submitted Successfully!
              </h3>
              <p className="text-green-200 text-sm">
                Your blood request has been posted. Blood banks will contact you if available.
              </p>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Blood Type */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Blood Type
              </label>
              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              >
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Units */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Units Needed
              </label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleInputChange}
                min="1"
                max="10"
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              />
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Urgency Level
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              >
                <option value="routine">Routine</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Location / City
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-white font-semibold mb-3">
                Pincode
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              />
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">
              Reason
            </label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
            />
          </div>

          {/* Notes */}
          <div className="mb-8">
            <label className="block text-white font-semibold mb-3">
              Additional Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 resize-none"
            />
          </div>

          <div className="mb-8 bg-blue-600/20 border border-blue-600 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <p className="text-blue-200 text-sm">
              Your request will be visible to blood banks in your area.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Submit Blood Request
          </button>
        </form>
      </main>
    </div>
  )
}