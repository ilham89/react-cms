import { AxiosResponse } from "axios";

import { GetMaterialResponseType, PostMaterialBodyType } from "./material.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/types/response";

export const materialServices = {
  getMaterials: async () => {
    const response: AxiosResponse<DataResponseType<GetMaterialResponseType[]>> =
      await axiosInstance({
        url: "/materials",
        method: "get",
      });
    return response.data;
  },
  deleteMaterial: async (id: number) => {
    const response = await axiosInstance({
      url: `/materials/${id}`,
      method: "delete",
    });
    return response.data;
  },
  createMaterial: async (data: PostMaterialBodyType) => {
    const response = await axiosInstance({
      url: `/materials`,
      method: "post",
      data,
    });
    return response.data;
  },
};
