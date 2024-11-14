import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://nqvtxoaqqwgkmcjjylax.supabase.co/rest/v1/',
  timeout: 5000,
  headers: {
    'apikey': import.meta.env.VITE_SUPABASE_KEY
    /*'Authorization': `Bearer YOUR_SUPABASE_KEY`*/
  }
});

export default axiosInstance