import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js"
import { HeartHandshake, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import { registerDonorProfile } from "../../utils/helper.js"

export default function DonorRegister() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phoneNumber: "",
    email: "",
    city: "",
    medicalConditions: "",
  })

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
    } catch (err) {
      console.error(err)
      setError("Failed to initialize page.")
    } finally {
      setLoading(false)
    }
  }

  initializePage()
}, [navigate])

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  setSubmitting(true)
  setError("")

  try {
    await registerDonorProfile(formData)

    setSuccess(true)

    setFormData({
      fullName: "",
      age: "",
      gender: "",
      bloodGroup: "",
      phoneNumber: "",
      email: "",
      city: "",
      medicalConditions: "",
    })

    setTimeout(() => {
      navigate("/dashboard/donor")
    }, 2000)

  } catch (err) {
    console.error(err)

    setError(
      err.response?.data?.message ||
      "Registration failed. Please try again."
    )
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
          <h1 className="text-4xl font-bold text-white mb-2">Donor Registration</h1>
          <p className="text-gray-400">Register your profile to be listed as a blood donor</p>
        </div>

        {success && (
          <div className="mb-8 bg-green-600/20 border border-green-600 rounded-2xl p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
            <div>
              <h3 className="text-white font-bold mb-1">Registration Successful!</h3>
              <p className="text-green-200 text-sm">
                Your donor profile has been created. Redirecting to dashboard...
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

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            <div>
              <label className="block text-white font-semibold mb-3">Full Name</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Age</label>
              <input
                type="number"
                min="18"
                max="65"
                required
                value={formData.age}
                onChange={(e) => handleChange("age", e.target.value)}
                placeholder="Must be 18–65"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Gender</label>
              <select
                required
                value={formData.gender}
                onChange={(e) => handleChange("gender", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Blood Group</label>
              <select
                required
                value={formData.bloodGroup}
                onChange={(e) => handleChange("bloodGroup", e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              >
                <option value="">Select blood group</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                placeholder="10-digit number"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-3">City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Your city"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-white font-semibold mb-3">
                Medical Conditions <span className="text-gray-500 font-normal">(if any)</span>
              </label>
              <textarea
                rows={4}
                value={formData.medicalConditions}
                onChange={(e) => handleChange("medicalConditions", e.target.value)}
                placeholder="e.g. diabetes, hypertension — leave blank if none"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 resize-none placeholder-gray-600"
              />
            </div>

          </div>

          <div className="mb-8 bg-blue-600/20 border border-blue-600 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <p className="text-blue-200 text-sm">
              Your profile will be visible to verified blood banks in your area. You may be contacted when your blood group is needed.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-300"
          >
            {submitting ? "Registering..." : "Register as Donor"}
          </button>

        </form>
      </main>
    </div>
  )
}