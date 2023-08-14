import { AxiosResponse } from "axios";

import { GetFaqResponseType, PostFaqBodyType } from "./faq.types";
import { axiosInstance } from "@/configs/axios";
import { DataMetaResponseType } from "@/interfaces/response";

export const faqServices = {
  getFaqs: async () => {
    const response: AxiosResponse<DataMetaResponseType<GetFaqResponseType[]>> = await axiosInstance(
      {
        url: "/faq",
        method: "get",
      },
    );
    return response.data.data;
  },
  postFaq: async (data: PostFaqBodyType) => {
    const response = await axiosInstance({
      url: "/faq",
      method: "post",
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
