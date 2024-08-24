import axios from 'axios';

// Default API URL if environment variable is not set
const DEFAULT_API_URL = 'http://127.0.0.1:8000/api/newtrip';

/**
 * Sends a POST request to create a new trip.
 *
 * @param {any} formData - The data to be sent to the API for creating a new trip.
 * @returns {Promise<any>} The response from the API.
 */
export default async function newTripService(formData: any) {
  // POST request to the API with form data and authorization header
  const res = await axios.post(process.env.VITE_APP_JOURNAI_API_URL || DEFAULT_API_URL, formData, {
    headers: {
      Authorization: `Bearer ${process.env.VITE_APP_JOURNAI_API_KEY}`,
    },
  });

  return res;
}
