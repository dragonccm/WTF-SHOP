import axios from "axios";
import { getSession } from "next-auth/react";

// Axios Interceptor Instance
const AxiosInstance = axios.create({
    baseURL: process.env.BASE_URL
});

AxiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getSession();
        const accessToken = session?.accessToken;

        // If token is present, add it to request's Authorization Header
        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors here
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        // Can be modified response
        return response;
    },
    (error) => {
        // Handle response errors here
        return Promise.reject(error);
    }
);

// Method to edit profile
export const editProfile = async (profileData, token) => {
    try {
        const response = await AxiosInstance.post('/api/editprofile', profileData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUser = async (profileData, token) => {
    try {
        const response = await AxiosInstance.get('/api/getuser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    };
}

export const getAccessToken = async () => {
    const session = await getSession();
    const accessToken = session?.accessToken;
    return accessToken;
};

export default AxiosInstance