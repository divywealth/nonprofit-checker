import axios from "axios";
import { environment } from "../../environments/environment";

const apiClientAuth = axios.create({
    baseURL: environment.apiUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add interceptor to include Authorization header
  apiClientAuth.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });
  
  export default apiClientAuth;