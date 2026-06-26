import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getCurrentUser = () => {
  const token = localStorage.getItem("accessToken"); 
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const rawMode = localStorage.getItem("mode");

  if (!token || !role) return null;

  // "null" string aur actual null dono handle karo
  const mode = rawMode && rawMode !== "null" ? rawMode : null;

  return { token, role, mode, username };
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("accessToken"); 
  localStorage.removeItem("role");
  localStorage.removeItem("mode");        
  localStorage.removeItem("username");
    await axios.post(
      `${BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true }
    );
  } catch (err) {
    console.log("Logout error:", err);
  }

      window.location.replace("/")


  
};