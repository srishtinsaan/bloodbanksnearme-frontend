import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js"
import { HeartHandshake, ArrowLeft, Building2, ChevronLeft, ChevronRight } from "lucide-react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function ManageBanks() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bloodBanks, setBloodBanks] = useState([])
  const [totalBanks, setTotalBanks] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const LIMIT = 10

  const [verifiedCount, setVerifiedCount] = useState(0) 



  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
  }, [navigate])

  useEffect(() => {
    fetchBloodBanks(currentPage)
  }, [currentPage])

  const fetchBloodBanks = async (page) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/bloodbanks?page=${page}&limit=${LIMIT}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )
      setBloodBanks(response.data.data.bloodBanks)
      setTotalBanks(response.data.data.total)
      setVerifiedCount(response.data.data.verifiedCount)
      setTotalPages(Math.ceil(response.data.data.total / LIMIT))
    } catch (err) {
      console.error("Failed to fetch blood banks:", err)
    }
    setLoading(false)
  }

  const toggleVerification = async (id, currentStatus, source) => {
  try {
    const token = localStorage.getItem("token")
    await axios.patch(
      `${BACKEND_URL}/api/admin/bloodbanks/${id}/verify`,
      { isApproved: !currentStatus, source }, // ✅ pass source
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    )
    setBloodBanks(bloodBanks.map((b) =>
      b._id === id ? { ...b, isApproved: !currentStatus } : b
    ))
  } catch (err) {
    console.error("Failed to update verification:", err)
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
      <header className="bg-black border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white  transition-colors">
            <HeartHandshake className="w-6 h-6 text-red-600" />
            <span className="text-2xl font-bold">BloodConnect</span>
          </Link>
          <button
            onClick={() => navigate("/dashboard/admin")}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Manage Blood Banks</h1>
          <p className="text-gray-400">Verify and manage blood bank registrations</p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-800/50">
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Bank Name</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Phone</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">License</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Pincode</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bloodBanks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No blood banks found
                    </td>
                  </tr>
                ) : (
                  bloodBanks.map((bank) => (
                    <tr key={bank._id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div>
                            <p className="text-white font-semibold">{bank[" Blood Bank Name"]}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{bank[" Email"] || "—"}</td>
                      <td className="px-6 py-4 text-gray-400">{bank[" Mobile"] || "—"}</td>
                      <td className="px-6 py-4 text-gray-400 font-mono text-sm">{bank[" License #"] || "—"}</td>
                      <td className="px-6 py-4 text-gray-400">{bank["Pincode"] || "—"}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          bank["isApproved"]
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}>
                          {bank.isApproved ? "Verified" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleVerification(bank._id, bank.isApproved, bank.source)}
                          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                            bank.isApproved
                              ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                              : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                          }`}
                        >
                          {bank.isApproved ? "Unverify" : "Verify"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            Showing {(currentPage - 1) * LIMIT + 1}–{Math.min(currentPage * LIMIT, totalBanks)} of {totalBanks} banks
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    currentPage === page
                      ? "bg-red-600 text-white"
                      : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                  }`}
                >
                  {page}
                </button>
              )
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Banks</p>
            <p className="text-3xl font-bold text-white">{totalBanks}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Verified Banks</p>
            <p className="text-3xl font-bold text-green-400">
              {verifiedCount}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}