import { AxiosResponse } from "axios";

import {
  GetMaterialParamsType,
  GetMaterialResponseType,
  PostMaterialBodyType,
} from "./material.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/types/response";

export const materialServices = {
  getMaterials: async (params: GetMaterialParamsType) => {
    const response: AxiosResponse<DataResponseType<GetMaterialResponseType[]>> =
      await axiosInstance({
        url: "/materials?productsId=24",
        method: "get",
        params,
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
