import { ACCESS_TOKEN } from "./config"
import axios from "axios"
// in Test case
const Testendpoint = "http://localhost:8000/"

// const endpoint = "https://memoethiopia.onrender.com/"
const api = axios.create({
    baseURL: Testendpoint,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)
export default api