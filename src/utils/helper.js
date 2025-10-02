import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchBloodBanks = async (pincode) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/bloodbanks`, { pincode });
    return response.data;
  } catch (error) {
    console.log(error.response);
    console.log(error.response?.data);
    
    
    const backendError = error.response?.data
    console.log(backendError?.message);
    
    throw new Error(backendError?.message || "Something went wrong")
  }
};