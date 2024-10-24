import axios from "axios";
const BASE_URL = " http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// axiosPrivate.interceptors.request.use(
//   (config) => {
//     if (config.method === "post" && config.data) {
//       console.log("config", config?.data);
//       const { password, ...sanitizeData } = config.data;
//       config.data = sanitizeData;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export { axiosInstance, axiosPrivate };
