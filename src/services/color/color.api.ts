import { AxiosResponse } from "axios";

import { GetColorResponseType, PostColorBodyType } from "./color.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/types/response";

export const colorServices = {
  getColors: async () => {
    const response: AxiosResponse<DataResponseType<GetColorResponseType[]>> = await axiosInstance({
      url: "/colors",
      method: "get",
    });
    return response.data;
  },
  deleteColor: async (id: number) => {
    const response = await axiosInstance({
      url: `/colors/${id}`,
      method: "delete",
    });
    return response.data;
  },
  createColor: async (data: PostColorBodyType) => {
    const response = await axiosInstance({
      url: `/colors`,
      method: "post",
      data,
    });
    return response.data;
  },
};
