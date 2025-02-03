import axios from "axios";
import { getLocalStorageItem } from "@/lib/localStorage";
import { LOGIN_KEY } from "@/context/AccountProvider";



const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

// Add a request interceptor
backendApi.interceptors.request.use(
  (config) => {
    const loginInfo = getLocalStorageItem(LOGIN_KEY);

    if (loginInfo?.accessToken) {
      config.headers.Authorization = `Bearer ${loginInfo.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

backendApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(LOGIN_KEY);
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default backendApi;
