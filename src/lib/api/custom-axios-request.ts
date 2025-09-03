import axios from "axios";
import { API, API_URL } from "../constants";
import jsCookie from "js-cookie";

const axiosWithCredentials = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const customAxios = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});

const axiosWithAccessToken = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${jsCookie.get("accessToken")}`,
  },
});



// Response interceptor for token refresh
axiosWithAccessToken.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Attempt to refresh token
          const response = await axiosWithCredentials.post(API.AUTH.REFRESH_ACCESS_TOKEN);
          const newAccessToken = response.data.accessToken;
          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosWithAccessToken(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          console.log("Refresh token failed, redirecting to login\n", refreshError);
          window.location.href = "/sign-in";
        }
      }
      
      return Promise.reject(error);
    }
  );

export { axiosWithCredentials, customAxios, axiosWithAccessToken };
