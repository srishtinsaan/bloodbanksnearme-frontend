import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js"
import { HeartHandshake, ArrowLeft, User, ChevronLeft, ChevronRight } from "lucide-react"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export default function ManageUsers() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("donors")

  const [donors, setDonors] = useState([])
  const [recipients, setRecipients] = useState([])
  const [totalDonors, setTotalDonors] = useState(0)
  const [totalRecipients, setTotalRecipients] = useState(0)
  const [donorPage, setDonorPage] = useState(1)
  const [recipientPage, setRecipientPage] = useState(1)
  const [donorTotalPages, setDonorTotalPages] = useState(1)
  const [recipientTotalPages, setRecipientTotalPages] = useState(1)
  const LIMIT = 10

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
  }, [navigate])

  useEffect(() => {
    fetchUsers("donor", donorPage)
  }, [donorPage])

  useEffect(() => {
    fetchUsers("recipient", recipientPage)
  }, [recipientPage])

  const fetchUsers = async (role, page) => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await axios.get(
        `${BACKEND_URL}/api/admin/users?role=${role}&page=${page}&limit=${LIMIT}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )
      const { users, total } = response.data.data

      if (role === "donor") {
        setDonors(users)
        setTotalDonors(total)
        setDonorTotalPages(Math.ceil(total / LIMIT))
      } else {
        setRecipients(users)
        setTotalRecipients(total)
        setRecipientTotalPages(Math.ceil(total / LIMIT))
      }
    } catch (err) {
      console.error("Failed to fetch users:", err)
    }
    setLoading(false)
  }

  const toggleVerification = async (id, currentStatus, role) => {
    try {
      const token = localStorage.getItem("token")
      await axios.patch(
        `${BACKEND_URL}/api/admin/users/${id}/verify`,
        { isApproved: !currentStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      )
      if (role === "donor") {
        setDonors(donors.map(d => d._id === id ? { ...d, isApproved: !currentStatus } : d))
      } else {
        setRecipients(recipients.map(r => r._id === id ? { ...r, isApproved: !currentStatus } : r))
      }
    } catch (err) {
      console.error("Failed to update verification:", err)
    }
  }

  const renderTable = (data, role, currentPage, totalPages, setPage, total) => (
    <>
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-800/50">
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Username</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Status</th>
                <th className="px-6 py-4 text-left text-gray-300 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No {role}s found
                  </td>
                </tr>
              ) : (
                data.map((u) => (
                  <tr key={u._id} className="border-b border-zinc-800 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4 text-white">{u.username}</td>
                    <td className="px-6 py-4 text-gray-400">{u.email || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        u.isApproved
                          ? "bg-green-600/20 text-green-400"
                          : "bg-yellow-600/20 text-yellow-400"
                      }`}>
                        {u.isApproved ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleVerification(u._id, u.isApproved, role)}
                        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                          u.isApproved
                            ? "bg-red-600/20 text-red-400 hover:bg-red-600/30"
                            : "bg-green-600/20 text-green-400 hover:bg-green-600/30"
                        }`}
                      >
                        {u.isApproved ? "Unverify" : "Verify"}
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
          Showing {(currentPage - 1) * LIMIT + 1}–{Math.min(currentPage * LIMIT, total)} of {total} {role}s
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === i + 1
                  ? "bg-red-600 text-white"
                  : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-40 hover:bg-zinc-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </>
  )

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
          <Link to="/" className="flex items-center gap-2 text-white transition-colors">
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
          <h1 className="text-4xl font-bold text-white mb-2">Manage Users</h1>
          <p className="text-gray-400">Verify and manage donor and recipient accounts</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab("donors")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "donors"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Donors ({totalDonors})
            </div>
          </button>
          <button
            onClick={() => setActiveTab("recipients")}
            className={`px-6 py-3 font-semibold transition-colors ${
              activeTab === "recipients"
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Recipients ({totalRecipients})
            </div>
          </button>
        </div>

        {activeTab === "donors" && renderTable(donors, "donor", donorPage, donorTotalPages, setDonorPage, totalDonors)}
        {activeTab === "recipients" && renderTable(recipients, "recipient", recipientPage, recipientTotalPages, setRecipientPage, totalRecipients)}

        {/* Summary */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Donors</p>
            <p className="text-3xl font-bold text-white">{totalDonors}</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Total Recipients</p>
            <p className="text-3xl font-bold text-white">{totalRecipients}</p>
          </div>
        </div>
      </main>
    </div>
  )
}