import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper"
import { HeartHandshake, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"

export default function DonationRequestPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [formSubmitted, setFormSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    phoneNumber: "",
    email: "",
    city: "",
    pincode: "",
    lastDonationDate: "",
    medicalConditions: "",
    notes: "",
  })

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]

  useEffect(() => {
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
    setLoading(false)
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const existingDonations = JSON.parse(
      localStorage.getItem("donation_requests") || "[]"
    )

    const newDonation = {
      id: `don_${Date.now()}`,
      ...formData,
      age: Number(formData.age),
      createdAt: new Date().toISOString(),
      status: "pending",
    }

    existingDonations.push(newDonation)
    localStorage.setItem("donation_requests", JSON.stringify(existingDonations))

    setFormSubmitted(true)

    setFormData({
      fullName: "",
      age: "",
      gender: "",
      bloodGroup: "",
      phoneNumber: "",
      email: "",
      city: "",
      pincode: "",
      lastDonationDate: "",
      medicalConditions: "",
      notes: "",
    })

    setTimeout(() => {
      navigate("/dashboard/donor")
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

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Register as Donor</h1>
          <p className="text-gray-400">Fill in your details to register as a blood donor</p>
        </div>

        {formSubmitted && (
          <div className="mb-8 bg-green-600/20 border border-green-600 rounded-2xl p-6 flex items-start gap-4">
            <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
            <div>
              <h3 className="text-white font-bold mb-1">Registration Submitted!</h3>
              <p className="text-green-200 text-sm">
                Thank you for registering. Blood banks in your area will reach out to you.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

            <div>
              <label className="block text-white font-semibold mb-3">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="65"
                required
                placeholder="Must be 18-65"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
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
              <label className="block text-white font-semibold mb-3">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your@email.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-white font-semibold mb-3">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                placeholder="Your city"
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
              <label className="block text-white font-semibold mb-3">Last Donation Date (if any)</label>
              <input
                type="date"
                name="lastDonationDate"
                value={formData.lastDonationDate}
                onChange={handleInputChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white font-semibold mb-3">Medical Conditions (if any)</label>
            <input
              type="text"
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleInputChange}
              placeholder="e.g. diabetes, hypertension — leave blank if none"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg text-white px-4 py-3 placeholder-gray-600"
            />
          </div>

          <div className="mb-8">
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

          <div className="mb-8 bg-blue-600/20 border border-blue-600 rounded-2xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
            <p className="text-blue-200 text-sm">
              Your details will be shared with verified blood banks in your area. You may be contacted when your blood group is needed.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Register as Donor
          </button>
        </form>
      </main>
    </div>
  )
}