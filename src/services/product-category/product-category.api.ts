import { AxiosResponse } from "axios";

import {
  GetProductCategoryParamsType,
  GetProductCategoryResponseType,
  PostProductCategoryBodyType,
  PutProductCategoryBodyType,
} from "./product-category.types";
import { axiosInstance } from "@/configs/axios";
import { DataMetaResponseType, DataResponseType } from "@/interfaces/response";

export const productCategoryServices = {
  getProductCategories: async (params: GetProductCategoryParamsType) => {
    const response: AxiosResponse<DataMetaResponseType<GetProductCategoryResponseType[]>> =
      await axiosInstance({
        url: "/product-categories",
        method: "get",
        params,
      });
    return response.data.data;
  },
  getProductCategory: async (id: string) => {
    const response: AxiosResponse<DataResponseType<GetProductCategoryResponseType>> =
      await axiosInstance({
        url: `/product-categories/${id}`,
        method: "get",
      });
    return response.data;
  },
  deleteProductCategory: async (id: number) => {
    const response = await axiosInstance({
      url: `/product-categories/${id}`,
      method: "delete",
    });
    return response.data;
  },
  postProductCategory: async (data: PostProductCategoryBodyType) => {
    const response = await axiosInstance({
      url: "/product-categories",
      method: "post",
      data,
    });
    return response.data;
  },
  putProductCategory: async (
    id: number,
    data: PutProductCategoryBodyType | Pick<PutProductCategoryBodyType, "status">,
  ) => {
    const response = await axiosInstance({
      url: `/product-categories/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
};
