import React, { useState } from "react"

export default function DonorRegister() {
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for registering as a blood donor!")
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Blood Donor Registration</h1>

        <form onSubmit={handleSubmit} className="form">

          <div className="input-group">
            <label>Full Name</label>
            <input type="text" required value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name" />
          </div>

          <div className="input-group">
            <label>Age</label>
            <input type="number" min="18" max="65" required
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              placeholder="Enter your age" />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select value={formData.gender}
              onChange={(e) => handleChange("gender", e.target.value)}>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Blood Group</label>
            <select value={formData.bloodGroup}
              onChange={(e) => handleChange("bloodGroup", e.target.value)}>
              <option value="">Select blood group</option>
              <option>A+</option><option>A-</option>
              <option>B+</option><option>B-</option>
              <option>O+</option><option>O-</option>
              <option>AB+</option><option>AB-</option>
            </select>
          </div>

          <div className="input-group">
            <label>Phone Number</label>
            <input type="tel" required
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              placeholder="Enter your phone number" />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email" />
          </div>

          <div className="input-group">
            <label>City</label>
            <input type="text" required
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Enter your city" />
          </div>

          <div className="input-group">
            <label>Any Medical Conditions?</label>
            <textarea rows="4"
              value={formData.medicalConditions}
              onChange={(e) => handleChange("medicalConditions", e.target.value)}
              placeholder="Please list any medical conditions" />
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>

        <p className="footer">Your donation can save a life.</p>
      </div>
    </div>
  )
}
