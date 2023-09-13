import { AxiosResponse } from "axios";

import { GetSizeResponseType } from "./size.types";
import { axiosInstance } from "@/configs/axios";
import { DataResponseType } from "@/types/response";

export const sizeServices = {
  getSizes: async () => {
    const response: AxiosResponse<DataResponseType<GetSizeResponseType[]>> = await axiosInstance({
      url: "/sizes",
      method: "get",
    });
    return response.data;
  },
};
