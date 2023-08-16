import { AxiosResponse } from "axios";

import {
  GetProductParamsType,
  GetProductResponseType,
  PostProductBodyType,
  PutProductBodyType,
} from "./product.types";
import { axiosInstance } from "@/configs/axios";
import { DataMetaResponseType, DataResponseType } from "@/interfaces/response";

export const productServices = {
  getProducts: async (params: GetProductParamsType) => {
    const response: AxiosResponse<DataMetaResponseType<GetProductResponseType[]>> =
      await axiosInstance({
        url: "/products",
        method: "get",
        params,
      });
    return response.data.data;
  },
  getProduct: async (id: string) => {
    const response: AxiosResponse<DataResponseType<GetProductResponseType>> = await axiosInstance({
      url: `/products/${id}`,
      method: "get",
    });
    return response.data;
  },
  deleteProduct: async (id: number) => {
    const response = await axiosInstance({
      url: `/products/${id}`,
      method: "delete",
    });
    return response.data;
  },
  postProduct: async (data: PostProductBodyType) => {
    const response = await axiosInstance({
      url: "/products",
      method: "post",
      data,
    });
    return response.data;
  },
  putProduct: async (id: number, data: PutProductBodyType) => {
    const response = await axiosInstance({
      url: `/products/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
};
