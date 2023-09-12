import { AxiosResponse } from "axios";

import { GetFaqParamsType, GetFaqResponseType, PostFaqBodyType } from "./faq.types";
import { axiosInstance } from "@/configs/axios";
import { DataMetaResponseType, DataResponseType } from "@/types/response";

export const faqServices = {
  getFaqs: async (params: GetFaqParamsType) => {
    const response: AxiosResponse<DataMetaResponseType<GetFaqResponseType[]>> = await axiosInstance(
      {
        url: "/faq",
        method: "get",
        params,
      },
    );
    return response.data.data;
  },
  getFaq: async (id: string) => {
    const response: AxiosResponse<DataResponseType<GetFaqResponseType>> = await axiosInstance({
      url: `/faq/${id}`,
      method: "get",
    });
    return response.data;
  },
  postFaq: async (data: PostFaqBodyType) => {
    const response = await axiosInstance({
      url: "/faq",
      method: "post",
      data,
    });
    return response.data;
  },
  putFaq: async (id: string, data: PostFaqBodyType) => {
    const response = await axiosInstance({
      url: `/faq/${id}`,
      method: "put",
      data,
    });
    return response.data;
  },
  deleteFaq: async (id: number) => {
    const response = await axiosInstance({
      url: `/faq/${id}`,
      method: "delete",
    });
    return response.data;
  },
};
