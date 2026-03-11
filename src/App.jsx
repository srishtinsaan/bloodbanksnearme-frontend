import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homePages/Home.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Results from "./pages/Results.jsx";
import BloodGroups from "./pages/homePages/BloodGroups.jsx";
import Features from "./pages/homePages/Features.jsx";
import GetStartedSection from "./pages/homePages/GetStartedScection.jsx";
import Footer from "./pages/homePages/Footer.jsx";
import FAQ from "./pages/homePages/FAQ.jsx";
import Testimonials from "./pages/homePages/Testimonials.jsx";

import AuthRole from "./pages/authPages/AuthRole.jsx";
import Login from "./pages/authPages/Login.jsx";
import Register from "./pages/authPages/Register.jsx";

import Admin from "./pages/adminPages/Admin.jsx"
import Stats from "./pages/adminPages/Stats.jsx"
import ManageBanks from "./pages/adminPages/ManageBanks.jsx"
import ManageUsers from "./pages/adminPages/ManageUsers.jsx"
import Settings from "./pages/adminPages/Settings.jsx"

import Recipient from "./pages/recipientPages/Recipient.jsx";
import MyRequests from "./pages/recipientPages/MyRequests.jsx";
import BloodRequest from "./pages/recipientPages/BloodRequest.jsx"

import Bloodbank from "./pages/Bloodbank.jsx"
import BankAssistance from "./components/BankAssistance.jsx";

import DonorPage from "./pages/donorPages/DonorPage.jsx";
import DonorRegister from "./pages/donorPages/DonorRegister.jsx";



function App() {
  return (
    <BrowserRouter>
      {/* Background */}
      <div id="app-container" className="min-h-screen w-full relative overflow-x-hidden bg-black text-white">
        
        

        {/* Crimson Shadow Background with Top Glow */}
        

        {/* Page Content */}
        <div className="relative z-10 flex justify-center flex-col min-h-screen">
          <Routes>
            <Route path="/" element={
              <div
  className="absolute inset-0 z-0 "
  style={{
    backgroundColor: "#0a0a0a",
    backgroundImage: `
      radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
      radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px),
      radial-gradient(ellipse 80% 60% at 50% 0%, hsla(346, 100%, 50%, 0.25), transparent 70%)
    `,
    backgroundSize: "10px 10px, 10px 10px, auto",
    imageRendering: "pixelated",
  }}
>
  <Home />
  <Features/>
  <BloodGroups />
  <Testimonials/>
  <FAQ/>
  <GetStartedSection/>

  <Footer />
  </div>} />
            
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/banks" element={<Results/>} />
            <Route path="/auth/role" element={<AuthRole/>} />
            <Route path="/auth/login" element={<Login/>} />
            <Route path="/auth/register" element={<Register/>} />

            <Route path="/dashboard/admin" element={<Admin/>} />
            <Route path="/dashboard/admin/platform-statistics" element={<Stats/>} />
            <Route path="/dashboard/admin/manage-banks" element={<ManageBanks/>} />
            <Route path="/dashboard/admin/manage-users" element={<ManageUsers/>} />
            <Route path="/dashboard/admin/system-settings" element={<Settings/>} />

            <Route path="/dashboard/recipient" element={<Recipient/>} />
            <Route path="/dashboard/recipient/my-requests" element={<MyRequests/>} />
            <Route path="/dashboard/recipient/blood-request" element={<BloodRequest/>} />

            <Route path="/dashboard/bloodbank" element={<Bloodbank/>} />
            <Route path="/dashboard/donor" element={<DonorPage/>} />
            <Route path="/dashboard/donor/register" element={<DonorRegister />} />


            <Route path="/banks/ai-assistance" element={<BankAssistance/>} />

            

          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
