import Axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

import useNotification from "@/hooks/useNotification";

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.MODE === "development" ? "/dev" : import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  config.headers["Content-Type"] = "application/json";
  const token = Cookies.get("user_ct");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { addError } = useNotification();
    if (error.response?.status === 401) {
      Cookies.remove("user_ct");
      addError("Your session is expired!");
      setTimeout(() => {
        location.replace("/login");
      }, 1000);
    }

    if (
      error?.response?.config?.method !== "post" &&
      error?.response?.config?.method !== "put" &&
      error?.response?.config?.method !== "delete"
    ) {
      if (error.response?.status === 403) {
        addError(error?.response?.data?.error);
      }
      if (error.response?.status === 502) {
        addError(error?.response?.data?.error);
      }
      if (error.response?.status === 500) {
        addError(error?.response?.data?.error);
      }
      if (error.response?.status === 404) {
        addError(error?.response?.data?.error);
      }
      if (error.response?.status === 400) {
        addError(error?.response?.data?.error);
      }
      if (error.response?.status === 422) {
        addError(error?.response?.data?.error);
      }
    }
    return Promise.reject(error);
  },
);
