import axios from 'axios';

const DEFAULT_API_URL = 'http://127.0.0.1:8000/api/newtrip';

export default async function newTripService(formData: any) {
  const res = await axios.post(process.env.VITE_APP_JOURNAI_API_URL || DEFAULT_API_URL, formData, {
    headers: {
      Authorization: `Bearer ${process.env.VITE_APP_JOURNAI_API_KEY}`,
    },
  });

  return res;
}
