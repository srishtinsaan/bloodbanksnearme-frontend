import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchBloodBanks = async (pincode) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/bloodbanks`, { pincode }, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.log(error.response);
    console.log(error.response?.data);
    
    
    const backendError = error.response?.data
    console.log(backendError?.message);
    
    throw new Error(backendError?.message || "Something went wrong")
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken")
  return {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true
  }
}

export const createBloodRequest = async (formData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/blood-requests`,
      formData,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export const getMyBloodRequests = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/blood-requests/my`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export const requestCancellation = async (id, cancellationReason) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/blood-requests/${id}/cancel`,
      { cancellationReason },
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

// admin
export const getAllBloodRequests = async (status = "all", page = 1) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/blood-requests?status=${status}&page=${page}`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

// admin
export const updateBloodRequestStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/blood-requests/${id}/status`,
      { status },
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

// ─── Donation Requests ───────────────────────────────────────────

export const createDonationRequest = async (formData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/donation-requests`,
      formData,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export const getMyDonationRequests = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/donation-requests/my`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export const requestDonationCancellation = async (id, cancellationReason) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/donation-requests/${id}/cancel`,
      { cancellationReason },
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

// admin
export const getAllDonationRequests = async (status = "all", page = 1) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/donation-requests?status=${status}&page=${page}`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

// admin
export const updateDonationRequestStatus = async (id, status) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/donation-requests/${id}/status`,
      { status },
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export const registerDonorProfile = async (formData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/dashboard/donor/register`,
      formData,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

export const switchMode = async (mode) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/auth/set-mode`,
      { mode },
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}

// bank

export const getBankBloodRequests = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/blood-requests/bank`,
      getAuthHeaders()
    )
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || "Something went wrong")
  }
}