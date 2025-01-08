import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Axios instance
const apiClient = axios.create({
  baseURL: 'https://backend.wetesolutions.com/api/v1', // Replace with your base API URL
  timeout: 10000, // Optional: Timeout after 10 seconds
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    try {
      // Ensure the headers object is initialized
      config.headers = config.headers || {};

      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      // Add Authorization header if token exists
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Ensure Content-Type is always set to application/json
      config.headers['Content-Type'] = 'application/json';

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);

      // Reject the request with a meaningful error
      return Promise.reject({
        message: 'Failed to configure the request',
        originalError: error,
      });
    }
  },
  (error) => {
    // Handle request errors
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor (Optional)
apiClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Log and handle errors globally
    console.error('Response error:', error);

    if (error.response) {
      // Handle server errors (e.g., 4xx and 5xx)
      return Promise.reject({
        message: error.response.data?.message || 'Server error occurred',
        status: error.response.status,
        originalError: error,
      });
    } else if (error.request) {
      // Handle no response (e.g., network issues)
      return Promise.reject({
        message: 'No response from server. Please check your network connection.',
        originalError: error,
      });
    } else {
      // Handle other errors
      return Promise.reject({
        message: error.message || 'An unexpected error occurred',
        originalError: error,
      });
    }
  }
);

export default apiClient;
