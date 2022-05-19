import axios from "axios";

// Creating axios instance to configure with proxy url and headers
let axiosInstance = axios.create({
  baseURL: "https://pizzeria-app-backend.herokuapp.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});
// Add a request interceptor
axiosInstance.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if (config.token) {
      config.headers["Authorization"] = `Bearer ${config.token}`;
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default axiosInstance;
