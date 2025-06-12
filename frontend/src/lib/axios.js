import axios from "axios";

//Use localhost:5001 while development and /api when in production
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,  //send cookies with the request (which contains token for authentication so thats necessary)
});