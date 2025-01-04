import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Axios instance
const apiClient = axios.create({
  baseURL: 'https://backend.wetesolutions.com/api/v1', // Replace with your base API URL
  // baseURL: "https://sms-backend-6auh.onrender.com/api/v1",
  timeout: 10000, // Optional: Timeout after 10 seconds
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    try {
      // Retrieve the token from AsyncStorage or any other storage
      const token = await AsyncStorage.getItem('token');
      
      // Add Authorization header if token exists
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      // Ensure Content-Type is always set
      config.headers = {
        ...config.headers,
        'Content-Type': 'application/json',
      };

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default apiClient;
