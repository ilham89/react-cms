import { AxiosResponse } from "axios";

import { FaqCategoryBodyType, FaqCategoryResponseType } from "./faq-category.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/interfaces/response";

export const faqCategoryServices = {
  getFaqCategories: async () => {
    const response: AxiosResponse<DataResponseType<FaqCategoryResponseType[]>> =
      await axiosInstance({
        url: "/faq-categories",
        method: "get",
      });
    return response.data;
  },
  getFaqCategory: async (id: string) => {
    const response: AxiosResponse<DataResponseType<FaqCategoryResponseType>> = await axiosInstance({
      url: `/faq-categories/${id}`,
      method: "get",
    });
    return response.data;
  },
  postFaqCategory: async (data: FaqCategoryBodyType) => {
    const response = await axiosInstance({
      url: "/faq-categories",
      method: "post",
      data,
    });
    return response.data;
  },
  putFaqCategory: async (id: string, data: FaqCategoryBodyType) => {
    const response = await axiosInstance({
      url: `/faq-categories/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
};
