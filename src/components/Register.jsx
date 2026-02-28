// import React, { useState } from "react";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { Heart, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
// // import { registerUser } from "../components/"; // adjust path if needed

// function Register() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const queryParams = new URLSearchParams(location.search);
//   const urlRole = queryParams.get("role");
//   const storedRole = localStorage.getItem("selected_role");
//   const role = urlRole || storedRole || "donor";

//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     pincode: "",
//     licenseNumber: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess(false);
//     setLoading(true);

//     if (!formData.username || !formData.password) {
//       setError("Username and password are required");
//       setLoading(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       setLoading(false);
//       return;
//     }

//     if (role === "bloodbank") {
//       if (!formData.phone || !formData.pincode || !formData.licenseNumber) {
//         setError("Please fill all required fields for blood bank registration");
//         setLoading(false);
//         return;
//       }
//     }

//     if ((role === "donor" || role === "recipient") && !formData.email) {
//       setError("Email is required");
//       setLoading(false);
//       return;
//     }

//     let userData = {
//       username: formData.username,
//       password: formData.password,
//       role,
//     };

//     if (role === "bloodbank") {
//       userData = {
//         ...userData,
//         email: formData.email || "",
//         phone: formData.phone,
//         pincode: formData.pincode,
//         licenseNumber: formData.licenseNumber,
//       };
//     } else if (role === "donor" || role === "recipient") {
//       userData.email = formData.email;
//     }

//     const result = registerUser(userData);

//     if (result.success) {
//       setSuccess(true);
//       setTimeout(() => {
//         navigate(`/login?role=${role}`);
//       }, 2000);
//     } else {
//       setError(result.message);
//     }

//     setLoading(false);
//   };

//   const getRoleLabel = () => {
//     const labels = {
//       admin: "Admin",
//       bloodbank: "Blood Bank",
//       donor: "Donor",
//       recipient: "Recipient",
//     };
//     return labels[role] || "User";
//   };

//   const renderFields = () => {
//     switch (role) {
//       case "bloodbank":
//         return (
//           <>
//             <input name="username" placeholder="Bank Name" value={formData.username} onChange={handleChange} className="input" required />
//             <input name="email" type="email" placeholder="Email (Optional)" value={formData.email} onChange={handleChange} className="input" />
//             <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="input" required />
//             <input name="pincode" placeholder="Pin Code" value={formData.pincode} onChange={handleChange} className="input" required />
//             <input name="licenseNumber" placeholder="License Number" value={formData.licenseNumber} onChange={handleChange} className="input" required />
//           </>
//         );

//       case "admin":
//         return (
//           <input name="username" placeholder="Admin Username" value={formData.username} onChange={handleChange} className="input" required />
//         );

//       default:
//         return (
//           <>
//             <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="input" required />
//             <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input" required />
//           </>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         <div className="text-center mb-6">
//           <Link to="/" className="flex justify-center items-center gap-2 text-white">
//             <Heart className="text-red-600" />
//             <span className="text-2xl font-bold">BloodConnect</span>
//           </Link>
//           <h2 className="text-white text-2xl mt-4">Register as {getRoleLabel()}</h2>
//         </div>

//         {success && (
//           <div className="bg-green-600/20 p-3 mb-4 text-green-400 flex items-center gap-2">
//             <CheckCircle size={18} />
//             Account created successfully! Redirecting...
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-600/20 p-3 mb-4 text-red-400 flex items-center gap-2">
//             <AlertCircle size={18} />
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleRegister} className="space-y-4">
//           {renderFields()}

//           <div className="relative">
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               className="input"
//               required
//             />
//             <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </span>
//           </div>

//           <div className="relative">
//             <input
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className="input"
//               required
//             />
//             <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//               {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </span>
//           </div>

//           <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-2 rounded">
//             {loading ? "Creating account..." : "Create Account"}
//           </button>
//         </form>

//         <div className="text-center mt-4 text-gray-400">
//           Already have an account?{" "}
//           <Link to={`/login?role=${role}`} className="text-red-500">
//             Sign in
//           </Link>
//         </div>

//         <div className="text-center mt-2">
//           <Link to="/" className="text-gray-500 text-sm">
//             ← Choose a different role
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Register;

import React from 'react'

function Register() {
  return (
    <div>
      
    </div>
  )
}

export default Register
