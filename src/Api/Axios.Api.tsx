import axios from "axios";
const BASE_URL = ' http://localhost:5000';


const axiosInstance = axios.create({
    baseURL: BASE_URL
});

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
});

export { axiosInstance, axiosPrivate };