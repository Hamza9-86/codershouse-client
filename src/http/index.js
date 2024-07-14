import axios from 'axios';

let base_url = "http://localhost:5000";
if (process.env.NODE_ENV === "production"){
    base_url = process.env.REACT_APP_API_URL;
}
else if (process.env.NODE_ENV === "development"){
    base_url = base_url;
}
const api = axios.create({
    withCredentials:true,
    baseURL: base_url,
    headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
    },
});

// List of all the endpoints
export const sendOtp = (data) => api.post('/api/send-otp', data);
export const verifyOtp = (data) => api.post('/api/verify-otp', data);
export const activate = (data) => api.post('/api/activate', data);
export const logout = () => api.post('/api/logout');
export const createRoom = (data) => api.post('/api/rooms', data);
export const getAllRooms = () => api.get('/api/rooms');
export const getRoom = (roomId) => api.get(`/api/rooms/${roomId}`);
export default api;

// Interceptors
api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const {data} = await axios.get(
                    `${base_url}/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                console.log(`data`,data);
                // originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
                // originalRequest.cookie(data.accessToken);
                return api.request(originalRequest);
            } catch (err) {
                console.log(err.message);
            }
        }
        throw error;
    }
);
