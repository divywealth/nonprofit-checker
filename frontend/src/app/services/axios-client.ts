import axios from 'axios';
import { environment } from '../../environments/environment';

const apiClient = axios.create({
  baseURL: environment.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;