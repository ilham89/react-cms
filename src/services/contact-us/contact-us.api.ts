import { AxiosResponse } from "axios";

import { GetContactUsResponseType } from "./contact-us.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/interfaces/response";

export const contactUsServices = {
  getContactUs: async () => {
    const response: AxiosResponse<DataResponseType<GetContactUsResponseType[]>> =
      await axiosInstance({
        url: "/contact-us",
        method: "get",
      });
    return response.data;
  },
};
