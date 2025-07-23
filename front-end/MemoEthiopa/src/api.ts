import { message } from "antd"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./config"
import axios from "axios"
// in Test case
const endpoint = "http://localhost:8000/"

// const endpoint = "https://memoethiopia.onrender.com/"
const api = axios.create({
    baseURL: endpoint,
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            message.loading({ content: 'Refreshing session...', key: 'refresh' });

            try {
                const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                if (!refreshToken) {
                    message.error({ content: 'Session expired, please log in.', key: 'refresh', duration: 2 });
                    window.location.href = "/singin";
                    return Promise.reject(error);
                }

                const response = await axios.post(`${endpoint}api-v1/token/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = response.data.access;
                localStorage.setItem(ACCESS_TOKEN, newAccessToken);

                api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                message.success({ content: 'Session refreshed.', key: 'refresh', duration: 2 });

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                message.error({ content: 'Session expired, please log in.', key: 'refresh', duration: 2 });
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default api