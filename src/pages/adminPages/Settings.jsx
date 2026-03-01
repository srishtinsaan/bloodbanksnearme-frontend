import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getCurrentUser } from "../../utils/admin_helper.js" 
import { HeartHandshake, ArrowLeft, Eye, EyeOff, Check, X } from "lucide-react"

export default function Settings() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Form states
  const [username, setUsername] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [usernameMessage, setUsernameMessage] = useState(null)
  const [passwordMessage, setPasswordMessage] = useState(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/auth/role")
      return
    }
    setUser(currentUser)
    setUsername(currentUser.username || "")
    setLoading(false)
  }, [navigate])

  const handleChangeUsername = () => {
    if (!username.trim()) {
      setUsernameMessage({ text: "Username cannot be empty", type: "error" })
      return
    }

    if (username === user?.username) {
      setUsernameMessage({ text: "New username must be different from current", type: "error" })
      return
    }

    setUsernameMessage({ text: "Username updated successfully!", type: "success" })
    setTimeout(() => setUsernameMessage(null), 3000)
  }

  const handleChangePassword = () => {
    if (!currentPassword.trim()) {
      setPasswordMessage({ text: "Current password is required", type: "error" })
      return
    }
    if (!newPassword.trim()) {
      setPasswordMessage({ text: "New password is required", type: "error" })
      return
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ text: "Password must be at least 6 characters", type: "error" })
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage({ text: "Passwords do not match", type: "error" })
      return
    }

    setPasswordMessage({ text: "Password updated successfully!", type: "success" })
    setTimeout(() => {
      setPasswordMessage(null)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }, 3000)
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
          <button
            onClick={() => navigate("/dashboard/admin")}
            className="flex items-center gap-2 text-gray-400 hover:text-white px-4 py-2 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-400">Manage your admin account settings</p>
        </div>

        {/* Settings Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Change Username */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Change Username</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Current Username</label>
                <input
                  type="text"
                  value={user?.username}
                  disabled
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-gray-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">New Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter new username"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              {usernameMessage && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  usernameMessage.type === "success"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}>
                  {usernameMessage.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {usernameMessage.text}
                </div>
              )}

              <button
                onClick={handleChangeUsername}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors mt-4"
              >
                Update Username
              </button>
            </div>
          </div>

          {/* Change Password */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>

            <div className="space-y-4">
              {/** Current Password */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/** New Password */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/** Confirm Password */}
              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-red-600"
                  />
                  <button
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordMessage && (
                <div className={`flex items-center gap-2 p-3 rounded-lg ${
                  passwordMessage.type === "success"
                    ? "bg-green-600/20 text-green-400"
                    : "bg-red-600/20 text-red-400"
                }`}>
                  {passwordMessage.type === "success" ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  {passwordMessage.text}
                </div>
              )}

              <button
                onClick={handleChangePassword}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors mt-4"
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}