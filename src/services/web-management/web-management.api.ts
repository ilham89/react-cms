import { AxiosResponse } from "axios";

import {
  GetWebManagementResponseType,
  PostWebManagementBodyType,
  PutWebManagementBodyType,
} from "./web-management.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/types/response";

export const webManagementServices = {
  getWebManagements: async () => {
    const response: AxiosResponse<DataResponseType<GetWebManagementResponseType[]>> =
      await axiosInstance({
        url: "/web-managements",
        method: "get",
      });
    return response.data;
  },
  getWebManagement: async (id: string) => {
    const response: AxiosResponse<DataResponseType<GetWebManagementResponseType>> =
      await axiosInstance({
        url: `/web-managements/${id}`,
        method: "get",
      });
    return response.data;
  },
  postWebManagement: async (data: PostWebManagementBodyType) => {
    const response = await axiosInstance({
      url: "/web-managements",
      method: "post",
      data,
    });
    return response.data;
  },
  putWebManagement: async (id: number, data: PutWebManagementBodyType) => {
    const response = await axiosInstance({
      url: `/web-managements/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
};
