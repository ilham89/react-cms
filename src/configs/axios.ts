import Axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

import { env } from "./env";
import { notification } from "@/hooks/useApp";
import { errorMessage } from "@/utils/message";

export const axiosInstance = Axios.create({
  baseURL: env.mode === "development" ? "/dev" : env.baseUrl,
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
    if (error.response?.status === 401) {
      Cookies.remove("user_ct");
      notification.error({ message: "Your session is expired!" });
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
        notification.error({ message: errorMessage(error?.response?.data?.message) });
      }
      if (error.response?.status === 502) {
        notification.error({ message: errorMessage(error?.response?.data?.message) });
      }
      if (error.response?.status === 500) {
        notification.error({ message: errorMessage(error?.response?.data?.message) });
      }
      if (error.response?.status === 404) {
        notification.error({ message: errorMessage(error?.response?.data?.message) });
      }
      if (error.response?.status === 400) {
        notification.error({ message: errorMessage(error?.response?.data?.message) });
      }
      if (error.response?.status === 422) {
        notification.error({ message: errorMessage(error?.response?.data?.message) });
      }
    }
    return Promise.reject(error);
  },
);
