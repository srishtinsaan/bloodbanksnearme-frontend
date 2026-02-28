// Get current user from localStorage
export const getCurrentUser = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  if (!token || !role) return null;

  return { token, role, username };
};

// Logout - clear localStorage
export const logoutUser = async () => {

  try {
    await axios.post(
      `${BACKEND_URL}/api/auth/logout`,
      {},
      { withCredentials: true } // 
    );
  } catch (err) {
    console.log("Logout error:", err);
  }


  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");



};