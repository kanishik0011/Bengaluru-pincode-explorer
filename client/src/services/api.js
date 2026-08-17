const API_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD ? '/api' : 'http://localhost:5000/api'
);

const getFriendlyMessage = (status, fallback) => {
  if (status === 400) return 'Please enter a valid 6-digit numeric pincode.';
  if (status === 404) return 'No Bangalore locality was found for this pincode.';
  if (status === 503 && fallback) return fallback;
  if (status >= 500) return 'The backend is unavailable right now. Please try again later.';
  return fallback || 'Something went wrong. Please try again.';
};

export const fetchPincode = async (pincode) => {
  try {
    const response = await fetch(`${API_URL}/pincodes/${pincode}`);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(getFriendlyMessage(response.status, data.message));
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Network error. Please check that the backend server is running.');
    }

    throw error;
  }
};
