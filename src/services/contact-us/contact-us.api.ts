import { AxiosResponse } from "axios";

import { GetContactUsParamsType, GetContactUsResponseType } from "./contact-us.types";
import { axiosInstance } from "@/configs/axios";
import { DataMetaResponseType } from "@/types/response";

export const contactUsServices = {
  getContactUs: async (params: GetContactUsParamsType) => {
    const response: AxiosResponse<DataMetaResponseType<GetContactUsResponseType[]>> =
      await axiosInstance({
        url: "/contact-us",
        method: "get",
        params,
      });
    return response.data.data;
  },
};
