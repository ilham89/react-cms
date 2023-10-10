import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

import { PostImageResponseType } from "./image.types";
import { env } from "@/configs/env";
import { DataResponseType } from "@/types/response";

export const imageServices = {
  postImage: async (data: FormData) => {
    const token = Cookies.get("user_ct");
    const response: AxiosResponse<DataResponseType<PostImageResponseType>> = await axios({
      baseURL: env.mode === "development" ? "/dev" : env.baseUrl,
      url: "/upload-single-s3",
      method: "post",
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};
