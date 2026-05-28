import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper"
import { HeartHandshake, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"
import { createDonationRequest } from "../../utils/helper.js"

export default function DonationRequestPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    bloodGroup: "",
    units: "",
    availability: "",
    location: "",
    pincode: "",
    phoneNumber: "",
    notes: "",
  })

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

  useEffect(() => {
  const checkUser = async () => {
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
    } catch (err) {
      console.error(err)
      navigate("/auth/role")
    } finally {
      setLoading(false)
    }
  }

  checkUser()
}, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")
  setSubmitting(true)

  try {
    await createDonationRequest({ ...formData, units: Number(formData.units) })

    setFormSubmitted(true)
    setFormData({
      bloodGroup: "",
      units: "",
      availability: "",
      location: "",
      pincode: "",
      phoneNumber: "",
      notes: "",
    })

    setTimeout(() => {
      navigate("/dashboard/donor")
    }, 2000)

  } catch (err) {
    setError(err.message || "Something went wrong. Please try again.")
  } finally {
    setSubmitting(false)
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
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white transition-colors">
            <HeartHandshake className="w-6 h-6 text-red-600" />
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

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Submit Donation Request</h1>
          <p className="text-gray-400">Let blood banks know you're available to donate</p>
        </div>

        {formSubmitted && (
          <div className="mb-8 bg-green-600/20 border border-green-600 rounded-2xl p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
            <div>
              <h3 className="text-white font-bold mb-1">Donation Request Submitted!</h3>
              <p className="text-green-200 text-sm">
                Your request has been received. An admin will review and confirm it shortly.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-600/20 border border-red-600 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            <div>
              <label className="block text-white font-semibold mb-3">Blood Group</label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              >
                <option value="">Select blood group</option>
                {bloodGroups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Units Available to Donate</label>
              <input
                type="number"
                name="units"
                value={formData.units}
                onChange={handleInputChange}
                min="1"
                max="10"
                required
                placeholder="1 - 10"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Availability</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                required
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              >
                <option value="">Select availability</option>
                <option value="immediate">Immediate</option>
                <option value="within_week">Within a Week</option>
                <option value="within_month">Within a Month</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                placeholder="10-digit number"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                placeholder="e.g. Koramangala, Bangalore"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                required
                placeholder="6-digit pincode"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-3">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                placeholder="Any other information you'd like to share"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 resize-none placeholder-gray-600"
              />
            </div>

          </div>

          <div className="mb-8 bg-blue-600/20 border border-blue-600 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <p className="text-blue-200 text-sm">
              Your request will be reviewed by an admin. Once confirmed, blood banks in your area will be able to contact you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-300"
            >
              {submitting ? "Submitting..." : "Submit Donation Request"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/dashboard/donor/my-donations")}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold py-3 rounded-xl transition-all duration-300"
            >
              View My Donations
            </button>
          </div>

        </form>
      </main>
    </div>
  )
}