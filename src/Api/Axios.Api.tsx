import axios from "axios";
import Store, { useAppSelector } from "../Redux/Store/Store";
const BASE_URL = " http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const axiosPrivatefile = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});

axiosPrivate.interceptors.request.use((config) => {
  if (config.headers) {
    const { doc_accessToken, pat_accessToken, role } = Store.getState().states;
    const accessToken = role === "patient" ? pat_accessToken : doc_accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// axiosPrivate.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const preventRequest = error?.config;
//     if (
//       error?.response?.states === 403 ||
//       preventRequest?.headers?.Authorization === `Bearer undefined`
//     ) {
//       try {
//       } catch (error) {}
//     } else {

//     }
//   }
// );

export { axiosInstance, axiosPrivate, axiosPrivatefile };
